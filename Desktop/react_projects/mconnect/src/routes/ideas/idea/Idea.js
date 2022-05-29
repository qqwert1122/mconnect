import "css/Idea.css";
import IdeaTop from "./IdeaTop";
import IdeaMiddle from "./IdeaMiddle";
import IdeaBottom from "./IdeaBottom";
import DeleteDialog from "./DeleteDialog";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { dbService } from "fbase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";

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
  let navigate = useNavigate();
  const timeDisplay = customHooks.timeDisplay;
  const setUserContext = customHooks.setUserContext;
  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const onViewIdeaClick = async (dbIdea) => {
    if (dbIdea.isClicked == false) {
      const ideaRef = doc(dbService, "ideas", `${dbIdea.id}`);
      await updateDoc(ideaRef, { isClicked: true });
    }
    setViewIdea(dbIdea);
    navigate("/ideas/viewidea", { replace: true });
  };

  // 삭제 대화상자
  const onDeleteClick = async () => {
    setDeleteDialogOpen(false);
    setAnchorEl(null);
    const ideaRef = doc(dbService, "ideas", `${dbIdea.id}`);
    await deleteDoc(ideaRef);
  };

  return (
    <div className="duration-500 bg-white">
      <hr />
      <div className="mt-4 opacity text-sm">
        <IdeaTop
          navigate={navigate}
          user={user}
          dbIdea={dbIdea}
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
        <hr />
        <IdeaBottom dbIdea={dbIdea} user={user} />
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
