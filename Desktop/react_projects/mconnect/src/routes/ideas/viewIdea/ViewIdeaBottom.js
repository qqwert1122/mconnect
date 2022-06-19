import "css/Animation.css";
import SuggestedIdeas from "../SuggestedIdeas";
import ViewIdeaBottomBar from "./ViewIdeaBottomBar";
import ColoredIdeaList from "../writingIdea/ColoredIdeaList";
import ConnectedIdeas from "./ConnectedIdeas";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/free-regular-svg-icons";

const ViewIdeaBottom = ({
  dbIdeas,
  viewIdea,
  setViewIdea,
  getCategory,
  onBackClick,
  setNavValue,
  selectedIdeas,
  setSelectedIdeas,
  colorList,
}) => {
  const [itemChangeProps, setItemChangeProps] = useState(0);
  const itemChange = (props) => {
    switch (props) {
      case 1:
        if (itemChangeProps != 1) {
          setItemChangeProps(1);
        } else {
          setItemChangeProps(0);
        }
        break;
      case 2:
        if (itemChangeProps != 2) {
          setItemChangeProps(2);
        } else {
          setItemChangeProps(0);
        }
        break;
      case 3:
        if (itemChangeProps != 3) {
          setItemChangeProps(3);
        } else {
          setItemChangeProps(0);
        }
        break;
    }
  };

  const onIdeaClick = (idea) => {
    setViewIdea(idea);
    setNavValue("/ideas/viewidea");
  };

  return (
    <div className="w-screen fixed bottom-0 z-30">
      {itemChangeProps === 0 && (
        <>
          <div className="flex justify-end px-3">
            <button
              className="p-2 px-3 shadow-2xl rounded-full text-sm font-black border-4 border-stone-300 bg-stone-500 text-white rotate-90"
              onClick={onBackClick}
            >
              <FontAwesomeIcon icon={faAngleDown} />
            </button>
          </div>
          <ColoredIdeaList
            ideas={viewIdea.connectedIdeas}
            colorList={colorList}
          />
        </>
      )}
      {itemChangeProps === 1 && (
        <div className="moveRightToLeft bg-stone-50 shadow-inner">
          <SuggestedIdeas
            dbIdeas={dbIdeas}
            ideaPrmtr={viewIdea}
            tagsPrmtr={viewIdea.tags}
            itemChange={itemChange}
            onIdeaClick={onIdeaClick}
            selectedIdeas={selectedIdeas}
            setSelectedIdeas={setSelectedIdeas}
            thumbsUp={false}
          />
        </div>
      )}

      {itemChangeProps === 2 && viewIdea.connectedIdeas.length > 0 && (
        <ConnectedIdeas viewIdea={viewIdea} onIdeaClick={onIdeaClick} />
      )}

      {/* bottomBar */}
      <ViewIdeaBottomBar
        viewIdea={viewIdea}
        getCategory={getCategory}
        itemChange={itemChange}
        itemChangeProps={itemChangeProps}
      />
    </div>
  );
};

export default ViewIdeaBottom;
