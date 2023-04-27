import { dbService } from "fbase";
import {
  deleteDoc,
  doc,
  getDoc,
  increment,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faQuoteLeft,
  faCheck,
  faBookmark as fasBookmark,
} from "@fortawesome/free-solid-svg-icons";
import { faBookmark as farBookmark } from "@fortawesome/free-regular-svg-icons";
import dayjs from "dayjs";
import { CircularProgress } from "@mui/material";
import { useRecoilState } from "recoil";
import { ideasState } from "atom";
import { v4 } from "uuid";

const SuggestedIdea = ({
  index,
  writing,
  loggedInUser,
  idea,
  isChecked,
  onIdeaSelect,
  onIdeaClick,
}) => {
  const [ideas, setIdeas] = useRecoilState(ideasState);

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
      // update || delete
      try {
        delete newCount.bookmark_users[loggedInUser.userId];
        setCount(newCount);
        await updateDoc(countRef, {
          bookmark_count: increment(-1),
          bookmark_users: newCount.bookmark_users,
        });
      } catch (event) {
        console.error("Error count bookmark: ", event);
      }
      if (isOwner) {
        // update
        try {
          await updateDoc(userIdeaRef, {
            isBookmarked: false,
          });
          setIdeas(
            ideas.map((m) =>
              m.docId === idea.docId ? { ...m, isBookmarked: false } : m
            )
          );
        } catch (event) {
          console.error("Error updating user's document: ", event);
        }
      } else {
        // delete
        try {
          await deleteDoc(userIdeaRef);
          await updateDoc(userRef, {
            idea_count: increment(-1),
          });
          setIdeas(ideas.filter((f) => f.docId !== idea.docId));
          index.deleteObject(idea.searchId);
        } catch (event) {
          console.error("Error deleting someone else's document: ", event);
        }
      }
    } else {
      // update || create
      try {
        newCount.bookmark_users[loggedInUser.userId] = loggedInUser.userName;
        setCount(newCount);
        await updateDoc(countRef, {
          bookmark_count: increment(1),
          bookmark_users: {
            ...count.bookmark_users,
            [loggedInUser.userId]: loggedInUser.userName,
          },
        });
      } catch (event) {
        console.error("Error count bookmark: ", event);
      }
      if (isOwner) {
        // update
        try {
          await updateDoc(userIdeaRef, {
            isBookmarked: true,
          });
          setIdeas(
            ideas.map((m) =>
              m.docId === idea.docId ? { ...m, isBookmarked: true } : m
            )
          );
        } catch (event) {
          console.error("Error updating user's document: ", event);
        }
      } else {
        // create
        const newIdeaId = v4();
        const _document = {
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
        };
        const document = {
          ..._document,
          searchId: newIdeaId,
          isPublic: false,
          isLiked: count.like_users.hasOwnProperty(loggedInUser.userId),
          isBookmarked: true,
          isViewed: count.view_users.hasOwnProperty(loggedInUser.userId),
          isOriginal: false,
        };
        try {
          await setDoc(userIdeaRef, { ...document });
          await updateDoc(userRef, {
            idea_count: increment(1),
          });
          setIdeas([{ ...document }, ...ideas]);
          index.saveObject({ ...document, objectID: newIdeaId });
        } catch (event) {
          console.error("Error creating someone else's document: ", event);
        }
      }
    }
  };

  return (
    <div className="relative">
      <button
        className={`absolute -top-1 -right-1 rounded-full ${
          isChecked(idea)
            ? "bg-red-400 text-white"
            : "border-2 bg-white border-stone-400"
        } w-6 h-6 shadow-xl`}
        onClick={(e) => {
          onIdeaSelect(e, idea);
          onBookmarkClick(idea);
        }}
      >
        {isChecked(idea) && <FontAwesomeIcon icon={faCheck} />}
      </button>
      <div className="h-60 p-4 m-1 border shadow rounded-3xl text-xs break-all">
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
