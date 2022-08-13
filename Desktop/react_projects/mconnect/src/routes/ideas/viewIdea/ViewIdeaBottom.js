import "css/Animation.css";
import SuggestedIdeas from "../SuggestedIdeas";
import ViewIdeaBottomBar from "./ViewIdeaBottomBar";
import ColoredIdeaList from "../writingIdea/ColoredIdeaList";
import ConnectedIdeas from "./ConnectedIdeas";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/free-regular-svg-icons";

const ViewIdeaBottom = ({
  itemChangeProps,
  setItemChangeProps,
  userIdeas,
  whatView,
  setWhatView,
  navigate,
  selectedIdeas,
  setSelectedIdeas,
  colorList,
  connectedIdeas,
}) => {
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
    setWhatView(idea);
    setItemChangeProps(0);
    navigate(`/${idea.id}`);
  };

  const tabRef = useRef();

  const tabCloseHandler = ({ target }) => {
    if (itemChangeProps != 0 && !tabRef.current.contains(target))
      setItemChangeProps(0);
  };

  useEffect(() => {
    window.addEventListener("click", tabCloseHandler);
    return () => {
      window.removeEventListener("click", tabCloseHandler);
    };
  });

  return (
    <div className="w-screen fixed bottom-0 z-30" ref={tabRef}>
      {itemChangeProps === 0 && (
        <ColoredIdeaList
          ideas={whatView.connectedIdeas}
          colorList={colorList}
        />
      )}
      {itemChangeProps === 1 && (
        <div className="moveRightToLeft bg-stone-50 shadow-inner">
          <SuggestedIdeas
            userIdeas={userIdeas}
            ideaPrmtr={whatView}
            tagsPrmtr={whatView.tags}
            itemChange={itemChange}
            whatEdit={undefined}
            formConnectedIdeas={undefined}
            setFormConnectedIdeas={undefined}
            onIdeaClick={onIdeaClick}
            selectedIdeas={selectedIdeas}
            setSelectedIdeas={setSelectedIdeas}
            connectedIdeas={connectedIdeas}
            thumbsUp={false}
          />
        </div>
      )}

      {itemChangeProps === 2 && whatView.connectedIdeas.length > 0 && (
        <ConnectedIdeas
          connectedIdeas={connectedIdeas}
          whatView={whatView}
          onIdeaClick={onIdeaClick}
        />
      )}

      {/* bottomBar */}
      <ViewIdeaBottomBar
        whatView={whatView}
        itemChange={itemChange}
        itemChangeProps={itemChangeProps}
      />
    </div>
  );
};

export default ViewIdeaBottom;
