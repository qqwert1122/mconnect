import React from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "fbase";
import Avatar from "@mui/material/Avatar";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Badge from "@mui/material/Badge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faHeart as farHeart,
} from "@fortawesome/free-regular-svg-icons";
import {
  faCircle,
  faHeart as fasHeart,
  faQuoteLeft,
  faHashtag,
  faCircleCheck,
  faTrash,
  faEllipsis,
  faFireFlameCurved,
  faDice,
  faMinus,
  faSquare,
  faDiceD6,
} from "@fortawesome/free-solid-svg-icons";

const Home = ({ customHooks }) => {
  const user = authService.currentUser;
  let navigate = useNavigate();

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
      <div
        className="relative w-full"
        style={{
          background: "linear-gradient(45deg, #fff44f, #facc15)",
        }}
      >
        <div className="flex-col">
          <div className="flex justify-between items-start py-2">
            <div className=" english__font flex font-black pt-4 mx-4 text-3xl ">
              Connecteas
            </div>
            <button className="pt-4 mx-4" onClick={onEllipsisClick}>
              <FontAwesomeIcon icon={faEllipsis} size="2xl" />
            </button>
          </div>
          <div className="mx-4 py-2 text-xl font-black">
            전체 아이디어 : 51개
          </div>
          <div className="flex gap-4 mx-4 pt-2 pb-8 text-xl font-black">
            {categoryItems.map((item, index) => (
              <span key={index}>
                <Badge
                  color="success"
                  badgeContent={4}
                  max={99}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                >
                  <div className="flex justify-center items-center w-8 h-8 rounded-xl bg-white">
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
            <div className="flex text-2xl">
              <button className="mt-3 ">
                <FontAwesomeIcon icon={faTrash} />
              </button>
              <button className="mt-3 mx-5">
                <FontAwesomeIcon icon={faCircleCheck} />
              </button>
            </div>
          </div>

          <div className="shadow-xl h-52 mt-4 mx-4 rounded-3xl bg-stone-400">
            {/* form */}
            <form className="flex-col w-full h-full">
              <div className="flex items-center p-3">
                <FontAwesomeIcon icon={faCircle} size="xs" />
                <textarea
                  className=" rounded-xl border-2 mx-3 p-2 w-full h-24"
                  type="text"
                  placeholder="내용을 입력하세요"
                  required
                />
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
            </form>
          </div>

          {/* like, bookmark, time */}
          <div className="flex justify-between items-center mx-6 my-4">
            <div>
              <button className="mx-5 text-2xl text-red-500">
                <FontAwesomeIcon icon={farHeart} />
              </button>
              <button className="text-2xl text-orange-400">
                <FontAwesomeIcon icon={faBookmark} />
              </button>
            </div>
            <div className="mx-3 text-xl">{Date.now()}</div>
          </div>
        </div>
      </div>
      {/* Ideas */}
      <div className=" mt-2 bg-white">
        <div className="flex justify-between items-center">
          <div className="english__font absolute highlight left-16 mt-4 mb-2 text-2xl font-black z-10">
            Ideas 💡
          </div>
          <button
            className="underline absolute right-16 mt-4 mb-2 text-xl font-black z-10"
            onClick={onIdeasClick}
          >
            더보기
          </button>
        </div>
        <div className="relative pb-10 ">{testArrSlide}</div>
      </div>
      <div className=" mt-2 bg-white">
        <div className="flex justify-between items-center">
          <div className="english__font absolute highlight left-16 mt-4 mb-2 text-2xl font-black z-10">
            Connect ♾️
          </div>
          <button
            className="underline absolute right-16 mt-4 mb-2 text-xl font-black z-10"
            onClick={onConnectClick}
          >
            더보기
          </button>
        </div>
        <div className="relative pb-10 ">{testArrSlide}</div>
      </div>
      {/* Storming */}
      <div className=" mt-2 bg-white">
        <div className="flex justify-between items-center">
          <div className="english__font absolute highlight left-16 mt-4 mb-2 text-2xl font-black z-10">
            Storming ⚡
          </div>
          <button
            className="underline absolute right-16 mt-4 mb-2 text-xl font-black z-10"
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
        <div className="relative flex justify-between items-center">
          <div className="absolute english__font highlight left-16 mt-4 mb-2 text-2xl font-black z-10">
            Explore 🧭
          </div>
          <button
            className="underline absolute right-16 mt-4 mb-2 text-xl font-black z-10"
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
