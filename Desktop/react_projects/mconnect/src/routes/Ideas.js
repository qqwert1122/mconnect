import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "fbase";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faCircle,
  faCircleNodes,
  faCircleXmark,
  faDiceD6,
  faFeatherPointed,
  faLayerGroup,
  faMinus,
  faSearch,
  faSliders,
  faSquare,
  faQuoteLeft,
  faHashtag,
  faCircleCheck,
  faTrash,
  faCircleUser,
  faShapes,
  faChevronUp,
  faChevronDown,
  faHeart as fasHeart,
  faBookmark as fasBookmark,
} from "@fortawesome/free-solid-svg-icons";
import {
  faBookmark,
  faCompass,
  faHeart as farHeart,
  faBookmark as farBookmark,
} from "@fortawesome/free-regular-svg-icons";

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

const toggleItems = [
  {
    icon: <FontAwesomeIcon icon={faCircle} size="xs" />,
    label: "점",
    bgColor: "bg-stone-400",
    color: "",
    borderColor: "border-stone-200",
  },
  {
    icon: <FontAwesomeIcon icon={faMinus} />,
    label: "선",
    bgColor: "bg-stone-400",
    color: "",
    borderColor: "border-stone-200",
  },
  {
    icon: <FontAwesomeIcon icon={faSquare} />,
    label: "면",
    bgColor: "bg-stone-400",
    color: "",
    borderColor: "border-stone-200",
  },
  {
    icon: <FontAwesomeIcon icon={faDiceD6} />,
    label: "상자",
    bgColor: "bg-stone-400",
    color: "",
    borderColor: "border-stone-200",
  },
  {
    icon: <FontAwesomeIcon icon={fasHeart} />,
    label: "좋아요",
    bgColor: "bg-red-200",
    color: "text-red-500",
    borderColor: "border-red-200",
  },
  {
    icon: <FontAwesomeIcon icon={fasBookmark} />,
    label: "저장",
    bgColor: "bg-orange-200",
    color: "text-orange-500",
    borderColor: "border-orange-200",
  },
  {
    icon: <FontAwesomeIcon icon={faCompass} />,
    label: "공개",
    bgColor: "bg-sky-200",
    color: "text-sky-500",
    borderColor: "border-sky-200",
  },
];

const Ideas = ({ customHooks }) => {
  const [value, setValue] = useState(0);
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [isConnectClicked, setIsConnectClicked] = useState(false);
  const [isConnectToggleClicked, setIsConnectToggleClicked] = useState(false);
  const [selectedToggleItem, setSelectedToggleItem] = useState("");

  let navigate = useNavigate();
  const user = authService.currentUser;

  const settings = {
    dots: true,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToScroll: 1,
    centerMode: true,
    focusOnSelect: true,
    initialSlide: 0,
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onSearchClick = () => {
    if (isSearchClicked === false) {
      setIsSearchClicked(true);
    }
  };
  const onSearchBackClick = () => {
    setIsSearchClicked(false);
  };
  const onWritingClick = () => {
    navigate("/writing", { replace: true });
  };
  const onConnectClick = () => {
    setIsSearchClicked(false);
    setIsConnectClicked(!isConnectClicked);
  };
  const onConnectToggle = () => {
    setIsConnectToggleClicked(!isConnectToggleClicked);
  };
  const onToggleItemClick = (label) => {
    setSelectedToggleItem(label);
  };

  const ideaDummy = (
    <>
      <div className="flex justify-between items-end mx-4 mt-2">
        <div className="flex items-end">
          <div className="flex mx-3">
            <Avatar
              alt="avatar"
              src={user.photoURL}
              sx={{
                display: "flex",
                width: "50px",
                height: "50px",
              }}
            />
          </div>
          <h2>
            <b>{user.displayName}</b>
          </h2>
        </div>
        {/* button */}
        <div className="flex text-2xl gap-5">
          <button className="">
            <FontAwesomeIcon icon={faTrash} />
          </button>
          <button className="">
            <FontAwesomeIcon icon={faCircleCheck} />
          </button>
        </div>
      </div>

      <div className="shadow-xl h-52 mt-4 mx-4 rounded-3xl bg-stone-200">
        <div className="flex items-center p-3">
          <FontAwesomeIcon icon={faCircle} size="xs" />
          <div className="border-2 mx-3 p-2 w-full h-24">{/* text */}</div>
        </div>
        <div className="flex items-center px-3 py-1">
          <FontAwesomeIcon icon={faQuoteLeft} />
          <input
            className=" rounded-xl border-2 mx-3 px-2 w-full"
            type="text"
            placeholder="출처를 입력하세요"
          />
        </div>
        <div className="flex items-center px-3 py-1">
          <FontAwesomeIcon icon={faHashtag} />
          <input
            className=" rounded-xl border-2 mx-3 px-2 w-full"
            type="text"
            placeholder="태그를 입력하세요"
          />
        </div>
      </div>
      {/* like, bookmark, time */}
      <div className="flex justify-between items-center mx-6 my-4">
        <div>
          <button className="mx-5 text-2xl text-red-500">
            <FontAwesomeIcon icon={fasHeart} />
          </button>
          <button className="text-2xl text-orange-400">
            <FontAwesomeIcon icon={fasBookmark} />
          </button>
        </div>
        <div className="mx-3 text-xl">{Date.now()}</div>
      </div>
    </>
  );

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
              className="flex justify-between items-center h-8 p-2 duration-100  bg-white rounded-3xl"
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
                  className="w-full mx-2 px-2"
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
            <div className="absolute w-full flex-col shadow-xl bg-stone-200">
              {/* 태그 검색 */}
              <div
                className="mx-5 mt-5 mb-2 text-lg font-black gap-2"
                style={{ color: "#5bb647" }}
              >
                태그&nbsp;
                <span>
                  <FontAwesomeIcon icon={faHashtag} />
                </span>
              </div>
              <div className="m-4 p-5 mb-2 rounded-3xl bg-white">
                <div className="flex text-2xl flex-wrap gap-2 max-h-40 overflow-scroll">
                  {testTags.map((m, i) => (
                    <span
                      key={i}
                      className="border-2 rounded-3xl border-stone-200 px-1 text-sm"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
              {/* 사용자 검색 */}
              <div
                className="mx-5 mt-5 mb-2 text-lg font-black gap-2 "
                style={{ color: "#5bb647" }}
              >
                사용자&nbsp;
                <span>
                  <FontAwesomeIcon icon={faCircleUser} />
                </span>
              </div>
              <div className="m-4 p-5 mb-2 rounded-3xl bg-white">
                <div className="flex text-2xl flex-wrap gap-2 max-h-40 overflow-scroll">
                  {testUsers.map((user, i) => (
                    <span
                      key={i}
                      className="flex items-center justify-between border-2 rounded-3xl  border-stone-200 px-1 text-sm gap-1"
                    >
                      <img
                        className="rounded-full"
                        src={`https://i.pravatar.cc/30?img=${i}`}
                      />
                      {user}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
          {isConnectClicked ? (
            !isConnectToggleClicked ? (
              // Connected Ideas
              <div
                className="py-2 flex-col text-xl font-black shadow-xl"
                style={{
                  background: "linear-gradient(45deg, #d9f99d, #a3e635)",
                }}
              >
                <div className="flex justify-center">
                  연관된 아이디어 ♾️ : &nbsp;&nbsp;&nbsp;1개
                </div>
                <button
                  className="flex justify-center w-full mt-2 text-lime-600"
                  onClick={onConnectToggle}
                >
                  <FontAwesomeIcon icon={faChevronDown} />
                </button>
              </div>
            ) : (
              <div className="shadow-xl" style={{ backgroundColor: "#eeeeee" }}>
                <div className="highlight mx-16 mt-5 mb-2 flex justify-center text-xl font-black z-10">
                  연관된 아이디어 ♾️
                </div>
                <div className="relative pb-10 ">
                  <Slider {...settings}>
                    {testArr.map((arr, i) => (
                      <div key={i}>
                        <div className="relative h-52 p-5 m-1 bg-white rounded-3xl shadow-lg ">
                          {arr}
                        </div>
                      </div>
                    ))}
                  </Slider>
                </div>
                <div>
                  <button
                    className="flex justify-center w-full py-2 text-2xl"
                    onClick={onConnectToggle}
                  >
                    <FontAwesomeIcon icon={faChevronUp} />
                  </button>
                </div>
              </div>
            )
          ) : (
            <></>
          )}
        </div>

        {/*Contens*/}
        <div
          className="bg-white duration-100"
          style={{
            paddingTop: `${
              isConnectClicked
                ? isConnectToggleClicked
                  ? "400px"
                  : "130px"
                : "50px"
            }`,
          }}
          onClick={() => {
            setIsSearchClicked(false);
          }}
        >
          {/* ToggleButton */}
          <div className="mx-5 mt-10 font-black text-xl ">카테고리</div>
          <div className="flex flex-wrap justify-start mx-5 mt-2 mb-10 gap-3">
            {toggleItems.map((item, index) => (
              <button
                key={index}
                className={`border-box rounded-3xl ${
                  item.label === selectedToggleItem ? item.bgColor : ""
                } ${item.color} ${
                  item.borderColor
                } border-2 px-4 py-1 text-base font-black shadow-md duration-500`}
                onClick={() => {
                  onToggleItemClick(item.label);
                }}
              >
                <span className="text-base">{item.icon}</span>
                &nbsp;{item.label}
              </button>
            ))}
          </div>
          <div className={isSearchClicked ? "blur-sm" : ""}>
            {ideaDummy}
            {ideaDummy}
            {ideaDummy}
            {ideaDummy}
          </div>
        </div>
        {/* Floating Action Button, FAB */}
        <div className="fixed bottom-20 right-6 z-10">
          <button
            className="shadow-2xl rounded-full w-14 h-14 border-2 border-white"
            style={{
              color: "#ffffff",
              backgroundColor: "#57534e",
            }}
            onClick={onWritingClick}
          >
            <FontAwesomeIcon icon={faFeatherPointed} size="xl" />
          </button>
        </div>
        <div className="fixed bottom-36 right-6 z-10">
          <button
            className="shadow-2xl rounded-full w-14 h-14 duration-200 border-2 border-white"
            style={{
              color: "#ffffff",
              backgroundColor: `${isConnectClicked ? "#5bb647" : "#57534e"}`,
            }}
            onClick={onConnectClick}
          >
            <FontAwesomeIcon icon={faCircleNodes} size="xl" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Ideas;
