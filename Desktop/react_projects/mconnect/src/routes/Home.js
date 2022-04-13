import React from "react";
import { authService } from "fbase";
import Avatar from "@mui/material/Avatar";
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
  faCircleChevronLeft,
  faDeleteLeft,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const Home = (customHooks) => {
  const user = authService.currentUser;

  return (
    <div
      class="w-screen"
      style={{
        background: "#eeeeee",
      }}
    >
      {/* top */}
      <div class="relative w-full pb-2 scroll-auto bg-white">
        <div class="app__logo english__font font-black pt-4 mx-4 text-3xl ">
          Connect
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
          class="borderShadow h-52 mt-4 mx-4 rounded-3xl"
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
      <div class="mt-2 h-32 bg-blue-200">ideas</div>
      <div class="mt-2 h-32 bg-red-200">Connect</div>
      <div class="mt-2 h-32 bg-blue-200">storming</div>
      <div class="mt-2 h-32 bg-red-200">explore</div>
    </div>
  );
};

export default Home;
