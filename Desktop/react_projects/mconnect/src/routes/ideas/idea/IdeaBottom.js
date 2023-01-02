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
import { useRecoilSnapshot, useRecoilState, useRecoilValue } from "recoil";
import { userState } from "atom";
import { ideasState } from "atom";
import { AssistantDirection } from "@mui/icons-material";

const IdeaBottom = ({
  isOwner,
  idea,
  index,
  viewDetail,
  setViewDetail,
  countUpdate,
  onLikeUpdate,
  onBookmarkUpdate,
  onPublicUpdate,
}) => {
  const loggedInUser = useRecoilValue(userState);
  const [ideas, setIdeas] = useRecoilState(ideasState);

  const onLikeClick = () => {
    onLikeUpdate(idea);
    countUpdate(idea, "like");
    setIdeas(
      ideas.map((m) =>
        m.docId === idea.docId ? { ...m, isLiked: !m.isLiked } : m
      )
    );
  };

  const onBookmarkClick = async () => {
    onBookmarkUpdate(idea);
    const ideaRef = doc(
      dbService,
      "users",
      loggedInUser.userId,
      "userIdeas",
      idea.docId
    );
    const userRef = doc(dbService, "users", loggedInUser.userId);
    if (isOwner === false) {
      deleteDoc(ideaRef);
      await updateDoc(userRef, {
        idea_count: increment(-1),
      });
      setIdeas(ideas.filter((f) => f.docId !== idea.docId));
      index.deleteObject(idea.searchId);
    } else {
      setIdeas(
        ideas.map((m) =>
          m.docId === idea.docId ? { ...m, isBookmarked: !m.isBookmarked } : m
        )
      );
    }
    countUpdate(idea, "bookmark");
  };

  const onPublicClick = () => {
    onPublicUpdate(idea);
    setIdeas(
      ideas.map((m) =>
        m.docId === idea.docId ? { ...idea, isPublic: !idea.isPublic } : m
      )
    );
    const _idea = {
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
      updatedAt: idea.updatedAt,
    };
    index.saveObject({
      ..._idea,
      isPublic: !idea.isPublic,
      objectID: idea.searchId,
    });
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
