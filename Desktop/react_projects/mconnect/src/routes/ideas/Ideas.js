import Idea from "routes/ideas/idea/Idea";
import IdeasTopBar from "./IdeasTopBar";
import BottomNavigationBar from "routes/BottomNavigationBar";
import IdeasToggleButton from "routes/ideas/IdeasToggleButton";
import FloatingActionButton from "./FloatingActionButton";
import FloatingUpButton from "./FloatingUpButton";
import React, { useEffect, useRef, useState } from "react";
import { useBottomScrollListener } from "react-bottom-scroll-listener";
import { VariableSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { ToastContainer } from "react-toastify";
import { authService } from "fbase";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle,
  faDiceD6,
  faMinus,
  faSquare,
  faCompass as fasCompass,
  faHeart as fasHeart,
  faBookmark as fasBookmark,
  faHeart,
  faCircleNodes,
} from "@fortawesome/free-solid-svg-icons";
import {
  faCompass as farCompass,
  faHeart as farHeart,
  faBookmark as farBookmark,
} from "@fortawesome/free-regular-svg-icons";
import { useRecoilValue } from "recoil";
import { ideaListState } from "atom";
import { selectedIdeaListState } from "atom";
import { ideasState } from "atom";
import { selectedIdeasState } from "atom";

const Ideas = ({ ...props }) => {
  const {
    navValue,
    setNavValue,
    navigate,
    timeDisplay,
    getIDsFromIdeas,
    getIdeasFromIDs,
    isItIn,
    initForm,
    initEditor,
    getCount,
  } = props;

  const ideas = useRecoilValue(ideasState);
  const selectedIdeas = useRecoilValue(selectedIdeasState);

  // setting
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [isViewDetailsClicked, setIsViewDetailsClicked] = useState(false);

  // useBottomScrollListener(getNextPosts, {
  //   triggerOnNoScroll: true,
  // });

  // useEffect(() => {
  //   setTimeout(() => {
  //     window.scrollTo(0, scrollY);
  //   }, 100);
  // }, []);

  useEffect(() => {
    if (selectedIdeas.length > 0) {
      setIsSelectMode(true);
    } else {
      setIsSelectMode(false);
    }
  }, [selectedIdeas.length]);

  return (
    <>
      <BottomNavigationBar navValue={navValue} setNavValue={setNavValue} />
      <div className="relative bg-stone-100">
        <IdeasTopBar
          {...props}
          isSelectMode={isSelectMode}
          setIsSelectMode={setIsSelectMode}
          isViewDetailsClicked={isViewDetailsClicked}
          setIsViewDetailsClicked={setIsViewDetailsClicked}
        />
        <div
          className={`${
            isSelectMode && selectedIdeas.length ? "pt-36" : "pt-14"
          } pb-14 bg-stone-100 min-h-screen`}
        >
          {ideas.length > 0 ? (
            <>
              {/* <List
              height={1000}
              width={"100%"}
              itemCount={showingIdeas.length}
              itemSize={getItemSize}
            > */}
              {ideas.map((idea, index) => (
                <Idea
                  key={idea.id}
                  props={props}
                  idea={idea}
                  index={index}
                  isSelectMode={isSelectMode}
                />
              ))}
              {/* </List> */}
            </>
          ) : (
            <div className="h-96 flex items-center justify-center text-base font-black text-gray-400 ">
              새 아이디어를 입력해주세요 ✏️
            </div>
          )}
        </div>

        <FloatingActionButton navigate={navigate} initForm={initForm} />

        {/* <FloatingUpButton scrollY={scrollY} setScrollY={setScrollY} /> */}
      </div>
      <ToastContainer
        className="black-background"
        position="bottom-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default Ideas;
