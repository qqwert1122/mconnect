import "css/Gradient.css";
import Idea from "routes/ideas/idea/Idea";
import IdeasTopBar from "./IdeasTopBar";
import BottomNavigationBar from "routes/BottomNavigationBar";
import FloatingActionButton from "./FloatingActionButton";
import React, { useEffect, useState } from "react";
import { useBottomScrollListener } from "react-bottom-scroll-listener";
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
  faPen,
  faBookmark,
  faCompass,
} from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/free-regular-svg-icons";
import { useRecoilValue } from "recoil";
import { ideasState, selectedIdeasState } from "atom";
import { recentTagsState } from "atom";
import { Avatar, CircularProgress } from "@mui/material";
import NotesRoundedIcon from "@mui/icons-material/NotesRounded";
import ExploreRoundedIcon from "@mui/icons-material/ExploreRounded";
import { throttle } from "lodash";

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
    index,
    toastAlarm,
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
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    centerMode: false,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = throttle(() => {
      setScrollY(window.scrollY);
    }, 500);

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <BottomNavigationBar navValue={navValue} setNavValue={setNavValue} />
      <IdeasTopBar
        {...props}
        scrollY={scrollY}
        isSelectMode={isSelectMode}
        setIsSelectMode={setIsSelectMode}
        isViewDetailsClicked={isViewDetailsClicked}
        setIsViewDetailsClicked={setIsViewDetailsClicked}
      />
      <div
        className={`${
          isSelectMode && selectedIdeas.length ? "pt-44" : "pt-24"
        } pb-16 bg-stone-50 min-h-screen`}
      >
        <ul className={`font-black`}>
          <Slider {...settings}>
            <li className="stacked-linear-1 overflow-hidden relative p-5 w-full h-36 text-sm shadow text-white">
              <div className="absolute top-10 left-4 w-3/5">
                <h1 className="mb-2 font-black text-xl">기록하세요</h1>
                <p>아이디어는 혁신의 씨앗,</p>
                <p>지금 바로 기록하세요</p>
              </div>
              <img
                className="absolute top-4 right-4 drop-shadow-2xl"
                width={150}
                src="./img/tutorial_1.png"
              />
            </li>
            <li className="stacked-linear-2 overflow-hidden relative p-5 w-full h-36 text-sm shadow text-white">
              <div className="absolute top-10 left-4 w-3/5">
                <h1 className="mb-2 font-black text-xl">저장하세요</h1>
                <p>다른 사람의 아이디어를</p>
                <p>탐색하고 저장하세요</p>
              </div>
              <img
                className="absolute top-4 right-4 drop-shadow-2xl"
                width={150}
                src="./img/tutorial_2.png"
              />
            </li>
            <li className="stacked-linear-3 overflow-hidden relative p-5 w-full h-36 text-sm shadow text-white">
              <div className="absolute top-10 left-4 w-3/5">
                <h1 className="mb-2 text-xl">연결하세요</h1>
                <p>전에 없던 브레인스토밍,</p>
                <p>당신의 창의력을 발휘하세요</p>
                {/* <p>아이디어들을 연결해</p>
                  <p>새로운 아이디어를 찾으세요</p> */}
              </div>
              <img
                className="absolute top-4 right-4 drop-shadow-2xl"
                width={150}
                src="./img/tutorial_3.png"
              />
            </li>
          </Slider>
        </ul>
        {ideas.length > 0 ? (
          <>
            {ideas.map((idea, i) => (
              <div key={i} className="my-1">
                <Idea
                  props={props}
                  idea={idea}
                  i={i}
                  index={index}
                  isSelectMode={isSelectMode}
                />
                {i % 7 === 6 && (
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
      <FloatingActionButton
        scrollY={scrollY}
        navigate={navigate}
        initForm={initForm}
      />

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
