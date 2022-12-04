import { useEffect, useState } from "react";
import { dbService } from "fbase";
import {
  deleteDoc,
  doc,
  getDoc,
  increment,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { Highlight } from "react-instantsearch-hooks-web";
import { useRecoilState, useRecoilValue } from "recoil";
import { ideasState } from "atom";
import { userState } from "atom";
import { Avatar } from "@mui/material";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark as fasBookmark,
  faHashtag,
  faQuoteLeft,
} from "@fortawesome/free-solid-svg-icons";
import { faBookmark as farBookmark } from "@fortawesome/free-regular-svg-icons";

const Hit = ({ hit }) => {
  const loggedInUser = useRecoilValue(userState);
  const [ideas, setIdeas] = useRecoilState(ideasState);
  const isOwner = loggedInUser.userId === hit.userId;

  const [count, setCount] = useState();

  const countRef = doc(dbService, "counts", hit.objectID);
  const userIdeaRef = doc(
    dbService,
    "users",
    loggedInUser.userId,
    "userIdeas",
    hit.objectID
  );
  const userRef = doc(dbService, "users", loggedInUser.userId);

  const getCount = async () => {
    console.log("개별 게시글");
    const countDoc = (await getDoc(countRef)).data();
    setCount(countDoc);
  };

  useEffect(() => {
    getCount();
  }, []);

  const onBookmarkClick = async () => {
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
            m.id === hit.objectID ? { ...m, isBookmarked: false } : m
          )
        );
      } else {
        await deleteDoc(userIdeaRef);
        await updateDoc(userRef, {
          idea_count: increment(-1),
        });
        setIdeas(ideas.filter((f) => f.docId !== hit.objectID));
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
            m.id === hit.objectID ? { ...m, isBookmarked: true } : m
          )
        );
      } else {
        await setDoc(userIdeaRef, {
          docId: hit.objectID,
          userId: hit.userId,
          userName: hit.userName,
          userPhotoURL: hit.userPhotoURL,
          title: hit.title,
          text: hit.text,
          source: hit.source,
          tags: hit.tags,
          connectedIDs: hit.connectedIDs,
          createdAt: hit.createdAt,
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
            docId: hit.objectID,
            userId: hit.userId,
            userName: hit.userName,
            userPhotoURL: hit.userPhotoURL,
            title: hit.title,
            text: hit.text,
            source: hit.source,
            tags: hit.tags,
            connectedIDs: hit.connectedIDs,
            createdAt: hit.createdAt,
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
    <div
      key={hit.objectID}
      className={`relative w-full break-all overflow-hidden`}
    >
      {hit.title.length > 0 && (
        <div className="mb-2 font-black">
          <Highlight className="truncate" attribute="title" hit={hit} />
        </div>
      )}
      <div className="w-full mb-4">
        <Highlight
          attribute="text"
          hit={hit}
          classNames={{
            root: "line-clamp-5",
            highlighted: "font-black",
          }}
        />
      </div>
      <div className="mb-4 text-xs">
        {hit.source.length > 0 && (
          <div className="mb-2 flex items-center gap-2 pl-2 text-stone-400 truncate">
            <FontAwesomeIcon icon={faQuoteLeft} />
            <Highlight attribute="source" hit={hit} />
          </div>
        )}
        {hit.tags.length > 0 && (
          <div className="flex items-center gap-2 pl-2 text-stone-400 truncate">
            <FontAwesomeIcon icon={faHashtag} />
            <Highlight attribute="tags" hit={hit} />
          </div>
        )}
      </div>
      <div className="flex justify-between items-center ">
        <span className="flex gap-2 items-center text-xs">
          <Avatar
            className="border-2"
            alt="avatar"
            src={hit.userPhotoURL}
            sx={{
              display: "flex",
              width: "25px",
              height: "25px",
            }}
          />
          <div className="flex-col">
            <span className="flex">
              <Highlight attribute="userName" hit={hit} />
            </span>
            <span className="flex">{hit.createdAt}</span>
          </div>
        </span>
      </div>
      {count && (
        <button
          className={`absolute bottom-0 right-0 ${
            count.bookmark_users.hasOwnProperty(loggedInUser.userId)
              ? "text-orange-400"
              : "text-stone-400"
          }`}
          onClick={onBookmarkClick}
        >
          <FontAwesomeIcon
            icon={
              count.bookmark_users.hasOwnProperty(loggedInUser.userId)
                ? fasBookmark
                : farBookmark
            }
            size="xl"
          />
        </button>
      )}
    </div>
  );
};

export default Hit;
