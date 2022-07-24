import "css/Animation.css";
import "css/App.css";
import IdeaTop from "./IdeaTop";
import IdeaMiddle from "./IdeaMiddle";
import IdeaBottom from "./IdeaBottom";
import DeleteDialog from "./DeleteDialog";
import React, { useEffect, useState, useRef } from "react";
import { dbService } from "fbase";
import { doc, deleteDoc, updateDoc, increment } from "firebase/firestore";
import Button from "@mui/material/Button";
import IdeaConnectedIdeas from "./IdeaConnectedIdeas";
import { useNavigate } from "react-router-dom";

const Idea = ({
  setHeight,
  customHooks,
  navigate,
  user,
  dbIdea,
  setViewIdea,
  isSelectMode,
  selectedIdeas,
  onSelectIdea,
}) => {
  const timeDisplay = customHooks.timeDisplay;
  const setUserContext = customHooks.setUserContext;
  const colorList = customHooks.colorList;
  const heightRef = useRef();
  useEffect(() => {
    setHeight(heightRef.current.clientHeight);
  }, [heightRef]);

  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [viewDetail, setViewDetail] = useState(false);

  const onViewIdeaClick = async (dbIdea) => {
    const ideaRef = doc(dbService, "ideas", `${dbIdea.id}`);
    if (dbIdea.view_users.hasOwnProperty(user.userId) === false) {
      await updateDoc(ideaRef, {
        viewCount: increment(1),
        view_users: { ...dbIdea.view_users, [user.userId]: true },
      });
    }
    setViewIdea(dbIdea);
    navigate("/viewidea");
  };

  // 삭제 대화상자
  const onDeleteClick = async () => {
    setDeleteDialogOpen(false);
    setAnchorEl(null);
    const ideaRef = doc(dbService, "ideas", `${dbIdea.id}`);
    await deleteDoc(ideaRef);
  };

  return (
    <div ref={heightRef} className="duration-500 bg-white text-sm">
      <hr />
      <div>
        <div className="btn pt-4 ">
          <IdeaTop
            user={user}
            dbIdea={dbIdea}
            navigate={navigate}
            setUserContext={setUserContext}
            setViewIdea={setViewIdea}
            isSelectMode={isSelectMode}
            selectedIdeas={selectedIdeas}
            anchorEl={anchorEl}
            setAnchorEl={setAnchorEl}
            onSelectIdea={onSelectIdea}
            timeDisplay={timeDisplay}
            setDeleteDialogOpen={setDeleteDialogOpen}
          />
          <IdeaMiddle
            dbIdea={dbIdea}
            onSelectIdea={onSelectIdea}
            onViewIdeaClick={onViewIdeaClick}
          />
        </div>
        <IdeaBottom
          dbIdea={dbIdea}
          user={user}
          viewDetail={viewDetail}
          setViewDetail={setViewDetail}
          colorList={colorList}
        />
        <IdeaConnectedIdeas
          viewDetail={viewDetail}
          dbIdea={dbIdea}
          colorList={colorList}
        />
      </div>
      <hr />
      <DeleteDialog
        deleteDialogOpen={deleteDialogOpen}
        setDeleteDialogOpen={setDeleteDialogOpen}
        onDeleteClick={onDeleteClick}
      />
    </div>
  );
};

export default Idea;
