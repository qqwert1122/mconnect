import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService, dbService } from "fbase";
import { collection, addDoc } from "firebase/firestore";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import Avatar from "@mui/material/Avatar";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Badge from "@mui/material/Badge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark as farBookmark,
  faHeart as farHeart,
  faCompass as farCompass,
} from "@fortawesome/free-regular-svg-icons";
import {
  faCircle,
  faBookmark as fasBookmark,
  faHeart as fasHeart,
  faCompass as fasCompass,
  faQuoteLeft,
  faHashtag,
  faEllipsis,
  faFireFlameCurved,
  faDice,
  faMinus,
  faSquare,
  faDiceD6,
} from "@fortawesome/free-solid-svg-icons";

// dayjs extends
var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);
var customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);
dayjs.locale("ko");

const Home = ({ customHooks }) => {
  const user = authService.currentUser;
  let navigate = useNavigate();

  const [formText, setFormText] = useState("");
  const [formSource, setFormSource] = useState("");
  const [formTag, setFormTag] = useState("");
  const [formTags, setFormTags] = useState([]);
  const [formLike, setFormLike] = useState(false);
  const [formBookmark, setFormBookmark] = useState(false);
  const [formPublic, setFormPublic] = useState(false);

  const settings = {
    dots: true,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToScroll: 1,
    centerMode: true,
  };

  const categoryItems = [
    { icon: <FontAwesomeIcon icon={faCircle} size="xs" /> },
    { icon: <FontAwesomeIcon icon={faMinus} /> },
    { icon: <FontAwesomeIcon icon={faSquare} size="xs" /> },
    { icon: <FontAwesomeIcon icon={faDiceD6} /> },
  ];

  const menuItems = [
    {
      icon: <FontAwesomeIcon icon={faFireFlameCurved} />,
      label: "인기",
      bgColor: "bg-red-500",
    },
    {
      icon: <FontAwesomeIcon icon={fasHeart} />,
      label: "좋아요",
      bgColor: "bg-orange-500",
    },
    {
      icon: <FontAwesomeIcon icon={faHashtag} />,
      label: "태그",
      bgColor: "bg-lime-500",
    },
    {
      icon: <FontAwesomeIcon icon={faDice} />,
      label: "랜덤",
      bgColor: "bg-sky-500",
    },
  ];
  const testArr = ["text-1", "text-2", "text-3", "text-4", "text-5"];

  const onEllipsisClick = () => {
    customHooks.setNavValue("/setting");
    navigate("/setting", { replace: true });
  };
  const onIdeasClick = () => {
    customHooks.setNavValue("/ideas");
    navigate("/ideas", { replace: true });
  };
  const onConnectClick = () => {
    customHooks.setNavValue("/ideas");
    navigate("/ideas", { replace: true });
  };
  const onStormingClick = () => {
    customHooks.setNavValue("/storming");
    navigate("/storming", { replace: true });
  };
  const onExploreClick = () => {
    customHooks.setNavValue("/explore");
    navigate("/explore", { replace: true });
  };
  const onTextChange = (e) => {
    setFormText(e.target.value);
  };
  const onSourceChange = (e) => {
    setFormSource(e.target.value);
  };
  const onLikeClick = (e) => {
    e.preventDefault();
    setFormLike(!formLike);
  };
  const onBookmarkClick = (e) => {
    e.preventDefault();
    setFormBookmark(!formBookmark);
  };
  const onPublicClick = (e) => {
    e.preventDefault();
    setFormPublic(!formPublic);
  };
  const onKeyDownPreventDefault = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    try {
      await addDoc(collection(dbService, "ideas"), {
        category: 0,
        title: "",
        text: form.formText.value,
        source: form.formSource.value,
        tags: [],
        like: formLike,
        bookmark: formBookmark,
        public: formPublic,
        connectedIdeas: [],
        likeUsers: [],
        createdAt: dayjs().format("YYYY. MM. DD. HH:mm:ss"),
        userId: user.uid,
        userEmail: user.email,
        userName: user.displayName,
        userPhotoURL: user.photoURL,
      });
    } catch (event) {
      console.error("Error adding document: ", event);
    }
    setFormText("");
    setFormSource("");
    setFormLike(false);
    setFormBookmark(false);
    setFormPublic(false);
  };

  const testArrSlide = (
    <Slider {...settings}>
      {testArr.map((arr, index) => (
        <div key={index}>
          <div className="relative h-52 p-5 m-1 rounded-3xl shadow-lg bg-stone-200">
            {arr}
          </div>
        </div>
      ))}
    </Slider>
  );

  return (
    <div className="w-screen bg-stone-200">
      {/* top */}
      <div className="relative w-full bg-yellow-300">
        <div className="flex-col">
          <div className="flex justify-between items-start py-2">
            <div className=" english__font flex font-black pt-4 mx-4 text-3xl ">
              Connecteas
            </div>
            <button className="pt-4 mx-4" onClick={onEllipsisClick}>
              <FontAwesomeIcon icon={faEllipsis} size="2xl" />
            </button>
          </div>
          <div className="mx-4 pt-12 pb-2 text-lg font-black">
            전체 아이디어 : 51개
          </div>
          <div className="flex gap-4 mx-4 pt-2 pb-8 text-2xl font-black">
            {categoryItems.map((item, index) => (
              <span key={index}>
                <Badge
                  color="success"
                  badgeContent={testArr.length}
                  max={999}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                >
                  <div className="flex justify-center items-center w-10 h-10 rounded-xl bg-white shadow-xl">
                    {item.icon}
                  </div>
                </Badge>
              </span>
            ))}
          </div>
        </div>
        <div className="pb-2 rounded-t-3xl bg-white">
          <div className="relative highlight mx-4 mt-4 mb-2 text-lg font-black z-10">
            새 아이디어 ✏️
          </div>
          {/* form */}
          <form onSubmit={onSubmit}>
            <div className="flex justify-between items-end mx-7 mt-2">
              <div className="flex items-end">
                <div className="flex mr-3">
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
              <input
                type="submit"
                className="p-1 w-12 rounded-xl text-lg font-black text-center text-white bg-black"
                value="작성"
              />
            </div>

            <div className="shadow-xl h-52 mt-4 mx-4 rounded-3xl bg-stone-400">
              <div className="flex items-center p-3">
                <FontAwesomeIcon icon={faCircle} size="xs" />
                <textarea
                  className=" rounded-xl border-2 mx-3 p-2 w-full h-24"
                  name="formText"
                  type="text"
                  value={formText}
                  onChange={onTextChange}
                  placeholder="내용을 입력하세요"
                  onKeyDown={onKeyDownPreventDefault}
                  required
                />
              </div>
              <div className="flex items-center px-3 py-1">
                <FontAwesomeIcon icon={faQuoteLeft} />
                <input
                  className=" rounded-xl border-2 mx-3 px-2 w-full"
                  name="formSource"
                  type="text"
                  value={formSource}
                  onChange={onSourceChange}
                  onKeyDown={onKeyDownPreventDefault}
                  placeholder="출처를 입력하세요"
                />
              </div>
              <div className="flex items-center px-3 py-1">
                <FontAwesomeIcon icon={faHashtag} />
                <input
                  className=" rounded-xl border-2 mx-3 px-2 w-full"
                  name="tags"
                  type="text"
                  placeholder="태그를 입력하세요"
                />
              </div>
            </div>

            {/* like, bookmark, time */}
            <div className="flex justify-between items-center mx-6 my-4">
              <div className="flex mx-3 gap-4">
                <button className="text-2xl text-red-500" onClick={onLikeClick}>
                  <FontAwesomeIcon icon={formLike ? fasHeart : farHeart} />
                </button>
                <button
                  className="text-2xl text-orange-400"
                  onClick={onBookmarkClick}
                >
                  <FontAwesomeIcon
                    icon={formBookmark ? fasBookmark : farBookmark}
                  />
                </button>
                <button
                  className="text-2xl text-sky-400"
                  onClick={onPublicClick}
                >
                  <FontAwesomeIcon
                    icon={formPublic ? fasCompass : farCompass}
                  />
                </button>
              </div>
              <div className="mx-3 text-base font-black">
                {dayjs().format("YYYY. MM. DD. HH:mm:ss")}
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* Ideas */}
      <div className=" mt-2 bg-white">
        <div className="flex justify-between items-center pt-4 pb-2 ">
          <div className="english__font absolute highlight left-16 text-2xl font-black z-10">
            Ideas 💡
          </div>
          <button
            className="underline absolute right-16 text-base font-black z-10"
            onClick={onIdeasClick}
          >
            더보기
          </button>
        </div>
        <div className="relative pb-10 ">{testArrSlide}</div>
      </div>
      <div className=" mt-2 bg-white">
        <div className="flex justify-between items-center pt-4 pb-2">
          <div className="english__font absolute highlight left-16  text-2xl font-black z-10">
            Connect ♾️
          </div>
          <button
            className="underline absolute right-16 text-base font-black z-10"
            onClick={onConnectClick}
          >
            더보기
          </button>
        </div>
        <div className="relative pb-10 ">{testArrSlide}</div>
      </div>
      {/* Storming */}
      <div className=" mt-2 bg-white">
        <div className="flex justify-between items-center pt-4 pb-2">
          <div className="english__font absolute highlight left-16 text-2xl font-black z-10">
            Storming ⚡
          </div>
          <button
            className="underline absolute right-16 text-base font-black z-10"
            onClick={onStormingClick}
          >
            더보기
          </button>
        </div>
        <div className="relative px-10 pb-10 flex flex-wrap">
          {menuItems.map((item, index) => (
            <div key={index} className="border-box flex w-1/2 p-1">
              <div
                className={`relative shadow-xl w-full h-24 m-1 p-2 rounded-xl text-white ${item.bgColor}`}
              >
                <p className="absolute left-2 top-2 text-5xl">{item.icon}</p>
                <p className="absolute bottom-2 right-2 text-xl font-black">
                  {item.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Explore */}
      <div className=" mt-2 bg-white">
        <div className="relative flex justify-between items-center pt-4 pb-2">
          <div className="absolute english__font highlight left-16 text-2xl font-black z-10">
            Explore 🧭
          </div>
          <button
            className="underline absolute right-16 text-base font-black z-10"
            onClick={onExploreClick}
          >
            더보기
          </button>
        </div>
        <div className="relative pb-10 ">{testArrSlide}</div>
      </div>
    </div>
  );
};

export default Home;
