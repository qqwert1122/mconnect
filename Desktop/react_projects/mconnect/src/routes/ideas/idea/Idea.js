import "css/Animation.css";
import "css/App.css";
import IdeaTop from "./IdeaTop";
import IdeaMiddle from "./IdeaMiddle";
import IdeaBottom from "./IdeaBottom";
import DeleteDialog from "./DeleteDialog";
import IdeaConnectedIdeas from "./IdeaConnectedIdeas";
import React, { useEffect, useState, useRef } from "react";
import { dbService } from "fbase";
import {
  doc,
  getDoc,
  deleteDoc,
  updateDoc,
  increment,
  query,
  onSnapshot,
  collection,
} from "firebase/firestore";
import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";
import { useNavigate } from "react-router-dom";

const Idea = ({
  setHeight,
  customHooks,
  navigate,
  user,
  userIdea,
  setWhatView,
  isSelectMode,
  selectedIdeas,
  onSelectIdea,
}) => {
  const timeDisplay = customHooks.timeDisplay;
  const colorList = customHooks.colorList;

  const heightRef = useRef();

  useEffect(() => {
    setHeight(heightRef.current.clientHeight);
  }, [heightRef]);

  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [viewDetail, setViewDetail] = useState(false);

  const onViewIdeaClick = async () => {
    const countRef = doc(dbService, "counts", userIdea.id);
    const countData = (await getDoc(countRef)).data();
    const userIdeaRef = doc(
      dbService,
      "users",
      user.userId,
      "userIdeas",
      userIdea.id
    );
    if (countData && userIdea.isViewed === false) {
      await updateDoc(countRef, {
        view_count: increment(1),
        view_users: { ...countData.view_users, [user.userId]: user.userName },
      });
      await updateDoc(userIdeaRef, {
        isViewed: true,
      });
    }
    setWhatView(userIdea);
    navigate(`/${userIdea.id}`);
  };

  // 삭제 대화상자
  const onDeleteClick = async () => {
    setDeleteDialogOpen(false);
    setAnchorEl(null);
    const userIdeaRef = doc(
      dbService,
      "users",
      user.userId,
      "userIdeas",
      userIdea.id
    );
    await deleteDoc(userIdeaRef);
    const countRef = doc(dbService, "counts", userIdea.id);
    const countData = (await getDoc(countRef)).data();
    if (user.userId != userIdea.userId) {
      delete countData.bookmark_users[user.userId];
      await updateDoc(countRef, {
        bookmark_count: increment(-1),
        bookmark_users: countData.bookmark_users,
      });
    } else {
      await deleteDoc(countRef);
    }
  };

  const [isOwner, setIsOwner] = useState(user.userId === userIdea.userId);

  return (
    <div ref={heightRef} className="bg-white text-sm">
      {userIdea ? (
        <>
          <hr />
          <div>
            <div className="btn pt-4 ">
              <IdeaTop
                user={user}
                isOwner={isOwner}
                userIdea={userIdea}
                navigate={navigate}
                setWhatView={setWhatView}
                isSelectMode={isSelectMode}
                selectedIdeas={selectedIdeas}
                anchorEl={anchorEl}
                setAnchorEl={setAnchorEl}
                onSelectIdea={onSelectIdea}
                timeDisplay={timeDisplay}
                setDeleteDialogOpen={setDeleteDialogOpen}
              />
              <IdeaMiddle
                user={user}
                isOwner={isOwner}
                userIdea={userIdea}
                onSelectIdea={onSelectIdea}
                onViewIdeaClick={onViewIdeaClick}
                timeDisplay={timeDisplay}
              />
            </div>
            <IdeaBottom
              user={user}
              isOwner={isOwner}
              userIdea={userIdea}
              viewDetail={viewDetail}
              setViewDetail={setViewDetail}
              colorList={colorList}
            />
            <IdeaConnectedIdeas
              viewDetail={viewDetail}
              userIdea={userIdea}
              colorList={colorList}
            />
          </div>
          <hr />
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
