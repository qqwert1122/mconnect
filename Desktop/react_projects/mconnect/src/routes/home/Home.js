import HomeForm from "./HomeForm";
import "css/Idea.css";
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
import {} from "@fortawesome/free-regular-svg-icons";
import {
  faCircle,
  faBookmark as fasBookmark,
  faHeart as fasHeart,
  faCompass as fasCompass,
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
  const dbIdeas = customHooks.dbIdeas;

  // form
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
    {
      icon: "all",
      bgColor: "bg-white",
      color: "text-black",
      label: dbIdeas.length,
      value: 0,
    },
    {
      icon: <FontAwesomeIcon icon={faCircle} size="xs" />,
      bgColor: "bg-white",
      color: "text-black",
      label: dbIdeas.filter((idea) => idea.category === 0).length,
      value: 0,
    },
    {
      icon: <FontAwesomeIcon icon={faMinus} />,
      bgColor: "bg-white",
      color: "text-black",
      label: dbIdeas.filter((idea) => idea.category === 1).length,
      value: 1,
    },
    {
      icon: <FontAwesomeIcon icon={faSquare} size="xs" />,
      bgColor: "bg-white",
      color: "text-black",
      label: dbIdeas.filter((idea) => idea.category === 2).length,
      value: 2,
    },
    {
      icon: <FontAwesomeIcon icon={faDiceD6} />,
      bgColor: "bg-white",
      color: "text-black",
      label: dbIdeas.filter((idea) => idea.category === 3).length,
      value: 3,
    },
  ];
  const filterItems = [
    {
      icon: <FontAwesomeIcon icon={fasHeart} />,
      bgColor: "bg-red-400",
      color: "text-white",
      label: dbIdeas.filter((idea) => idea.like === true).length,
      value: "like",
    },
    {
      icon: <FontAwesomeIcon icon={fasBookmark} />,
      bgColor: "bg-orange-400",
      color: "text-white",
      label: dbIdeas.filter((idea) => idea.bookmark === true).length,
      value: "bookmark",
    },
    {
      icon: <FontAwesomeIcon icon={fasCompass} />,
      bgColor: "bg-sky-400",
      color: "text-white",
      label: dbIdeas.filter((idea) => idea.public === true).length,
      value: "public",
    },
  ];

  const achievementItems = [
    {
      label: "주가 떡상중📈",
      bgColor: "bg-red-500",
      color: "text-white",
    },
    {
      label: "불타는 열정🔥",
      bgColor: "bg-red-400",
      color: "text-white",
    },
    {
      label: "인기쟁이😎",
      bgColor: "bg-orange-400",
      color: "text-white",
    },
    {
      label: "공부벌레✏️",
      bgColor: "bg-yellow-400",
      color: "text-white",
    },
    {
      label: "뉴비🥳",
      bgColor: "bg-green-400",
      color: "text-white",
    },
    {
      label: "항해자🗺️",
      bgColor: "bg-sky-400",
      color: "text-white",
    },
    {
      label: "소통왕🤗",
      bgColor: "bg-purple-400",
      color: "text-white",
    },
  ];

  const menuItems = [
    {
      icon: <FontAwesomeIcon icon={faFireFlameCurved} />,
      label: "인기",
      bgColor: "bg-red-400",
    },
    {
      icon: <FontAwesomeIcon icon={fasHeart} />,
      label: "좋아요",
      bgColor: "bg-orange-400",
    },
    {
      icon: <FontAwesomeIcon icon={faHashtag} />,
      label: "태그",
      bgColor: "bg-lime-400",
    },
    {
      icon: <FontAwesomeIcon icon={faDice} />,
      label: "랜덤",
      bgColor: "bg-sky-400",
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
        tags: formTags,
        like: formLike,
        bookmark: formBookmark,
        public: formPublic,
        connectedIdeas: [],
        likeUsers: [],
        isClicked: false,
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
    setFormTag("");
    setFormTags([]);
    setFormLike(false);
    setFormBookmark(false);
    setFormPublic(false);
  };

  const ideasSlider = (
    <Slider {...settings}>
      {customHooks.dbIdeas
        .filter((idea, index) => index < 5)
        .map((idea, index) => (
          <div key={index}>
            <div className="relative h-52 p-5 m-1 rounded-3xl shadow text-sm bg-stone-100 break-all">
              {idea.title === "" ? (
                idea.text.length < 150 ? (
                  idea.text
                ) : (
                  <>
                    {idea.text.substr(0, 150)}
                    <span>...</span>
                    <span className="font-black underline">더보기</span>
                  </>
                )
              ) : (
                <>
                  <div className="mb-2 font-black text-lg">{idea.title}</div>
                  {idea.text.length < 120 ? (
                    idea.text
                  ) : (
                    <>
                      {idea.text.substr(0, 120)}
                      <span>...</span>
                      <span className="font-black underline">더보기</span>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
    </Slider>
  );

  const testArrSlide = (
    <Slider {...settings}>
      {testArr.map((arr, index) => (
        <div key={index}>
          <div className="relative h-52 p-5 m-1 rounded-3xl shadow bg-stone-100">
            {arr}
          </div>
        </div>
      ))}
    </Slider>
  );

  return (
    <div className="bg-stone-200">
      {/* top */}
      <div
        className="relative w-full"
        style={{
          background: "linear-gradient(45deg, #fef9c3, #d9f99d , #fde047)",
        }}
      >
        <div className="flex-col">
          <div className="flex justify-between items-start py-2">
            <div className=" english__font flex font-black pt-4 mx-4 text-3xl text-black">
              Connecteas
            </div>
            <button className="pt-4 mx-4" onClick={onEllipsisClick}>
              <FontAwesomeIcon icon={faEllipsis} size="2xl" />
            </button>
          </div>
          <div className="flex items-end gap-2 mx-4 pt-8 pb-6 font-black ">
            <div className="shadow-xl rounded-full">
              <Avatar
                alt="avatar"
                src={user.photoURL}
                sx={{
                  display: "flex",
                  width: "50px",
                  height: "50px",
                  borderWidth: "2px",
                  borderColor: "white",
                }}
              />
            </div>
            <div className="text-lg z-10">
              {user.displayName}님 안녕하세요😚
            </div>
          </div>
          <div className="mx-4 pb-4 text-lg font-black">카테고리</div>
          <div className="mx-4 pb-8 ">
            <div className="flex flex-wrap gap-4 mb-4">
              {categoryItems.map((item, index) => (
                <span key={index}>
                  <Badge
                    color="success"
                    badgeContent={item.label}
                    max={999}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                  >
                    <div
                      className={`flex justify-center items-center w-10 h-10 rounded-xl font-black text-base ${item.bgColor} ${item.color} shadow-xl`}
                    >
                      {item.icon}
                    </div>
                  </Badge>
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              {filterItems.map((item, index) => (
                <span key={index}>
                  <Badge
                    color="success"
                    badgeContent={item.label}
                    max={999}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                  >
                    <div
                      className={`flex justify-center items-center w-10 h-10 rounded-xl text-lg ${item.bgColor} ${item.color} shadow-xl`}
                    >
                      {item.icon}
                    </div>
                  </Badge>
                </span>
              ))}
            </div>
          </div>
          <div className="mx-4 pb-4 text-lg font-black">업적</div>
          <div className="flex flex-wrap gap-1 mx-4 pb-8">
            {achievementItems.map((item, index) => (
              <div
                key={index}
                className={`flex justify-center items-center p-1 rounded-3xl text-sm  font-black ${item.bgColor} ${item.color} shadow-xl border-2 border-white`}
              >
                {item.label}
              </div>
            ))}
          </div>
        </div>
        <div className="pb-2 rounded-t-3xl bg-white">
          {/* form */}
          <HomeForm
            onSubmit={onSubmit}
            formText={formText}
            onTextChange={onTextChange}
            onKeyDownPreventDefault={onKeyDownPreventDefault}
            formSource={formSource}
            onSourceChange={onSourceChange}
            formLike={formLike}
            onLikeClick={onLikeClick}
            formBookmark={formBookmark}
            onBookmarkClick={onBookmarkClick}
            formPublic={formPublic}
            onPublicClick={onPublicClick}
            formTags={formTags}
            setFormTags={setFormTags}
            formTag={formTag}
            setFormTag={setFormTag}
          />
        </div>
      </div>
      {/* Ideas */}
      <div className=" mt-2 bg-white">
        <div className="flex justify-between items-center pt-4 pb-2 ">
          <div className="english__font absolute left-16 text-xl font-black z-10">
            Ideas 💡
          </div>
          <button
            className="underline absolute right-16 text-sm font-black z-10"
            onClick={onIdeasClick}
          >
            더보기
          </button>
        </div>
        <div className="relative pb-10 ">{ideasSlider}</div>
      </div>
      <div className=" mt-2 bg-white">
        <div className="flex justify-between items-center pt-4 pb-2">
          <div className="english__font absolute left-16  text-xl font-black z-10">
            Connect ♾️
          </div>
          <button
            className="underline absolute right-16 text-sm font-black z-10"
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
          <div className="english__font absolute left-16 text-xl font-black z-10">
            Storming ⚡
          </div>
          <button
            className="underline absolute right-16 text-sm font-black z-10"
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
                <p className="absolute bottom-2 right-2 text-base font-black">
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
          <div className="absolute english__font left-16 text-xl font-black z-10">
            Explore 🧭
          </div>
          <button
            className="underline absolute right-16 text-sm font-black z-10"
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
