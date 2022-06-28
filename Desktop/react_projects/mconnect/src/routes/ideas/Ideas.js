import Idea from "routes/ideas/idea/Idea";
import IdeasTopBar from "./IdeasTopBar";
import BottomNavigationBar from "routes/BottomNavigationBar";
import IdeasToggleButton from "routes/ideas/IdeasToggleButton";
import FloatingActionButton from "./FloatingActionButton";
import FloatingUpButton from "./FloatingUpButton";
import React, { useEffect, useState } from "react";
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
  const user = customHooks.loggedInUser;
  const setNavValue = customHooks.setNavValue;
  const dbIdeas = customHooks.dbIdeas;
  const scrollY = customHooks.scrollY;
  const setScrollY = customHooks.setScrollY;
  const [showingIdeas, setShowingIdeas] = useState([]);

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
  const getCategory = customHooks.getCategory;

  // setting
  const [isSelectMode, setIsSelectMode] = useState(false);

  // dbIdeas 변경 시마다 showingIdeas, tagList, sourceList를 변경함.
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

  const categories = [
    {
      icon: <FontAwesomeIcon icon={faCircle} size="xs" />,
      label: "점",
      bgColor: "bg-stone-400",
      color: "",
      borderColor: "border-stone-200",
      value: 0,
    },
    {
      icon: <FontAwesomeIcon icon={faMinus} />,
      label: "선",
      bgColor: "bg-stone-400",
      color: "",
      borderColor: "border-stone-200",
      value: 1,
    },
    {
      icon: <FontAwesomeIcon icon={faSquare} size="xs" />,
      label: "면",
      bgColor: "bg-stone-400",
      color: "",
      borderColor: "border-stone-200",
      value: 2,
    },
    {
      icon: <FontAwesomeIcon icon={faDiceD6} />,
      label: "상자",
      bgColor: "bg-stone-400",
      color: "",
      borderColor: "border-stone-200",
      value: 3,
    },
  ];

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

  return (
    <>
      <BottomNavigationBar customHooks={customHooks} />
      <div className="relative bg-stone-100">
        <IdeasTopBar
          setViewIdea={setViewIdea}
          setNavValue={setNavValue}
          selectedIdeas={selectedIdeas}
          setSelectedIdeas={setSelectedIdeas}
          isSelectMode={isSelectMode}
          setIsSelectMode={setIsSelectMode}
        />
        <IdeasToggleButton
          user={user}
          dbIdeas={dbIdeas}
          selectedIdeas={selectedIdeas}
          setShowingIdeas={setShowingIdeas}
          categories={categories}
          categoryPrmtr={categoryPrmtr}
          setCategoryPrmtr={setCategoryPrmtr}
          scrollY={scrollY}
          filters={filters}
          filterPrmtr={filterPrmtr}
          setFilterPrmtr={setFilterPrmtr}
          isSelectMode={isSelectMode}
        />

        {/* 아이디어 */}
        <div className="min-h-screen py-2 pb-14 bg-white">
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
            showingIdeas.map((dbIdea) => (
              <Idea
                customHooks={customHooks}
                user={user}
                dbIdea={dbIdea}
                key={dbIdea.id}
                getCategory={getCategory}
                viewIdea={viewIdea}
                setViewIdea={setViewIdea}
                isSelectMode={isSelectMode}
                selectedIdeas={selectedIdeas}
                onSelectIdea={onSelectIdea}
              />
            ))
          ) : (
            <div className="py-10 flex justify-center text-xl font-black text-gray-400 ">
              새 아이디어를 입력해주세요 ✏️
            </div>
          )}
        </div>

        {/* Floating Action Button, FAB */}
        <FloatingActionButton
          setNavValue={setNavValue}
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
