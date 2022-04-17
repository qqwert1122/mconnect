import React from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "fbase";
import Avatar from "@mui/material/Avatar";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faCircle,
  faDiceD6,
  faSquare,
  faMinus,
  faQuoteLeft,
  faHashtag,
  faCircleCheck,
  faTrash,
  faEllipsis,
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

  return (
    <div
      class="w-screen"
      style={{
        background: "#eeeeee",
      }}
    >
      {/* top */}
      <div class="relative w-full pb-2 bg-white">
        <div class="flex justify-between">
          <div class=" english__font flex font-black pt-4 mx-4 text-3xl ">
            Connecteas
          </div>
          <button class="pt-4 mx-4" onClick={onEllipsisClick}>
            <FontAwesomeIcon icon={faEllipsis} size="2xl" />
          </button>
        </div>
        <div class="relative highlight mx-4 mt-4 mb-2 text-lg font-black z-10">
          새 아이디어 ✏️
        </div>
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

        <div class=""></div>
      </div>
      <div class=" mt-2 bg-white">
        <div class="flex justify-between items-center">
          <div class="english__font absolute highlight left-16 mt-4 mb-2 text-2xl font-black z-10">
            Ideas 💡
          </div>
          <button
            class="underline absolute right-16 mt-4 mb-2 text-xl font-black z-10"
            onClick={onIdeasClick}
          >
            더보기
          </button>
        </div>
        <div class="relative pb-10 ">
          <Slider {...settings}>
            <div>
              <div
                class="relative h-52 p-5 m-1 rounded-3xl shadow-lg "
                style={{
                  backgroundColor: "#eeeeee",
                }}
              >
                hello
              </div>
            </div>
            <div>
              <div
                class="relative h-52 p-5 m-1 rounded-3xl shadow-lg "
                style={{
                  backgroundColor: "#eeeeee",
                }}
              >
                hello
              </div>
            </div>
            <div>
              <div
                class="relative h-52 p-5 m-1 rounded-3xl shadow-lg "
                style={{
                  backgroundColor: "#eeeeee",
                }}
              >
                hello
              </div>
            </div>
            <div>
              <div
                class="relative h-52 p-5 m-1 rounded-3xl shadow-lg "
                style={{
                  backgroundColor: "#eeeeee",
                }}
              >
                hello
              </div>
            </div>
            <div>
              <div
                class="relative h-52 p-5 m-1 rounded-3xl shadow-lg "
                style={{
                  backgroundColor: "#eeeeee",
                }}
              >
                hello
              </div>
            </div>
            <div>
              <div
                class="relative h-52 p-5 m-1 rounded-3xl shadow-lg "
                style={{
                  backgroundColor: "#eeeeee",
                }}
              >
                hello
              </div>
            </div>
          </Slider>
        </div>
      </div>
      <div class=" mt-2 bg-white">
        <div class="flex justify-between items-center">
          <div class="english__font absolute highlight left-16 mt-4 mb-2 text-2xl font-black z-10">
            Connect ♾️
          </div>
          <button
            class="underline absolute right-16 mt-4 mb-2 text-xl font-black z-10"
            onClick={onConnectClick}
          >
            더보기
          </button>
        </div>
        <div class="relative pb-10 ">
          <Slider {...settings}>
            <div>
              <div
                class="relative h-52 p-5 m-1 rounded-3xl shadow-lg "
                style={{
                  backgroundColor: "#eeeeee",
                }}
              >
                hello
              </div>
            </div>
            <div>
              <div
                class="relative h-52 p-5 m-1 rounded-3xl shadow-lg "
                style={{
                  backgroundColor: "#eeeeee",
                }}
              >
                hello
              </div>
            </div>
            <div>
              <div
                class="relative h-52 p-5 m-1 rounded-3xl shadow-lg "
                style={{
                  backgroundColor: "#eeeeee",
                }}
              >
                hello
              </div>
            </div>
            <div>
              <div
                class="relative h-52 p-5 m-1 rounded-3xl shadow-lg "
                style={{
                  backgroundColor: "#eeeeee",
                }}
              >
                hello
              </div>
            </div>
            <div>
              <div
                class="relative h-52 p-5 m-1 rounded-3xl shadow-lg "
                style={{
                  backgroundColor: "#eeeeee",
                }}
              >
                hello
              </div>
            </div>
            <div>
              <div
                class="relative h-52 p-5 m-1 rounded-3xl shadow-lg "
                style={{
                  backgroundColor: "#eeeeee",
                }}
              >
                hello
              </div>
            </div>
          </Slider>
        </div>
      </div>
      <div class=" mt-2 bg-white">
        <div class="flex justify-between items-center">
          <div class="english__font absolute highlight left-16 mt-4 mb-2 text-2xl font-black z-10">
            Storming ⚡
          </div>
          <button
            class="underline absolute right-16 mt-4 mb-2 text-xl font-black z-10"
            onClick={onStormingClick}
          >
            더보기
          </button>
        </div>
        <div class="relative px-10 pb-10 flex flex-wrap">
          <div class="border-box flex w-1/2 p-1">
            <div
              class="shadow-xl w-full h-24 m-1 p-2 rounded-xl "
              style={{
                backgroundColor: "#ffff83",
              }}
            ></div>
          </div>
          <div class="border-box flex w-1/2 p-1">
            <div
              class="shadow-xl w-full h-24 m-1 p-2 rounded-xl "
              style={{
                backgroundColor: "#5bb647",
              }}
            ></div>
          </div>
          <div class="border-box flex w-1/2 p-1">
            <div
              class="shadow-xl w-full h-24 m-1 p-2 rounded-xl "
              style={{
                backgroundColor: "#8ee976",
              }}
            ></div>
          </div>
          <div class="border-box flex w-1/2 p-1">
            <div
              class="shadow-xl w-full h-24 m-1 p-2 rounded-xl "
              style={{
                backgroundColor: "#fff44f",
              }}
            ></div>
          </div>
        </div>
      </div>
      <div class=" mt-2 bg-white">
        <div class="relative flex justify-between items-center">
          <div class="absolute english__font highlight left-16 mt-4 mb-2 text-2xl font-black z-10">
            Explore 🧭
          </div>
          <button
            class="underline absolute right-16 mt-4 mb-2 text-xl font-black z-10"
            onClick={onExploreClick}
          >
            더보기
          </button>
        </div>
        <div class="relative pb-10 ">
          <Slider {...settings}>
            <div>
              <div
                class="relative h-52 p-5 m-1 rounded-3xl shadow-lg "
                style={{
                  backgroundColor: "#eeeeee",
                }}
              >
                hello
              </div>
            </div>
            <div>
              <div
                class="relative h-52 p-5 m-1 rounded-3xl shadow-lg "
                style={{
                  backgroundColor: "#eeeeee",
                }}
              >
                hello
              </div>
            </div>
            <div>
              <div
                class="relative h-52 p-5 m-1 rounded-3xl shadow-lg "
                style={{
                  backgroundColor: "#eeeeee",
                }}
              >
                hello
              </div>
            </div>
            <div>
              <div
                class="relative h-52 p-5 m-1 rounded-3xl shadow-lg "
                style={{
                  backgroundColor: "#eeeeee",
                }}
              >
                hello
              </div>
            </div>
            <div>
              <div
                class="relative h-52 p-5 m-1 rounded-3xl shadow-lg "
                style={{
                  backgroundColor: "#eeeeee",
                }}
              >
                hello
              </div>
            </div>
            <div>
              <div
                class="relative h-52 p-5 m-1 rounded-3xl shadow-lg "
                style={{
                  backgroundColor: "#eeeeee",
                }}
              >
                hello
              </div>
            </div>
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Home;
