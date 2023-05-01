import "css/Animation.css";
import SuggestedIdeas from "../SuggestedIdeas";
import ViewIdeaBottomBar from "./ViewIdeaBottomBar";
import ColoredIdeaList from "../writingIdea/ColoredIdeaList";
import ConnectedIdeas from "./ConnectedIdeas";
import { useEffect, useRef } from "react";
import {} from "@fortawesome/free-regular-svg-icons";

const ViewIdeaBottom = ({
  open,
  setOpen,
  setIsMount,
  content,
  itemChangeProps,
  setItemChangeProps,
  setNavValue,
  viewIdea,
  getIdeasFromIDs,
  isItIn,
}) => {
  const itemChange = (props) => {
    const itemChangeMap = {
      1: itemChangeProps === 1 ? 0 : 1,
      2: itemChangeProps === 2 ? 0 : 2,
      3: itemChangeProps === 3 ? 0 : 3,
    };
    setOpen(false);
    setItemChangeProps(itemChangeMap[props] || 0);
  };

  const onIdeaClick = (idea) => {
    setItemChangeProps(0);
    setIsMount(false);
    viewIdea(idea);
  };

  const onMyIdeaClick = (idea) => {
    setItemChangeProps(0);
    setIsMount(false);
    viewIdea(idea, "my");
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
    <div className="w-screen fixed bottom-0" ref={tabRef}>
      <div
        className={`${
          itemChangeProps === 0 ? "translate-y-0" : "translate-y-full hidden"
        } absolute right-0 bottom-16`}
      >
        <ColoredIdeaList ideas={content.connectedIDs} />
      </div>

      <div
        className={`${
          itemChangeProps === 1 ? "translate-y-0" : "translate-y-full"
        } absolute bottom-14 w-full z-10 duration-200 bg-white rounded-t-2xl border`}
      >
        <SuggestedIdeas
          setNavValue={setNavValue}
          docId={content.docId}
          Writing={false}
          tagsPrmtr={content.tags}
          tabClose={() => itemChange(1)}
          onIdeaClick={onIdeaClick}
          isItIn={isItIn}
        />
      </div>

      <div
        className={`${
          itemChangeProps === 2 && content.connectedIDs.length > 0
            ? "translate-y-0"
            : "translate-y-full"
        } absolute bottom-14 w-full z-10 duration-200 bg-white rounded-t-2xl shadow-inner`}
      >
        <ConnectedIdeas
          content={content}
          onIdeaClick={onMyIdeaClick}
          getIdeasFromIDs={getIdeasFromIDs}
          tabChange={itemChange}
        />
      </div>

      <div className="relative z-20">
        <ViewIdeaBottomBar
          content={content}
          itemChange={itemChange}
          itemChangeProps={itemChangeProps}
        />
      </div>
    </div>
  );
};

export default ViewIdeaBottom;
