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

const SuggestedIdea = ({
  writing,
  loggedInUser,
  idea,
  isChecked,
  onIdeaSelect,
  onIdeaClick,
}) => {
  const getCount = async () => {
    const countRef = doc(dbService, "counts", idea.id);
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
    const countRef = doc(dbService, "counts", idea.id);
    const userIdeaRef = doc(
      dbService,
      "users",
      loggedInUser.userId,
      "userIdeas",
      idea.id
    );
    const userRef = doc(dbService, "users", loggedInUser.userId);

    const newCount = { ...count };
    if (count.bookmark_users.hasOwnProperty(loggedInUser.userId)) {
      delete newCount.bookmark_users[loggedInUser.userId];
      // update state for re-rendering
      setCount(newCount);
      // update firestore
      await updateDoc(countRef, {
        bookmark_count: increment(-1),
        bookmark_users: newCount.bookmark_users,
      });
      if (isOwner) {
        // if user is owner, update userIdea
        await updateDoc(userIdeaRef, {
          isBookmarked: false,
        });
      } else {
        // if user is not owner, delete userIdea
        await deleteDoc(userIdeaRef);
        await updateDoc(userRef, {
          idea_count: increment(-1),
        });
      }
    } else {
      newCount.bookmark_users[loggedInUser.userId] = loggedInUser.userName;
      // update state for re-rendering
      setCount(newCount);
      // update firestore
      await updateDoc(countRef, {
        bookmark_count: increment(1),
        bookmark_users: {
          ...count.bookmark_users,
          [loggedInUser.userId]: loggedInUser.userName,
        },
      });
      if (isOwner) {
        // if user is owner, update userIdea
        await updateDoc(userIdeaRef, {
          isBookmarked: true,
        });
      } else {
        // if user is not owner, create new userIdea
        await setDoc(userIdeaRef, {
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
      }
    }
  };

  return (
    <div className="relative">
      <button
        className={`absolute top-0 right-0 rounded-full ${
          isChecked(idea)
            ? "bg-red-400 text-white"
            : "border-2 border-stone-400"
        } w-6 h-6 shadow-xl`}
        onClick={(e) => {
          onIdeaSelect(e, idea);
        }}
      >
        {isChecked(idea) && <FontAwesomeIcon icon={faCheck} />}
      </button>
      <div
        className="h-60 p-4 m-1 bg-white shadow rounded-3xl text-xs break-all"
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
