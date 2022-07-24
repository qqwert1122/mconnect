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
import { ToastContainer, toast } from "react-toastify";
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

const Ideas = ({ customHooks }) => {
  const getNextPosts = customHooks.getNextPosts;
  const user = customHooks.loggedInUser;
  const dbIdeas = customHooks.dbIdeas;
  const scrollY = customHooks.scrollY;
  const setScrollY = customHooks.setScrollY;
  const navigate = customHooks.navigate;
  const [showingIdeas, setShowingIdeas] = useState([]);

  const [elimentHeight, setHeight] = useState();

  //filter
  const [categoryPrmtr, setCategoryPrmtr] = useState(null);
  const [filterPrmtr, setFilterPrmtr] = useState(null);

  // idea
  const selectedIdeas = customHooks.selectedIdeas;
  const setSelectedIdeas = customHooks.setSelectedIdeas;
  const viewIdea = customHooks.viewIdea;
  const setViewIdea = customHooks.setViewIdea;
  const setTagList = customHooks.setTagList;
  const setSourceList = customHooks.setSourceList;

  // setting
  const [isSelectMode, setIsSelectMode] = useState(false);

  const [isViewDetailsClicked, setIsViewDetailsClicked] = useState(false);

  // useBottomScrollListener(getNextPosts, {
  //   triggerOnNoScroll: true,
  // });

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, scrollY);
    }, 100);
  }, []);

  useEffect(() => {
    setShowingIdeas(dbIdeas);

    const tempoTagList = [];
    for (let a in dbIdeas) {
      for (let b in dbIdeas[a].tags) {
        if (tempoTagList.includes(dbIdeas[a].tags[b])) {
        } else {
          tempoTagList.push(dbIdeas[a].tags[b]);
        }
      }
    }
    setTagList(tempoTagList);

    const tempoSourceList = [];
    for (let a in dbIdeas) {
      if (
        tempoSourceList.includes(dbIdeas[a].source) ||
        dbIdeas[a].source === ""
      ) {
      } else {
        tempoSourceList.push(dbIdeas[a].source);
      }
    }
    setSourceList(tempoSourceList);
  }, [dbIdeas]);

  useEffect(() => {
    if (selectedIdeas.length > 0) {
      setIsSelectMode(true);
    } else {
      setIsSelectMode(false);
    }
  }, [selectedIdeas.length]);

  const onSelectIdea = (dbIdea) => {
    if (selectedIdeas.includes(dbIdea)) {
      setSelectedIdeas(selectedIdeas.filter((idea) => idea != dbIdea));
    } else {
      setSelectedIdeas([dbIdea, ...selectedIdeas]);
    }
  };

  const filters = [
    {
      icon: <FontAwesomeIcon icon={faCircleNodes} />,
      label: "연결됨",
      bgColor: "bg-green-200",
      color: "text-green-500",
      borderColor: "border-green-200",
      value: "connect",
    },
    {
      icon: <FontAwesomeIcon icon={fasHeart} />,
      label: "좋아요",
      bgColor: "bg-red-200",
      color: "text-red-500",
      borderColor: "border-red-200",
      value: "like",
    },
    {
      icon: <FontAwesomeIcon icon={fasBookmark} />,
      label: "저장",
      bgColor: "bg-orange-200",
      color: "text-orange-500",
      borderColor: "border-orange-200",
      value: "bookmark",
    },
    {
      icon: <FontAwesomeIcon icon={fasCompass} />,
      label: "공개",
      bgColor: "bg-sky-200",
      color: "text-sky-500",
      borderColor: "border-sky-200",
      value: "public",
    },
  ];

  const getItemSize = () => {
    if (elimentHeight === undefined) {
      return 200;
    } else {
      return elimentHeight;
    }
  };

  return (
    <>
      <BottomNavigationBar customHooks={customHooks} />
      <div className="relative bg-stone-100">
        <IdeasTopBar
          navigate={navigate}
          setViewIdea={setViewIdea}
          selectedIdeas={selectedIdeas}
          setSelectedIdeas={setSelectedIdeas}
          isSelectMode={isSelectMode}
          setIsSelectMode={setIsSelectMode}
          isViewDetailsClicked={isViewDetailsClicked}
          setIsViewDetailsClicked={setIsViewDetailsClicked}
        />
        <IdeasToggleButton
          user={user}
          dbIdeas={dbIdeas}
          selectedIdeas={selectedIdeas}
          setShowingIdeas={setShowingIdeas}
          scrollY={scrollY}
          filters={filters}
          filterPrmtr={filterPrmtr}
          setFilterPrmtr={setFilterPrmtr}
          isSelectMode={isSelectMode}
          isViewDetailsClicked={isViewDetailsClicked}
        />

        {/* 아이디어 */}
        <div className="pb-14 bg-white">
          <div className="flex font-black px-5 py-4 gap-2">
            <span>아이디어</span>
            {categoryPrmtr != null && (
              <span>{` > ${categoryPrmtr.label}`}</span>
            )}
            {filterPrmtr != null && <span>{` > ${filterPrmtr.label}`}</span>}
            <span
              className="flex justify-center items-center text-xs text-stone-400 bg-stone-100 rounded-xl px-2"
              style={{ minWidth: "24px" }}
            >
              {showingIdeas.length}
            </span>
          </div>
          {showingIdeas.length > 0 ? (
            <>
              {/* <List
              height={1000}
              width={"100%"}
              itemCount={showingIdeas.length}
              itemSize={getItemSize}
            > */}
              {showingIdeas.map((dbIdea) => (
                <Idea
                  key={dbIdea.id}
                  setHeight={setHeight}
                  customHooks={customHooks}
                  navigate={navigate}
                  user={user}
                  dbIdea={dbIdea}
                  viewIdea={viewIdea}
                  setViewIdea={setViewIdea}
                  isSelectMode={isSelectMode}
                  selectedIdeas={selectedIdeas}
                  onSelectIdea={onSelectIdea}
                />
              ))}
              {/* </List> */}
            </>
          ) : (
            <div className="py-10 flex justify-center text-xl font-black text-gray-400 ">
              새 아이디어를 입력해주세요 ✏️
            </div>
          )}
        </div>

        <FloatingActionButton
          navigate={navigate}
          selectedIdeas={selectedIdeas}
        />

        <FloatingUpButton scrollY={scrollY} setScrollY={setScrollY} />
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
