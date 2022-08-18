import { dbService } from "fbase";
import { doc, getDoc, increment, updateDoc } from "firebase/firestore";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCompass as fasCompass,
  faHeart as fasHeart,
  faBookmark as fasBookmark,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";
import {
  faCompass as farCompass,
  faHeart as farHeart,
  faBookmark as farBookmark,
} from "@fortawesome/free-regular-svg-icons";
import ColoredIdeaList from "../writingIdea/ColoredIdeaList";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "atom";
import { countState } from "atom";

const IdeaBottom = ({ isOwner, idea, viewDetail, setViewDetail, getCount }) => {
  const loggedInUser = useRecoilValue(userState);
  const count = useRecoilValue(countState);
  const isDeleted = count === undefined;

  useEffect(() => {
    getCount(idea);
  }, []);

  const countRef = doc(dbService, "counts", idea.id);
  const ideaRef = doc(
    dbService,
    "users",
    loggedInUser.userId,
    "userIdeas",
    idea.id
  );
  const userRef = doc(dbService, "users", loggedInUser.userId);

  const onLikeClick = async () => {
    if (idea.isLiked) {
      if (isDeleted) {
        await updateDoc(ideaRef, {
          isLiked: false,
        });
      } else {
        delete count.like_users[loggedInUser.userId];
        await updateDoc(countRef, {
          like_count: increment(-1),
          like_users: count.like_users,
        });
        await updateDoc(ideaRef, {
          isLiked: false,
        });
      }
    } else {
      if (isDeleted) {
        await updateDoc(ideaRef, {
          isLiked: true,
        });
      } else {
        await updateDoc(countRef, {
          like_count: increment(1),
          like_users: {
            ...count.like_users,
            [loggedInUser.userId]: loggedInUser.userName,
          },
        });
        await updateDoc(ideaRef, {
          isLiked: true,
        });
      }
    }
  };

  const onBookmarkClick = async () => {
    if (idea.isBookmarked) {
      if (isDeleted) {
        await updateDoc(ideaRef, {
          isBookmarked: false,
        });
      } else {
        delete count.bookmark_users[loggedInUser.userId];
        await updateDoc(countRef, {
          bookmark_count: increment(-1),
          bookmark_users: count.bookmark_users,
        });
        await updateDoc(ideaRef, {
          isBookmarked: false,
        });
      }
      if (isOwner === false) {
        await updateDoc(ideaRef, {
          isDeleted: true,
        });
        await updateDoc(userRef, {
          idea_count: increment(-1),
        });
      }
    } else {
      if (isDeleted) {
        await updateDoc(ideaRef, {
          isBookmarked: true,
        });
      } else {
        await updateDoc(countRef, {
          bookmark_count: increment(1),
          bookmark_users: {
            ...count.bookmark_users,
            [loggedInUser.userId]: loggedInUser.userName,
          },
        });
        await updateDoc(ideaRef, {
          isBookmarked: true,
        });
      }
    }
  };

  const onPublicClick = async () => {
    if (isOwner) {
      const ideaRef = doc(
        dbService,
        "users",
        loggedInUser.userId,
        "userIdeas",
        idea.id
      );
      await updateDoc(ideaRef, { isPublic: !idea.isPublic });
    }
  };

  const onDetailClick = () => {
    setViewDetail((prev) => !prev);
  };

  return (
    <>
      <div className="flex items-center px-5 pb-5 gap-5 text-stone-500">
        <button
          className={`${idea.isLiked && "text-red-400"}`}
          onClick={onLikeClick}
        >
          <FontAwesomeIcon
            icon={idea.isLiked ? fasHeart : farHeart}
            size="lg"
          />
        </button>
        <button
          className={`${idea.isBookmarked && "text-orange-400"}`}
          onClick={onBookmarkClick}
        >
          <FontAwesomeIcon
            icon={idea.isBookmarked ? fasBookmark : farBookmark}
            size="lg"
          />
        </button>
        {isOwner && (
          <button
            className={`${idea.isPublic && "text-sky-400"}`}
            onClick={onPublicClick}
          >
            <FontAwesomeIcon
              icon={idea.isPublic ? fasCompass : farCompass}
              size="lg"
            />
          </button>
        )}

        <div
          className={`${
            idea.connectedIDs.length === 0 && "hidden"
          } w-full flex justify-end gap-2`}
        >
          <ColoredIdeaList ideas={idea.connectedIDs} small={true} />
          <div
            className={`flex items-center text-stone-500 ${
              viewDetail && "rotate-180"
            } duration-500`}
            onClick={onDetailClick}
          >
            <FontAwesomeIcon icon={faAngleDown} size="xl" />
          </div>
        </div>
      </div>
    </>
  );
};

export default IdeaBottom;
