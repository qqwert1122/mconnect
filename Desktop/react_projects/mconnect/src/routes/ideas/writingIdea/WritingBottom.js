import "css/Animation.css";
import SuggestedIdeas from "../SuggestedIdeas";
import ColoredIdeaList from "./ColoredIdeaList";
import InputSourceTab from "./InputSourceTab";
import InputTagTab from "./InputTagTab";
import WritingBottomBar from "./WritingBottomBar";
import RelatedIdeas from "./RelatedIdeas";
import { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {} from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/free-regular-svg-icons";
import { useRecoilValue } from "recoil";
import { formCnctedIdeasState, formTagsState, whatEditState } from "atom";

const WritingBottom = ({
  navigate,
  setNavValue,
  viewIdea,
  showTitleAndCnctn,
  bottomItemChangeProps,
  setBottomItemChangeProps,
  handleTabClose,
  isItIn,
  trends,
}) => {
  const sourceInput = useRef();
  const tagInput = useRef();

  const formCnctedIdeas = useRecoilValue(formCnctedIdeasState);
  const formTags = useRecoilValue(formTagsState);
  const whatEdit = useRecoilValue(whatEditState);

  const bottomItemChange = (e, props) => {
    e.preventDefault();
    const itemChangeMap = {
      1: bottomItemChangeProps === 1 ? 0 : 1,
      2: bottomItemChangeProps === 2 ? 0 : 2,
      3: bottomItemChangeProps === 3 ? 0 : 3,
      4: bottomItemChangeProps === 4 ? 0 : 4,
    };

    setBottomItemChangeProps(itemChangeMap[props] || 0);
  };

  useEffect(() => {
    switch (bottomItemChangeProps) {
      case 1:
        sourceInput.current.focus();
        break;
      case 2:
        tagInput.current.focus();
        break;
    }
  }, [bottomItemChangeProps]);

  const onIdeaClick = (e, idea) => {
    e.preventDefault();
    setBottomItemChangeProps(0);
    viewIdea(idea);
  };

  const onMyIdeaClick = (e, idea) => {
    e.preventDefault();
    setBottomItemChangeProps(0);
    viewIdea(idea, "my");
  };

  return (
    <div className="w-screen fixed bottom-0 z-20">
      <div
        className={`${
          bottomItemChangeProps === 0
            ? "translate-y-0"
            : "translate-y-full hidden"
        } absolute right-0 bottom-16`}
      >
        <ColoredIdeaList ideas={formCnctedIdeas} />
      </div>

      <div
        className={`${
          bottomItemChangeProps === 1 ? "-translate-y-14" : "translate-y-full"
        } absolute bottom-0 w-full z-10 duration-200 bg-white rounded-t-2xl border`}
      >
        <InputSourceTab
          handleTabClose={handleTabClose}
          bottomItemChangeProps={bottomItemChangeProps}
          sourceInput={sourceInput}
        />
      </div>

      <div
        className={`${
          bottomItemChangeProps === 2 ? "-translate-y-14" : "translate-y-full"
        } absolute bottom-0 w-full z-10 duration-200 bg-white rounded-t-2xl border`}
      >
        <InputTagTab
          handleTabClose={handleTabClose}
          bottomItemChangeProps={bottomItemChangeProps}
          tagInput={tagInput}
          trends={trends}
        />
      </div>

      <div
        className={`${
          bottomItemChangeProps === 3 ? "-translate-y-14" : "translate-y-full"
        } absolute bottom-0 w-full z-10 duration-200`}
      >
        <RelatedIdeas
          handleTabClose={handleTabClose}
          onIdeaClick={onMyIdeaClick}
        />
      </div>

      <div
        className={`${
          bottomItemChangeProps === 4 ? "-translate-y-14" : "translate-y-full"
        } absolute bottom-0 w-full z-10 duration-200 bg-white rounded-t-2xl border`}
      >
        <SuggestedIdeas
          setNavValue={setNavValue}
          docId={whatEdit.docId}
          writing={true}
          tagsPrmtr={formTags}
          tabClose={(e) => bottomItemChange(e, null)}
          onIdeaClick={onIdeaClick}
          isItIn={isItIn}
        />
      </div>

      <WritingBottomBar
        bottomItemChangeProps={bottomItemChangeProps}
        bottomItemChange={bottomItemChange}
        showTitleAndCnctn={showTitleAndCnctn}
      />
    </div>
  );
};

export default WritingBottom;
