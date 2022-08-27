import { dbService } from "fbase";
import {
  deleteDoc,
  doc,
  getDoc,
  increment,
  updateDoc,
} from "firebase/firestore";
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
import { userState, countState } from "atom";

const IdeaBottom = ({
  isOwner,
  idea,
  viewDetail,
  setViewDetail,
  countUpdate,
  onLikeUpdate,
  onBookmarkUpdate,
  onPublicUpdate,
}) => {
  const loggedInUser = useRecoilValue(userState);
  // const isDeleted = count === undefined;
  const isDeleted = false;

  const countRef = doc(dbService, "counts", idea.id);
  const ideaRef = doc(
    dbService,
    "users",
    loggedInUser.userId,
    "userIdeas",
    idea.id
  );
  const userRef = doc(dbService, "users", loggedInUser.userId);

  const onLikeClick = () => {
    onLikeUpdate(idea);
    countUpdate(idea, "like");
  };

  const onBookmarkClick = () => {
    onBookmarkUpdate(idea);
    if (isOwner === false) {
      deleteDoc(ideaRef);
    }
    countUpdate(idea, "bookmark");
  };

  const onPublicClick = () => {
    onPublicUpdate(idea);
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
