import "css/Animation.css";
import SuggestedIdeas from "../SuggestedIdeas";
import ViewIdeaBottomBar from "./ViewIdeaBottomBar";
import ColoredIdeaList from "../writingIdea/ColoredIdeaList";
import ConnectedIdeas from "./ConnectedIdeas";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/free-regular-svg-icons";
import { useRecoilState } from "recoil";
import { whatViewState } from "atom";

const ViewIdeaBottom = ({
  itemChangeProps,
  setItemChangeProps,
  navigate,
  getIdeasFromIDs,
  isItIn,
}) => {
  const [whatView, setWhatView] = useRecoilState(whatViewState);

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

  // Ref
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
        <ColoredIdeaList ideas={whatView.connectedIDs} />
      )}
      {itemChangeProps === 1 && (
        <div className="moveRightToLeft bg-stone-50 shadow-inner">
          <SuggestedIdeas
            id={whatView.id}
            Writing={false}
            tagsPrmtr={whatView.tags}
            tabChange={itemChange}
            onIdeaClick={onIdeaClick}
            isItIn={isItIn}
          />
        </div>
      )}
      {itemChangeProps === 2 && whatView.connectedIDs.length > 0 && (
        <ConnectedIdeas
          onIdeaClick={onIdeaClick}
          getIdeasFromIDs={getIdeasFromIDs}
        />
      )}
      <ViewIdeaBottomBar
        itemChange={itemChange}
        itemChangeProps={itemChangeProps}
      />
    </div>
  );
};

export default ViewIdeaBottom;
