import Idea from "routes/ideas/idea/Idea";
import IdeasTopBar from "./IdeasTopBar";
import BottomNavigationBar from "routes/BottomNavigationBar";
import FloatingActionButton from "./FloatingActionButton";
import React, { useEffect, useState } from "react";
import { useBottomScrollListener } from "react-bottom-scroll-listener";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleExclamation,
  faAd,
  faQuoteLeft,
  faPlusCircle,
  faPlus,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/free-regular-svg-icons";
import { useRecoilValue } from "recoil";
import { ideasState, selectedIdeasState } from "atom";
import { recentTagsState } from "atom";
import { Avatar, CircularProgress } from "@mui/material";
import NotesRoundedIcon from "@mui/icons-material/NotesRounded";
import ExploreRoundedIcon from "@mui/icons-material/ExploreRounded";

const Ideas = ({ ...props }) => {
  const {
    getNextPosts,
    navValue,
    setNavValue,
    navigate,
    viewIdea,
    timeDisplay,
    getIDsFromIdeas,
    getIdeasFromIDs,
    isItIn,
    initForm,
    initEditor,
    alarm,
    setAlarm,
    countUpdate,
    onLikeUpdate,
    onBookmarkUpdate,
    onPublicUpdate,
    onDeleteClick,
    trends,
  } = props;

  const ideas = useRecoilValue(ideasState);
  const selectedIdeas = useRecoilValue(selectedIdeasState);

  useBottomScrollListener(getNextPosts, {
    triggerOnNoScroll: false,
  });

  // setting
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [isViewDetailsClicked, setIsViewDetailsClicked] = useState(false);

  useEffect(() => {
    if (selectedIdeas.length > 0) {
      setIsSelectMode(true);
    } else {
      setIsSelectMode(false);
    }
  }, [selectedIdeas.length]);

  const settings = {
    dots: true,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToScroll: 1,
    centerMode: false,
    focusOnSelect: true,
    initialSlide: 0,
  };

  return (
    <>
      <BottomNavigationBar navValue={navValue} setNavValue={setNavValue} />
      <>
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
          } pb-16 bg-stone-50 min-h-screen`}
        >
          <div className="pt-6 pb-2 pl-4 font-black text-sm">
            기록하세요, 저장하세요, 연결하세요
          </div>
          <ul className={`pb-10`}>
            <Slider {...settings}>
              <li className="relative p-5 w-full h-32 bg-gradient-to-r from-orange-300 to-pink-300 text-orange-100 text-sm shadow">
                <div className="w-3/5 font-bold">
                  <h1 className="mb-2 font-black text-xl text-white">
                    기록하세요
                  </h1>
                  <p>경제, 정치, 기술 무엇이든</p>
                  <p>기록하세요</p>
                </div>
                <img
                  className="absolute top-4 right-10"
                  width={100}
                  src="./img/info_1.png"
                />
              </li>
              <li className="relative p-5 w-full h-32 bg-gradient-to-r from-pink-300 to-red-300 text-red-100 text-sm shadow">
                <div className="w-3/5 font-bold">
                  <h1 className="mb-2 font-black text-xl text-white">
                    저장하세요
                  </h1>
                  <p>다른 사람들의 아이디어를</p>
                  <p>탐색하고 저장하세요</p>
                </div>
                <img
                  className="absolute top-4 right-10"
                  width={100}
                  src="./img/info_2.png"
                />
              </li>
              <li className="relative p-5 w-full h-32 bg-gradient-to-r from-red-300 to-amber-200 text-orange-100 text-sm shadow">
                <div className="w-3/5 font-bold">
                  <h1 className="mb-2 font-black text-xl text-white">
                    연결하세요
                  </h1>
                  <p>아이디어들을 연결해</p>
                  <p>새로운 아이디어를 찾으세요</p>
                </div>
                <img
                  className="absolute top-4 right-10"
                  width={100}
                  src="./img/info_3.png"
                />
              </li>
            </Slider>
          </ul>

          {ideas.length > 0 ? (
            <>
              {ideas.map((idea, index) => (
                <div key={index} className="my-1">
                  <Idea
                    props={props}
                    idea={idea}
                    index={index}
                    isSelectMode={isSelectMode}
                  />
                  {index % 7 === 6 && (
                    <div className="py-6 bg-stone-600 text-stone-400 text-sm text-center font-black ">
                      광고 <FontAwesomeIcon icon={faAd} />
                    </div>
                  )}
                </div>
              ))}
            </>
          ) : (
            <div className="h-96 flex items-center justify-center text-base font-black text-gray-400 ">
              새 아이디어를 입력해주세요 ✏️
            </div>
          )}
        </div>
        <FloatingActionButton navigate={navigate} initForm={initForm} />
        {/* <FloatingUpButton scrollY={scrollY} setScrollY={setScrollY} /> */}
      </>
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
