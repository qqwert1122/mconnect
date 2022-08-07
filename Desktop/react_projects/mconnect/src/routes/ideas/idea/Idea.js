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
  updateDoc,
  increment,
  query,
  onSnapshot,
  collection,
  documentId,
  getDocs,
  where,
} from "firebase/firestore";
import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";
import { useNavigate } from "react-router-dom";
import { getContainerUtilityClass } from "@mui/system";

const Idea = ({
  setHeight,
  customHooks,
  navigate,
  user,
  userIdea,
  setWhatView,
  setWhatEdit,
  isSelectMode,
  selectedIdeas,
  onSelectIdea,
}) => {
  const timeDisplay = customHooks.timeDisplay;
  const colorList = customHooks.colorList;
  const isOwner = user.userId === userIdea.userId;

  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [viewDetail, setViewDetail] = useState(false);
  const [connectedIdeas, setConnectedIdeas] = useState([]);

  const getConncetedIdeas = async (ids) => {
    const q1 = query(
      collection(dbService, "users", user.userId, "userIdeas"),
      where(documentId(), "in", ids)
    );
    const ideaRef = await getDocs(q1);
    const newData = ideaRef.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setConnectedIdeas(newData);
  };

  // const q1 = query(
  //   collection(dbService, "users", user.userId, "userIdeas"),
  //   where("")
  // )
  // const ideaRef = await getDocs(query);
  // const newData = ideaRef.docs.map((doc) => ({
  //   id: doc.id,
  //   ...doc.data(),
  // }));
  useEffect(() => {
    if (userIdea.connectedIdeas.length > 0) {
      getConncetedIdeas(userIdea.connectedIdeas);
    }
  }, []);

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
    if (countData.view_users.hasOwnProperty(user.userId) === false) {
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
    await updateDoc(userIdeaRef, {
      isDeleted: true,
    });
    const countRef = doc(dbService, "counts", userIdea.id);
    const countData = (await getDoc(countRef)).data();
    if (user.userId != userIdea.userId) {
      delete countData.bookmark_users[user.userId];
      await updateDoc(countRef, {
        bookmark_count: increment(-1),
        bookmark_users: countData.bookmark_users,
      });
    }
    const userRef = doc(dbService, "users", user.userId);
    await updateDoc(userRef, {
      idea_count: increment(-1),
    });
  };

  return (
    <div className="bg-white shadow-lg text-sm">
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
                setWhatEdit={setWhatEdit}
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
              connectedIdeas={connectedIdeas}
              viewDetail={viewDetail}
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
