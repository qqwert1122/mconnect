import "css/Animation.css";
import "css/App.css";
import IdeaTop from "./IdeaTop";
import IdeaMiddle from "./IdeaMiddle";
import IdeaBottom from "./IdeaBottom";
import DeleteDialog from "./DeleteDialog";
import IdeaConnectedIdeas from "./IdeaConnectedIdeas";
import React, { useEffect, useState, useRef } from "react";
import { dbService } from "fbase";
import { doc, getDoc, updateDoc, increment } from "firebase/firestore";
import Skeleton from "@mui/material/Skeleton";
import { toast } from "react-toastify";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { userState, ideasState, whatViewState, selectedIdeasState } from "atom";

const Idea = ({ props, idea, i, index, isSelectMode }) => {
  const {
    navigate,
    viewIdea,
    initEditor,
    timeDisplay,
    getIdeasFromIDs,
    isItIn,
    countUpdate,
    onLikeUpdate,
    onBookmarkUpdate,
    onPublicUpdate,
    onDeleteClick,
    toastAlarm,
  } = props;

  const loggedInUser = useRecoilValue(userState);
  const [ideas, setIdeas] = useRecoilState(ideasState);
  const [selectedIdeas, setSelectedIdeas] = useRecoilState(selectedIdeasState);

  const isOwner = loggedInUser.userId === idea.userId;
  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [viewDetail, setViewDetail] = useState(false);

  const onSelectIdea = (idea) => {
    if (isItIn(selectedIdeas, idea)) {
      setSelectedIdeas(
        selectedIdeas.filter((_idea) => _idea.docId != idea.docId)
      );
    } else {
      if (selectedIdeas.length > 4) {
        toast.error("최대 5개까지 연결 가능합니다.", {
          theme: "colored",
        });
      } else {
        setSelectedIdeas([idea, ...selectedIdeas]);
      }
    }
  };

  const onIdeaClick = (idea) => {
    viewIdea(idea);
  };

  // 삭제 대화상자
  const _onDeleteClick = (idea) => {
    setDeleteDialogOpen(false);
    setAnchorEl(null);
    onDeleteClick(idea);
    setIdeas(ideas.filter((f) => f.docId !== idea.docId));
    toastAlarm("delete");
  };

  return (
    <div
      className={`rounded-lg bg-white text-sm ${
        i === ideas.length - 1 && "shadow-xl"
      }`}
    >
      {idea ? (
        <>
          <div className="pt-4">
            <IdeaTop
              isOwner={isOwner}
              idea={idea}
              navigate={navigate}
              isSelectMode={isSelectMode}
              anchorEl={anchorEl}
              setAnchorEl={setAnchorEl}
              onSelectIdea={onSelectIdea}
              timeDisplay={timeDisplay}
              setDeleteDialogOpen={setDeleteDialogOpen}
              initEditor={initEditor}
              isItIn={isItIn}
            />
            <IdeaMiddle
              isOwner={isOwner}
              idea={idea}
              onSelectIdea={onSelectIdea}
              onIdeaClick={onIdeaClick}
              timeDisplay={timeDisplay}
            />
          </div>
          <IdeaBottom
            isOwner={isOwner}
            idea={idea}
            index={index}
            viewDetail={viewDetail}
            setViewDetail={setViewDetail}
            countUpdate={countUpdate}
            onLikeUpdate={onLikeUpdate}
            onBookmarkUpdate={onBookmarkUpdate}
            onPublicUpdate={onPublicUpdate}
          />
          {idea.connectedIDs.length > 0 && (
            <IdeaConnectedIdeas
              idea={idea}
              getIdeasFromIDs={getIdeasFromIDs}
              viewDetail={viewDetail}
            />
          )}
          <DeleteDialog
            deleteDialogOpen={deleteDialogOpen}
            setDeleteDialogOpen={setDeleteDialogOpen}
            onDeleteClick={_onDeleteClick}
            idea={idea}
          />
        </>
      ) : (
        <div className="ml-4 flex-col">
          <div className="flex items-center gap-2">
            <Skeleton variant="circular" width={30} height={30} />
            <Skeleton variant="text" width={100} height={30} />
          </div>
          <Skeleton variant="text" width={320} height={160} />
        </div>
      )}
    </div>
  );
};

export default Idea;
