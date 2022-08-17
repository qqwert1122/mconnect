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
  showTitleAndCnctn,
  bottomItemChangeProps,
  setBottomItemChangeProps,
}) => {
  const sourceInput = useRef();
  const tagInput = useRef();

  const formCnctedIdeas = useRecoilValue(formCnctedIdeasState);

  // const tabRef = useRef();

  // const tabCloseHandler = ({ target }) => {
  //   if (bottomItemChangeProps != 0 && !tabRef.current.contains(target))
  //     setBottomItemChangeProps(0);
  // };

  // useEffect(() => {
  //   window.addEventListener("click", tabCloseHandler);
  //   return () => {
  //     window.removeEventListener("click", tabCloseHandler);
  //   };
  // });

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
    <div
      className="w-screen fixed bottom-0 z-30"
      // ref={tabRef}
    >
      {bottomItemChangeProps === 0 && (
        <ColoredIdeaList ideas={formCnctedIdeas} />
      )}

      {bottomItemChangeProps === 1 && (
        <InputSourceTab sourceInput={sourceInput} />
      )}

      {bottomItemChangeProps === 2 && <InputTagTab tagInput={tagInput} />}

      {bottomItemChangeProps === 3 && <RelatedIdeas navigate={navigate} />}

      <WritingBottomBar
        bottomItemChangeProps={bottomItemChangeProps}
        setBottomItemChangeProps={setBottomItemChangeProps}
        showTitleAndCnctn={showTitleAndCnctn}
      />
    </div>
  );
};

export default WritingBottom;
