import "css/Writing.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
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

  const settings = {
    dots: true,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToScroll: 1,
    centerMode: true,
  };

  return (
    <div
      class="opening flex-col "
      style={{
        backgroundColor: "#eeeeee",
      }}
    >
      <form class="mb-6">
        <div class="bg-white pb-5 rounded-b-3xl shadow-xl">
          <div class="flex justify-between items-center m-5 ">
            <button onClick={onBackClick}>
              <FontAwesomeIcon icon={faAngleLeft} size="2xl" />
            </button>
            <h1 class="text-2xl font-black">새 아이디어 ✏️</h1>
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
              class="w-10/12 px-2 rounded-xl border-2 focus:border-current border-gray-200"
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
              class="w-10/12 h-60 p-2 rounded-xl border-2 focus:border-current border-gray-200"
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
              class="w-10/12 px-2 rounded-xl border-2 focus:border-current border-gray-200"
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
              class="w-10/12 px-2 rounded-xl border-2 focus:border-current border-gray-200"
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
      <div class="highlight mx-16 my-2 flex justify-center text-2xl font-black">
        연관된 아이디어 ♾️
      </div>
      <div class="relative pb-10 ">
        <Slider {...settings}>
          <div>
            <div class="relative h-52 p-5 m-1 bg-white rounded-3xl shadow-lg ">
              hello
            </div>
          </div>
          <div>
            <div class="relative h-52 p-5 m-1 bg-white rounded-3xl shadow-lg ">
              hello
            </div>
          </div>
          <div>
            <div class="relative h-52 p-5 m-1 bg-white rounded-3xl shadow-lg ">
              hello
            </div>
          </div>
          <div>
            <div class="relative h-52 p-5 m-1 bg-white rounded-3xl shadow-lg ">
              hello
            </div>
          </div>
          <div>
            <div class="relative h-52 p-5 m-1 bg-white rounded-3xl shadow-lg ">
              hello
            </div>
          </div>
          <div>
            <div class="relative h-52 p-5 m-1 bg-white rounded-3xl shadow-lg ">
              hello
            </div>
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default Writing;
