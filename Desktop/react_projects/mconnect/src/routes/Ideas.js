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
} from "@fortawesome/free-solid-svg-icons";
import { faBookmark, faHeart } from "@fortawesome/free-regular-svg-icons";

const testArr = ["text1", "text2", "text3", "text4", "text5", "text6"];

const Ideas = ({ customHooks }) => {
  const [value, setValue] = useState(0);
  const [isSearchClicked, setIsSearchClicked] = useState(false);

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
        class="relative"
        style={{
          background: "#eeeeee",
        }}
      >
        {/* App Bar */}
        <div
          class="fixed top-0 flex justify-between items-center p-2 w-full z-20"
          style={{
            backgroundColor: "#5bb647",
            // justifyContent: `${isSearchClicked ? "space-between" : "flex-end"}`,
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
              />
            ) : (
              <></>
            )}
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>

        {/* Search Page */}
        <div></div>

        {/* Tabs */}
        <div class="bg-white" style={{ paddingTop: "48px" }}>
          {/* Connected Ideas */}
          <div style={{ backgroundColor: "#eeeeee" }}>
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
        </div>

        {/* Contents */}
        <div class=" mt-2 bg-white">
          <div class="english__font relative highlight mx-4 mt-4 mb-2 text-2xl font-black z-10">
            Ideas 💡
          </div>
          {ideaDummy}
          {ideaDummy}
          {ideaDummy}
          {ideaDummy}
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
            class="shadow-2xl rounded-full w-14 h-14"
            style={{
              color: "#ffffff",
              backgroundColor: "#767676",
            }}
          >
            <FontAwesomeIcon icon={faCircleNodes} size="xl" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Ideas;
