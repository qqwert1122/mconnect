import "css/Writing.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import { dbService } from "fbase";
import { collection, addDoc } from "firebase/firestore";
import { faHeart, faBookmark } from "@fortawesome/free-regular-svg-icons";
import {
  faAngleLeft,
  faCircleCheck,
  faT,
  faTrash,
  faCircle,
  faQuoteLeft,
  faHashtag,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Writing = () => {
  let navigate = useNavigate();

  const onBackClick = () => {
    navigate("/ideas", { replace: true });
  };

  const onIdeaSubmit = async (event) => {
    event.preventDefault();
    try {
      await addDoc(collection(dbService, "ideas"), {
        createdAt: Date.now(),
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div
      class="opening flex-col "
      style={{
        backgroundColor: "#eeeeee",
      }}
    >
      <form class="mb-12">
        <div class="bg-white pb-5 rounded-b-3xl shadow-xl">
          <div class="flex justify-between m-5 ">
            <button onClick={onBackClick}>
              <FontAwesomeIcon icon={faAngleLeft} size="2xl" />
            </button>
            <div>
              <button class="mx-10">
                <FontAwesomeIcon icon={faTrash} size="2xl" />
              </button>
              <button>
                <FontAwesomeIcon icon={faCircleCheck} size="2xl" />
              </button>
            </div>
          </div>
          {/* 제목 */}
          <div class="border-box text-xl m-5 mt-10">
            <span class="mr-5 w-2/12">
              <FontAwesomeIcon icon={faT} />
            </span>
            <input
              class="w-10/12 px-2 rounded-xl border-2 focus:border-current border-gray-300"
              type="text"
              placeholder="제목"
            />
          </div>
          {/* 텍스트 */}
          <div class="flex border-box text-xl m-5 mt-5">
            <span class="items-start mr-5 ">
              <FontAwesomeIcon icon={faCircle} size="xs" />
            </span>
            <textarea
              class="w-10/12 h-60 p-2 rounded-xl border-2 focus:border-current border-gray-300"
              type="text"
              placeholder="내용"
            />
          </div>
          {/* 출처 */}
          <div class="flex border-box text-xl m-5">
            <span class="items-start mr-5 ">
              <FontAwesomeIcon icon={faQuoteLeft} />
            </span>
            <input
              class="w-10/12 px-2 rounded-xl border-2 focus:border-current border-gray-300"
              type="text"
              placeholder="출처"
            />
          </div>
          {/* 태그 */}
          <div class="flex border-box text-xl m-5">
            <span class="items-start mr-5 ">
              <FontAwesomeIcon icon={faHashtag} />
            </span>
            <input
              class="w-10/12 px-2 rounded-xl border-2 focus:border-current border-gray-300"
              type="text"
              placeholder="태그"
            />
          </div>
        </div>
        <div class="flex justify-between">
          <div class="flex m-5 text-3xl">
            <button class="mr-5 text-red-600">
              <FontAwesomeIcon icon={faHeart} />
            </button>
            <button class="text-orange-400">
              <FontAwesomeIcon icon={faBookmark} />
            </button>
          </div>
          <span class="m-5 text-xl">{Date.now()}</span>
        </div>
      </form>

      <div class="english__font mt-2 h-60 bg-white">
        <div class="relative highlight mx-4 mt-4 mb-2 text-2xl font-black z-10">
          Ideas 💡
        </div>
      </div>
      <div class="english__font mt-2 h-60 bg-white">
        <div class="relative highlight mx-4 mt-4 mb-2 text-2xl font-black z-10">
          Connect ♾️
        </div>
      </div>
      <div class="english__font mt-2 h-60 bg-white">
        <div class="relative highlight mx-4 mt-4 mb-2 text-2xl font-black z-10">
          Storming ⚡
        </div>
      </div>
      <div class="english__font mt-2 h-60 bg-white">
        <div class="relative highlight mx-4 mt-4 mb-2 text-2xl font-black z-10">
          Explore 🧭
        </div>
      </div>
    </div>
  );
};

export default Writing;
