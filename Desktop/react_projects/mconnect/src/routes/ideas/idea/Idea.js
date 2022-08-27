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

const Idea = ({ props, idea, index, isSelectMode }) => {
  const {
    navigate,
    initEditor,
    timeDisplay,
    getIdeasFromIDs,
    isItIn,
    countUpdate,
    onLikeUpdate,
    onBookmarkUpdate,
    onPublicUpdate,
  } = props;

  const loggedInUser = useRecoilValue(userState);
  const ideas = useRecoilValue(ideasState);
  const setWhatView = useSetRecoilState(whatViewState);
  const [selectedIdeas, setSelectedIdeas] = useRecoilState(selectedIdeasState);

  const isOwner = loggedInUser.userId === idea.userId;
  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [viewDetail, setViewDetail] = useState(false);

  useEffect(() => {
    if (idea.connectedIDs.length > 0) {
      getIdeasFromIDs(idea.connectedIDs);
    }
  }, []);

  const onSelectIdea = (idea) => {
    if (isItIn(selectedIdeas, idea)) {
      setSelectedIdeas(selectedIdeas.filter((_idea) => _idea.id != idea.id));
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

  const onViewIdeaClick = async () => {
    const countRef = doc(dbService, "counts", idea.id);
    const countData = (await getDoc(countRef)).data();
    const userIdeaRef = doc(
      dbService,
      "users",
      loggedInUser.userId,
      "userIdeas",
      idea.id
    );
    if (countData.view_users.hasOwnProperty(loggedInUser.userId) === false) {
      await updateDoc(countRef, {
        view_count: increment(1),
        view_users: {
          ...countData.view_users,
          [loggedInUser.userId]: loggedInUser.userName,
        },
      });
      await updateDoc(userIdeaRef, {
        isViewed: true,
      });
    }
    setWhatView(idea);
    navigate(`/${idea.id}`);
  };

  // 삭제 대화상자
  const onDeleteClick = async () => {
    setDeleteDialogOpen(false);
    setAnchorEl(null);
    const userIdeaRef = doc(
      dbService,
      "users",
      loggedInUser.userId,
      "userIdeas",
      idea.id
    );
    await updateDoc(userIdeaRef, {
      isDeleted: true,
    });
    const countRef = doc(dbService, "counts", idea.id);
    const countData = (await getDoc(countRef)).data();
    if (loggedInUser.userId != idea.userId) {
      delete countData.bookmark_users[loggedInUser.userId];
      await updateDoc(countRef, {
        bookmark_count: increment(-1),
        bookmark_users: countData.bookmark_users,
      });
    }
    const userRef = doc(dbService, "users", loggedInUser.userId);
    await updateDoc(userRef, {
      idea_count: increment(-1),
    });
  };

  return (
    <div
      className={`rounded-lg bg-white text-sm ${
        index === ideas.length - 1 && "shadow-xl"
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
              onViewIdeaClick={onViewIdeaClick}
              timeDisplay={timeDisplay}
            />
          </div>
          <IdeaBottom
            isOwner={isOwner}
            idea={idea}
            viewDetail={viewDetail}
            setViewDetail={setViewDetail}
            countUpdate={countUpdate}
            onLikeUpdate={onLikeUpdate}
            onBookmarkUpdate={onBookmarkUpdate}
            onPublicUpdate={onPublicUpdate}
          />
          {idea.connectedIDs.length > 0 && (
            <IdeaConnectedIdeas viewDetail={viewDetail} />
          )}
          <DeleteDialog
            deleteDialogOpen={deleteDialogOpen}
            setDeleteDialogOpen={setDeleteDialogOpen}
            onDeleteClick={onDeleteClick}
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
