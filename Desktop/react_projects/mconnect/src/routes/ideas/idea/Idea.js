import "css/Animation.css";
import "css/App.css";
import IdeaTop from "./IdeaTop";
import IdeaMiddle from "./IdeaMiddle";
import IdeaBottom from "./IdeaBottom";
import DeleteDialog from "./DeleteDialog";
import React, { useState } from "react";
import { dbService } from "fbase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import Button from "@mui/material/Button";
import IdeaConnectedIdeas from "./IdeaConnectedIdeas";

const Idea = ({
  customHooks,
  user,
  dbIdea,
  getCategory,
  setViewIdea,
  isSelectMode,
  selectedIdeas,
  onSelectIdea,
}) => {
  const timeDisplay = customHooks.timeDisplay;
  const setNavValue = customHooks.setNavValue;
  const setUserContext = customHooks.setUserContext;
  const colorList = customHooks.colorList;
  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [viewDetail, setViewDetail] = useState(false);

  const onViewIdeaClick = async (dbIdea) => {
    const ideaRef = doc(dbService, "ideas", `${dbIdea.id}`);
    await updateDoc(ideaRef, { viewCount: ++dbIdea.viewCount });
    setTimeout(() => {
      setUserContext(0);
      setViewIdea(dbIdea);
      setNavValue("/ideas/viewidea");
    }, 100);
  };

  // 삭제 대화상자
  const onDeleteClick = async () => {
    setDeleteDialogOpen(false);
    setAnchorEl(null);
    const ideaRef = doc(dbService, "ideas", `${dbIdea.id}`);
    await deleteDoc(ideaRef);
  };

  return (
    <div className="duration-500 bg-white text-sm">
      <hr />
      <div>
        <div className="btn pt-4 ">
          <IdeaTop
            user={user}
            dbIdea={dbIdea}
            setNavValue={setNavValue}
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
            getCategory={getCategory}
          />
        </div>
        <IdeaBottom
          dbIdea={dbIdea}
          user={user}
          viewDetail={viewDetail}
          setViewDetail={setViewDetail}
          colorList={colorList}
        />
        <IdeaConnectedIdeas viewDetail={viewDetail} dbIdea={dbIdea} />
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
