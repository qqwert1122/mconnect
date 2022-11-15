import { dbService } from "fbase";
import {
  collectionGroup,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  increment,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faQuoteLeft,
  faQuoteRight,
  faAngleDown,
  faCheck,
  faBookmark,
  faBookmark as fasBookmark,
} from "@fortawesome/free-solid-svg-icons";
import {
  faThumbsUp,
  faBookmark as farBookmark,
} from "@fortawesome/free-regular-svg-icons";
import dayjs from "dayjs";
import { CircularProgress } from "@mui/material";
import { useRecoilState } from "recoil";
import { ideasState } from "atom";

const SuggestedIdea = ({
  writing,
  loggedInUser,
  idea,
  isChecked,
  onIdeaSelect,
  onIdeaClick,
}) => {
  const [ideas, setIdeas] = useRecoilState(ideasState);

  //TODO
  // 바닥에 닿는 무한스크롤은 아니지만,
  // 마지막 페이지에 추가 로드 버튼을 만들고 마지막 위치라면 해당 버튼을 보여줌
  // 버튼 클릭시 아이디어 추가 로드.
  // 단 이때 slick을 이용하므로 너무 많이 로드되지 않도록
  // startAfter, limit을 활용하고 배열에 추가하는 것이 아니라
  // 페이지화를 해서 before로 돌아갈 수도 있게끔 구현

  const getCount = async () => {
    const countRef = doc(dbService, "counts", idea.docId);
    const countDoc = (await getDoc(countRef)).data();
    setCount(countDoc);
  };

  useEffect(() => {
    setTimeout(() => {
      getCount();
    }, 1000);
  }, []);

  // user Information and Idea's like, bookmark, view count Information
  const [count, setCount] = useState();

  const onBookmarkClick = async (idea) => {
    const isOwner = loggedInUser.userId === idea.userId;
    // fb reference
    const countRef = doc(dbService, "counts", idea.docId);
    const userIdeaRef = doc(
      dbService,
      "users",
      loggedInUser.userId,
      "userIdeas",
      idea.docId
    );
    const userRef = doc(dbService, "users", loggedInUser.userId);
    const newCount = { ...count };
    if (count.bookmark_users.hasOwnProperty(loggedInUser.userId)) {
      delete newCount.bookmark_users[loggedInUser.userId];
      setCount(newCount);
      await updateDoc(countRef, {
        bookmark_count: increment(-1),
        bookmark_users: newCount.bookmark_users,
      });
      if (isOwner) {
        await updateDoc(userIdeaRef, {
          isBookmarked: false,
        });
        setIdeas(
          ideas.map((m) =>
            m.docId === idea.docId ? { ...m, isBookmarked: false } : m
          )
        );
      } else {
        await deleteDoc(userIdeaRef);
        await updateDoc(userRef, {
          idea_count: increment(-1),
        });
        setIdeas(ideas.filter((f) => f.docId !== idea.docId));
      }
    } else {
      newCount.bookmark_users[loggedInUser.userId] = loggedInUser.userName;
      setCount(newCount);
      await updateDoc(countRef, {
        bookmark_count: increment(1),
        bookmark_users: {
          ...count.bookmark_users,
          [loggedInUser.userId]: loggedInUser.userName,
        },
      });
      if (isOwner) {
        await updateDoc(userIdeaRef, {
          isBookmarked: true,
        });
        setIdeas(
          ideas.map((m) =>
            m.docId === idea.docId ? { ...m, isBookmarked: true } : m
          )
        );
      } else {
        await setDoc(userIdeaRef, {
          docId: idea.docId,
          userId: idea.userId,
          userName: idea.userName,
          userPhotoURL: idea.userPhotoURL,
          title: idea.title,
          text: idea.text,
          source: idea.source,
          tags: idea.tags,
          connectedIDs: idea.connectedIDs,
          createdAt: idea.createdAt,
          updatedAt: dayjs().format("YYYY. MM. DD. HH:mm:ss"),
          isPublic: false,
          isLiked: count.like_users.hasOwnProperty(loggedInUser.userId),
          isBookmarked: true,
          isViewed: count.view_users.hasOwnProperty(loggedInUser.userId),
          isOriginal: false,
        });
        await updateDoc(userRef, {
          idea_count: increment(1),
        });
        setIdeas([
          {
            docId: idea.docId,
            userId: idea.userId,
            userName: idea.userName,
            userPhotoURL: idea.userPhotoURL,
            title: idea.title,
            text: idea.text,
            source: idea.source,
            tags: idea.tags,
            connectedIDs: idea.connectedIDs,
            createdAt: idea.createdAt,
            updatedAt: dayjs().format("YYYY. MM. DD. HH:mm:ss"),
            isPublic: false,
            isLiked: count.like_users.hasOwnProperty(loggedInUser.userId),
            isBookmarked: true,
            isViewed: count.view_users.hasOwnProperty(loggedInUser.userId),
            isOriginal: false,
          },
          ...ideas,
        ]);
      }
    }
  };

  return (
    <div className="relative">
      <button
        className={`absolute -top-1 -right-1 rounded-full ${
          isChecked(idea)
            ? "bg-red-400 text-white"
            : "border-2 border-stone-400"
        } w-6 h-6 shadow-xl`}
        onClick={(e) => {
          onIdeaSelect(e, idea);
          onBookmarkClick(idea);
        }}
      >
        {isChecked(idea) && <FontAwesomeIcon icon={faCheck} />}
      </button>
      <div className="h-60 p-4 m-1 bg-white shadow rounded-3xl text-xs break-all">
        <div
          onClick={(e) => (writing ? onIdeaClick(e, idea) : onIdeaClick(idea))}
        >
          {idea.title.length > 0 && (
            <div className="mb-2 truncate font-black text-sm">{idea.title}</div>
          )}
          <div className="mb-3 line-clamp-6">{idea.text}</div>
          {idea.source.length > 0 && (
            <div className="ml-2 mb-1 flex gap-1 text-stone-400">
              <FontAwesomeIcon icon={faQuoteLeft} />
              <span>{idea.source}</span>
            </div>
          )}
        </div>
        <div className="absolute bottom-4 left-4 flex items-center gap-2 text-xs">
          <Avatar
            className="border-2"
            alt="avatar"
            src={idea.userPhotoURL}
            sx={{
              display: "flex",
              width: "25px",
              height: "25px",
            }}
          />
          <div className="flex-col">
            <span className="flex">{idea.userName}</span>
            <span className="flex text-stone-400">{idea.createdAt}</span>
          </div>
        </div>

        <button
          className="absolute bottom-4 right-4 text-xl text-orange-400"
          onClick={() => onBookmarkClick(idea)}
        >
          {count ? (
            <FontAwesomeIcon
              icon={
                count.bookmark_users.hasOwnProperty(loggedInUser.userId)
                  ? fasBookmark
                  : farBookmark
              }
            />
          ) : (
            <CircularProgress color="inherit" size={16} />
          )}
        </button>
      </div>
    </div>
  );
};

export default SuggestedIdea;
