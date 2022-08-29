import "css/Animation.css";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {} from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/free-regular-svg-icons";
import ColoredIdeaList from "./ColoredIdeaList";
import InputSourceTab from "./InputSourceTab";
import InputTagTab from "./InputTagTab";
import WritingBottomBar from "./WritingBottomBar";
import RelatedIdeas from "./RelatedIdeas";
import { useRecoilValue } from "recoil";
import { formCnctedIdeasState } from "atom";

const WritingBottom = ({
  navigate,
  viewIdea,
  showTitleAndCnctn,
  bottomItemChangeProps,
  setBottomItemChangeProps,
  isItIn,
  trends,
}) => {
  const sourceInput = useRef();
  const tagInput = useRef();

  const formCnctedIdeas = useRecoilValue(formCnctedIdeasState);

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

  return (
    <div className="w-screen fixed bottom-0 z-30">
      {bottomItemChangeProps === 0 && (
        <ColoredIdeaList ideas={formCnctedIdeas} />
      )}

      {bottomItemChangeProps === 1 && (
        <InputSourceTab sourceInput={sourceInput} />
      )}

      {bottomItemChangeProps === 2 && (
        <InputTagTab tagInput={tagInput} trends={trends} />
      )}

      {bottomItemChangeProps === 3 && (
        <RelatedIdeas viewIdea={viewIdea} isItIn={isItIn} />
      )}

      <WritingBottomBar
        bottomItemChangeProps={bottomItemChangeProps}
        setBottomItemChangeProps={setBottomItemChangeProps}
        showTitleAndCnctn={showTitleAndCnctn}
      />
    </div>
  );
};

export default WritingBottom;
