import SuggestedIdeas from "../SuggestedIdeas";
import ViewIdeaBottomBar from "./ViewIdeaBottomBar";
import ConnectedIdeas from "./ConnectedIdeas";
import { useState } from "react";
import ColoredIdeaList from "../writingIdea/ColoredIdeaList";

const ViewIdeaBottom = ({
  dbIdeas,
  viewIdea,
  setViewIdea,
  getCategory,
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
        <ColoredIdeaList
          ideas={viewIdea.connectedIdeas}
          colorList={colorList}
        />
      )}
      {itemChangeProps === 1 && (
        <div className="opacity bg-stone-50 shadow-inner">
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
