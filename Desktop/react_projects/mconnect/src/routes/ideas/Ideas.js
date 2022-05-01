import React, { useEffect, useState } from "react";
import Idea from "routes/ideas/Idea";
import SearchPage from "routes/ideas/SearchPage";
import SelectedIdeasSlide from "routes/ideas/SelectedIdeasSlide";
import ToggleButton from "routes/ideas/ToggleButton";
import { useNavigate } from "react-router-dom";
import { authService } from "fbase";
// import List from "react-virtualized/List";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faCircle,
  faCircleNodes,
  faDiceD6,
  faFeatherPointed,
  faMinus,
  faSearch,
  faSquare,
  faHashtag,
  faCircleUser,
  faChevronUp,
  faChevronDown,
  faCompass as fasCompass,
  faHeart as fasHeart,
  faBookmark as fasBookmark,
  faArrowCircleRight,
  faArrowRotateRight,
} from "@fortawesome/free-solid-svg-icons";

const testArr = ["text1", "text2", "text3", "text4", "text5", "text6"];
const testTags = [
  "경제",
  "경영",
  "비트코인",
  "사회",
  "프로그래밍",
  "레시피",
  "정치",
  "러우크라이나전쟁",
  "세계",
  "주먹밥",
  "나뭇잎",
  "돋보기",
  "책",
  "무지개",
  "삼성전자",
  "테슬라",
  "차트",
  "기술적분석",
  "기본적분석",
  "통계",
  "금리",
  "물가",
  "한국은행",
];
const testUsers = [
  "Hugo Lloris",
  "Matt Doherty",
  "Sergio Reguilón",
  "Cristian Romero",
  "Pierre-Emile Højbjerg",
  "Davinson Sánchez",
  "Son Heung-min",
  "Harry Winks",
  "Harry Kane",
  "Emerson Royal",
  "Joe Rodon",
  "Eric Dier",
  "Ryan Sessègnon",
  "Dejan Kulusevski",
  "Pierluigi Gollini",
  "Steven Bergwijn",
  "Japhet Tanganga",
  "Lucas Moura",
  "Oliver Skipp",
  "Rodrigo Bentancur",
  "Ben Davies",
  "Brandon Austin",
];

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
    icon: <FontAwesomeIcon icon={faSquare} />,
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
  const dbIdeas = customHooks.dbIdeas;
  const tagList = customHooks.tagList;
  const setTagList = customHooks.setTagList;

  // event handler
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [isConnectToggleClicked, setIsConnectToggleClicked] = useState(false);

  //toggleItem
  const [categoryPrmtr, setCategoryPrmtr] = useState("");
  const [filterPrmtr, setFilterPrmtr] = useState("");
  const [showingIdeas, setShowingIdeas] = useState([]);

  useEffect(() => {
    setShowingIdeas(dbIdeas);
  }, [dbIdeas]);
  useEffect(() => {
    const tempoTagList = [];
    const tempoUserIdList = [];

    for (var a in dbIdeas) {
      for (var b in dbIdeas[a].tags) {
        if (tempoTagList.includes(dbIdeas[a].tags[b])) {
        } else {
          tempoTagList.push(dbIdeas[a].tags[b]);
        }
      }
    }
    setTagList(tempoTagList);
  }, [dbIdeas]);

  const onSearchClick = () => {
    if (isSearchClicked === false) {
      setIsSearchClicked(true);
    }
  };
  const onSearchBackClick = () => {
    setIsSearchClicked(false);
  };
  const onWritingClick = () => {
    if (selectedIdeas.length === 1) {
      toast.error("아이디어를 연결하려면 2개 이상을 선택하세요", {
        theme: "colored",
      });
    } else {
      navigate("/ideas/writing", { replace: true });
    }
  };
  const onConnectToggle = () => {
    setIsConnectToggleClicked(!isConnectToggleClicked);
  };
  const onRefreshClick = () => {
    setSelectedIdeas([]);
  };
  const onDetailsClick = () => {};
  const onIdeasClick = (dbIdea) => {
    if (selectedIdeas.includes(dbIdea)) {
      setSelectedIdeas(selectedIdeas.filter((idea) => idea != dbIdea));
    } else {
      setSelectedIdeas([dbIdea, ...selectedIdeas]);
    }
  };

  return (
    <>
      <div className="bg-stone-200">
        {/* App Bar */}

        <div className="fixed top-0 w-full z-20">
          <div
            className="flex justify-between items-center p-2"
            style={{
              background: "#5bb647",
            }}
          >
            {isSearchClicked ? (
              <button className="text-white px-2" onClick={onSearchBackClick}>
                <FontAwesomeIcon icon={faChevronLeft} size="xl" />
              </button>
            ) : (
              <div className="px-2 english__font text-white text-2xl font-black">
                Ideas 💡
              </div>
            )}
            <button
              className="flex justify-between items-center h-8 p-2 bg-white rounded-3xl"
              style={{
                width: `${isSearchClicked ? "90%" : "80px"}`,
                justifyContent: `${
                  isSearchClicked ? "space-between" : "flex-end"
                }`,
              }}
              onClick={onSearchClick}
            >
              {isSearchClicked ? (
                <input
                  id="searchInput"
                  className="w-full mx-2 px-2 duration-500"
                  placeholder={isSearchClicked ? "Search" : ""}
                  autoComplete="off"
                />
              ) : (
                <></>
              )}
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
          {/* Search Page /  */}
          {isSearchClicked ? (
            <SearchPage dbIdeas={dbIdeas} tagList={tagList} />
          ) : (
            <></>
          )}
          <SelectedIdeasSlide
            selectedIdeas={selectedIdeas}
            isConnectToggleClicked={isConnectToggleClicked}
            onConnectToggle={onConnectToggle}
          />
        </div>

        {/*Contens*/}
        {/* ToggleButton */}
        <ToggleButton
          selectedIdeas={selectedIdeas}
          isConnectToggleClicked={isConnectToggleClicked}
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
        <div
          className="bg-white min-h-screen py-5"
          onClick={() => {
            setIsSearchClicked(false);
          }}
        >
          <div className="font-black text-xl px-5 py-5">
            아이디어
            {categoryPrmtr === "" ? "" : ` > ${categoryPrmtr.label}`}
            {filterPrmtr === "" ? "" : ` > ${filterPrmtr.label}`}
          </div>
          {showingIdeas.length > 0 ? (
            showingIdeas.map((dbIdea) => (
              <Idea
                user={user}
                key={dbIdea.id}
                dbIdea={dbIdea}
                customHooks={customHooks}
                onIdeasClick={onIdeasClick}
                selectedIdeas={selectedIdeas}
              />
            ))
          ) : (
            <div className="py-10 flex justify-center items-center text-xl font-black text-gray-400 ">
              새 아이디어를 입력해주세요 ✏️
            </div>
          )}
        </div>
        {/* Floating Action Button, FAB */}
        {selectedIdeas.length > 0 ? (
          <>
            <div className="fixed bottom-20 right-6 z-10">
              <button
                className={`shadow-2xl rounded-full w-14 h-14 duration-200 border-2 border-white text-white ${
                  selectedIdeas.length === 1 ? "bg-stone-600" : "bg-green-600"
                }`}
                // style={{
                //   backgroundColor: `${
                //     selectedIdeas.length === 1 ? "#57534e" : "#5bb647"
                //   }`,
                // }}
                onClick={onWritingClick}
              >
                <FontAwesomeIcon icon={faCircleNodes} size="xl" />
              </button>
            </div>
            <div className="fixed bottom-36 right-6 z-10">
              <button
                className="shadow-2xl rounded-full w-14 h-14 duration-200 border-2 border-white bg-stone-600 text-white"
                onClick={onRefreshClick}
              >
                <FontAwesomeIcon icon={faArrowRotateRight} size="xl" />
              </button>
            </div>
          </>
        ) : (
          <div className="fixed bottom-20 right-6 z-10">
            <button
              className="shadow-2xl rounded-full w-14 h-14 border-2 border-white bg-stone-600 text-white"
              onClick={onWritingClick}
            >
              <FontAwesomeIcon icon={faFeatherPointed} size="xl" />
            </button>
          </div>
        )}
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
