import BottomNavigationBar from "routes/BottomNavigationBar";
import React, { useEffect, useState } from "react";
import Idea from "routes/ideas/Idea";
import SelectedIdeasSlide from "routes/ideas/SelectedIdeasSlide";
import ToggleButton from "routes/ideas/ToggleButton";
import { useNavigate } from "react-router-dom";
import { authService } from "fbase";
// import List from "react-virtualized/List";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle,
  faCircleNodes,
  faDiceD6,
  faFeatherPointed,
  faMinus,
  faSearch,
  faSquare,
  faCompass as fasCompass,
  faHeart as fasHeart,
  faBookmark as fasBookmark,
  faCircleCheck as fasCircleCheck,
  faLightbulb,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import {
  faBell,
  faCircleCheck as farCircleCheck,
} from "@fortawesome/free-regular-svg-icons";

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

const Ideas = ({ customHooks }) => {
  let navigate = useNavigate();
  const user = authService.currentUser;
  const selectedIdeas = customHooks.selectedIdeas;
  const setSelectedIdeas = customHooks.setSelectedIdeas;
  const setViewIdea = customHooks.setViewIdea;
  const dbIdeas = customHooks.dbIdeas;
  const setTagList = customHooks.setTagList;
  const setSourceList = customHooks.setSourceList;

  //toggleItem
  const [categoryPrmtr, setCategoryPrmtr] = useState("");
  const [filterPrmtr, setFilterPrmtr] = useState("");
  const [showingIdeas, setShowingIdeas] = useState([]);

  //idea
  const [isSelectMode, setIsSelectMode] = useState(false);

  useEffect(() => {
    setShowingIdeas(dbIdeas);
  }, [dbIdeas]);
  useEffect(() => {
    if (selectedIdeas.length > 0) {
      setIsSelectMode(true);
    }
  }, [selectedIdeas.length]);

  useEffect(() => {
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

  // topBar Button Action
  const onSelectModeClick = () => {
    setIsSelectMode((prev) => !prev);
    if (isSelectMode) {
      setSelectedIdeas([]);
    }
  };
  const onSearchClick = () => {
    navigate("/ideas/searchpage", { replace: true });
  };

  // floating Button Action
  const onWritingClick = () => {
    if (selectedIdeas.length === 1) {
      toast.error("2개 이상을 선택하세요", {
        theme: "colored",
      });
    } else {
      navigate("/ideas/writing", { replace: true });
    }
  };
  const onIdeaSelect = (dbIdea) => {
    if (selectedIdeas.includes(dbIdea)) {
      setSelectedIdeas(selectedIdeas.filter((idea) => idea != dbIdea));
    } else {
      setSelectedIdeas([dbIdea, ...selectedIdeas]);
    }
  };

  return (
    <>
      <BottomNavigationBar customHooks={customHooks} />
      <div className="bg-stone-100">
        {/* App Bar */}
        <div className="fixed top-0 w-full z-20">
          <div className="flex justify-between items-center px-2 py-4 bg-white shadow">
            <div className="px-2 text-lg font-black">아이디어</div>
            <div className="flex gap-2">
              <button className="relative px-2">
                <FontAwesomeIcon icon={faBell} size="lg" />
                <span className="absolute right-1 top-0 w-2 h-2 bg-red-400 text-white rounded-full" />
              </button>
              <button className="px-2" onClick={onSelectModeClick}>
                {selectedIdeas.length > 0 || isSelectMode ? (
                  <FontAwesomeIcon icon={fasCircleCheck} size="lg" />
                ) : (
                  <FontAwesomeIcon icon={farCircleCheck} size="lg" />
                )}
              </button>
              <button className="px-2" onClick={onSearchClick}>
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
          </div>
          {selectedIdeas.length > 0 && (
            <SelectedIdeasSlide
              selectedIdeas={selectedIdeas}
              setSelectedIdeas={setSelectedIdeas}
              setViewIdea={setViewIdea}
            />
          )}
        </div>

        {/*Contens*/}
        {/* ToggleButton */}
        <ToggleButton
          selectedIdeas={selectedIdeas}
          categories={categories}
          categoryPrmtr={categoryPrmtr}
          setCategoryPrmtr={setCategoryPrmtr}
          filters={filters}
          filterPrmtr={filterPrmtr}
          setFilterPrmtr={setFilterPrmtr}
          showingIdeas={showingIdeas}
          setShowingIdeas={setShowingIdeas}
          dbIdeas={dbIdeas}
        />
        {/* 아이디어 */}
        <div className="min-h-screen py-2 pb-14 bg-white">
          <div className="flex font-black px-5 py-4 gap-2">
            <span>아이디어</span>
            {categoryPrmtr != "" && <span>{` > ${categoryPrmtr.label}`}</span>}
            {filterPrmtr != "" && <span>{` > ${filterPrmtr.label}`}</span>}
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
                user={user}
                key={dbIdea.id}
                dbIdea={dbIdea}
                customHooks={customHooks}
                onIdeaSelect={onIdeaSelect}
                selectedIdeas={selectedIdeas}
                isSelectMode={isSelectMode}
              />
            ))
          ) : (
            <div className="py-10 flex justify-center text-xl font-black text-gray-400 ">
              새 아이디어를 입력해주세요 ✏️
            </div>
          )}
        </div>

        {/* Floating Action Button, FAB */}
        <div className="fixed bottom-16 right-3 z-10">
          {selectedIdeas.length > 0 ? (
            <button
              className={`shadow-2xl  rounded-full px-4 p-2 text-sm duration-200 border-4  text-white ${
                selectedIdeas.length === 1
                  ? "border-stone-200 bg-stone-600"
                  : "border-green-200 bg-green-600"
              }`}
              onClick={onWritingClick}
            >
              <FontAwesomeIcon icon={faCircleNodes} size="lg" /> 연결
            </button>
          ) : (
            <button
              className="shadow-2xl rounded-full p-2 text-sm font-black px-4 border-4 border-green-200 bg-green-600 text-white"
              onClick={onWritingClick}
            >
              <FontAwesomeIcon icon={faPlus} size="lg" /> 새 아이디어
            </button>
          )}
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
      </div>
    </>
  );
};

export default Ideas;
