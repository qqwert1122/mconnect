import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { authService } from "fbase";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Slider from "react-slick";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
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
} from "@fortawesome/free-solid-svg-icons";
import {
  faBookmark,
  faCompass,
  faHeart,
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

const Ideas = ({ customHooks }) => {
  const [value, setValue] = useState(0);
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [isConnectClicked, setIsConnectClicked] = useState(false);
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

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }

  const ideaDummy = (
    <>
      <div class="flex justify-between items-end mx-4 mt-2">
        <div class="flex items-end">
          <div class="flex mx-3">
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
        <div class="flex text-2xl">
          <button class="mt-3 ">
            <FontAwesomeIcon icon={faTrash} />
          </button>
          <button class="mt-3 mx-5">
            <FontAwesomeIcon icon={faCircleCheck} />
          </button>
        </div>
      </div>

      <div
        class="shadow-xl h-52 mt-4 mx-4 rounded-3xl"
        style={{ background: "#eeeeee" }}
      >
        {/* form */}
        <form class="flex-col w-full h-full">
          <div class="flex items-center p-3">
            <FontAwesomeIcon icon={faCircle} size="xs" />
            <textarea
              class=" rounded-xl border-2 mx-3 p-2 w-full h-24"
              type="text"
              placeholder="내용을 입력하세요"
              required
            />
          </div>
          <div class="flex items-center px-3 py-1">
            <FontAwesomeIcon icon={faQuoteLeft} />
            <input
              class=" rounded-xl border-2 mx-3 px-2 w-full"
              type="text"
              placeholder="출처를 입력하세요"
            />
          </div>
          <div class="flex items-center px-3 py-1">
            <FontAwesomeIcon icon={faHashtag} />
            <input
              class=" rounded-xl border-2 mx-3 px-2 w-full"
              type="text"
              placeholder="태그를 입력하세요"
            />
          </div>
        </form>
      </div>
      {/* like, bookmark, time */}
      <div class="flex justify-between items-center mx-6 my-4">
        <div>
          <button class="mx-5 text-2xl text-red-600">
            <FontAwesomeIcon icon={faHeart} />
          </button>
          <button class="text-2xl text-orange-400">
            <FontAwesomeIcon icon={faBookmark} />
          </button>
        </div>
        <div class="mx-3 text-xl">{Date.now()}</div>
      </div>
    </>
  );

  return (
    <>
      <div
        style={{
          background: "#eeeeee",
        }}
      >
        {/* App Bar */}

        <div class="fixed top-0 w-full z-20">
          <div
            class="flex justify-between items-center p-2"
            style={{
              backgroundColor: "#5bb647",
            }}
          >
            {isSearchClicked ? (
              <button class="text-white px-2" onClick={onSearchBackClick}>
                <FontAwesomeIcon icon={faChevronLeft} size="xl" />
              </button>
            ) : (
              <div class="px-2 english__font text-white text-2xl font-black">
                Ideas
              </div>
            )}
            <button
              class="flex justify-between items-center h-8 p-2 duration-100  bg-white rounded-3xl"
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
                  class="w-full mx-2 px-2"
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
            <div class="absolute w-full flex-col p-5 shadow-xl bg-white">
              {/* 필터 검색 */}
              <div
                class="text-2xl font-black gap-2 mb-5"
                style={{ color: "#5bb647" }}
              >
                필터&nbsp;
                <span>
                  <FontAwesomeIcon icon={faSliders} />
                </span>
              </div>
              <div class="flex text-2xl gap-4 mb-10">
                <FontAwesomeIcon icon={faHeart} />
                <FontAwesomeIcon icon={faBookmark} />
                <FontAwesomeIcon icon={faCompass} />
              </div>
              {/* 카테고리 검색 */}
              <div
                class="text-2xl font-black gap-2 mb-5"
                style={{ color: "#5bb647" }}
              >
                카테고리&nbsp;
                <span>
                  <FontAwesomeIcon icon={faShapes} />
                </span>
              </div>
              <div class="flex items-center text-2xl gap-4 mb-10">
                <FontAwesomeIcon icon={faCircle} size="sm" />
                <FontAwesomeIcon icon={faMinus} />
                <FontAwesomeIcon icon={faSquare} />
                <FontAwesomeIcon icon={faDiceD6} />
              </div>
              {/* 태그 검색 */}
              <div
                class="text-2xl font-black gap-2 mb-5"
                style={{ color: "#5bb647" }}
              >
                태그&nbsp;
                <span>
                  <FontAwesomeIcon icon={faHashtag} />
                </span>
              </div>
              <div class="flex text-2xl flex-wrap gap-2 mb-10 max-h-28 overflow-scroll">
                {testTags.map((m, i) => (
                  <span
                    key={i}
                    class="border-2 rounded-3xl border-black px-1  text-base"
                  >
                    {m}
                  </span>
                ))}
              </div>
              {/* 사용자 검색 */}
              <div
                class="text-2xl font-black gap-2 mb-5"
                style={{ color: "#5bb647" }}
              >
                사용자&nbsp;
                <span>
                  <FontAwesomeIcon icon={faCircleUser} />
                </span>
              </div>
              <div class="flex text-2xl flex-wrap gap-2 max-h-28 overflow-scroll">
                {testUsers.map((m, i) => (
                  <span
                    key={i}
                    class="flex items-center justify-between border-2 rounded-3xl border-black px-1 text-base gap-1"
                  >
                    <img
                      class="rounded-full"
                      src={`https://i.pravatar.cc/30?img=${i}`}
                    />
                    {m}
                  </span>
                ))}
              </div>
            </div>
          ) : isConnectClicked ? (
            // Connected Ideas
            <div class="shadow-xl" style={{ backgroundColor: "#eeeeee" }}>
              <div class="highlight mx-16 mt-5 mb-2 flex justify-center text-2xl font-black z-10">
                연관된 아이디어 ♾️
              </div>
              <div class="relative pb-10 ">
                <Slider {...settings}>
                  {testArr.map((m, i) => (
                    <div key={i}>
                      <div class="relative h-52 p-5 m-1 bg-white rounded-3xl shadow-lg ">
                        {m}
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>

        {/* Tabs */}

        {/* Contents */}
        {/* <ThemeProvider theme={customHooks.theme}>
            <Tabs value={value} onChange={handleChange} centered label="top">
              <Tab
                icon={<FontAwesomeIcon icon={faLayerGroup} size="xl" />}
                label="List"
                aria-label="List"
              />
              <Tab
                icon={<FontAwesomeIcon icon={faCircleNodes} size="xl" />}
                label="Connect"
                aria-label="Connect"
              />
            </Tabs>
            <TabPanel value={value} index={0}>
              <div class="flex justify-start gap-2">
                <Chip
                  sx={{ fontSize: "1rem", p: "0.2rem" }}
                  icon={<FontAwesomeIcon icon={faCircle} size="2xs" />}
                  label="Dot"
                  variant="outlined"
                  onClick={() => {}}
                />
                <Chip
                  sx={{ fontSize: "1rem", p: "0.2rem" }}
                  icon={<FontAwesomeIcon icon={faMinus} />}
                  label="Line"
                  variant="outlined"
                  onClick={() => {}}
                />
                <Chip
                  sx={{ fontSize: "1rem", p: "0.2rem" }}
                  icon={<FontAwesomeIcon icon={faSquare} size="xs" />}
                  label="Square"
                  variant="outlined"
                  onClick={() => {}}
                />
                <Chip
                  sx={{ fontSize: "1rem", p: "0.2rem" }}
                  icon={<FontAwesomeIcon icon={faDiceD6} />}
                  label="Cube"
                  variant="outlined"
                  onClick={() => {}}
                />
              </div>
            </TabPanel>
            <TabPanel value={value} index={1}>
              Item Two
            </TabPanel>
          </ThemeProvider> */}
        <div
          class=" bg-white duration-100"
          style={{ paddingTop: `${isConnectClicked ? "400px" : "48px"}` }}
        >
          <div class="english__font relative highlight mx-4 mt-4 mb-2 text-2xl font-black z-10">
            Ideas 💡
          </div>
          <div class={isSearchClicked ? "blur-sm" : ""}>
            {ideaDummy}
            {ideaDummy}
            {ideaDummy}
            {ideaDummy}
          </div>
        </div>

        <div class="fixed bottom-24 right-10 z-10">
          <button
            class="shadow-2xl rounded-full w-14 h-14"
            style={{
              color: "#ffffff",
              backgroundColor: "#767676",
            }}
            onClick={onWritingClick}
          >
            <FontAwesomeIcon icon={faFeatherPointed} size="xl" />
          </button>
        </div>
        <div class="fixed bottom-40 right-10 z-10">
          <button
            class="shadow-2xl rounded-full w-14 h-14 duration-200"
            style={{
              color: "#ffffff",
              backgroundColor: `${isConnectClicked ? "#5bb647" : "#767676"}`,
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
