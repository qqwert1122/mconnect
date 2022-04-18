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

  const settings = {
    dots: true,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToScroll: 1,
    centerMode: true,
  };
  const testArr = ["text-1", "text-2", "text-3", "text-4", "text-5"];

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
    <div className="opening flex-col bg-stone-200">
      <form className="mb-6">
        <div className="bg-white pb-5 rounded-b-3xl shadow-xl">
          <div className="flex justify-between items-center m-5 ">
            <button onClick={onBackClick}>
              <FontAwesomeIcon icon={faAngleLeft} size="2xl" />
            </button>
            <h1 className="text-2xl font-black">새 아이디어 ✏️</h1>
            <div>
              <button className="mx-10">
                <FontAwesomeIcon icon={faTrash} size="2xl" />
              </button>
              <button>
                <FontAwesomeIcon icon={faCircleCheck} size="2xl" />
              </button>
            </div>
          </div>
          {/* 제목 */}
          <div className="border-box text-xl m-5 mt-10">
            <span className="mr-5 w-2/12">
              <FontAwesomeIcon icon={faT} />
            </span>
            <input
              className="w-10/12 px-2 rounded-xl border-2 focus:border-current border-gray-200"
              type="text"
              placeholder="제목"
            />
          </div>
          {/* 텍스트 */}
          <div className="flex border-box text-xl m-5 mt-5">
            <span className="items-start mr-5 ">
              <FontAwesomeIcon icon={faCircle} size="xs" />
            </span>
            <textarea
              className="w-10/12 h-60 p-2 rounded-xl border-2 focus:border-current border-gray-200"
              type="text"
              placeholder="내용"
            />
          </div>
          {/* 출처 */}
          <div className="flex border-box text-xl m-5">
            <span className="items-start mr-5 ">
              <FontAwesomeIcon icon={faQuoteLeft} />
            </span>
            <input
              className="w-10/12 px-2 rounded-xl border-2 focus:border-current border-gray-200"
              type="text"
              placeholder="출처"
            />
          </div>
          {/* 태그 */}
          <div className="flex border-box text-xl m-5">
            <span className="items-start mr-5 ">
              <FontAwesomeIcon icon={faHashtag} />
            </span>
            <input
              className="w-10/12 px-2 rounded-xl border-2 focus:border-current border-gray-200"
              type="text"
              placeholder="태그"
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex m-5 text-3xl">
            <button className="mr-5 text-red-600">
              <FontAwesomeIcon icon={faHeart} />
            </button>
            <button className="text-orange-400">
              <FontAwesomeIcon icon={faBookmark} />
            </button>
          </div>
          <span className="m-5 text-xl">{Date.now()}</span>
        </div>
      </form>
      <div className="highlight mx-16 my-2 flex justify-center text-2xl font-black">
        연관된 아이디어 ♾️
      </div>
      <div className="relative pb-10 ">
        <Slider {...settings}>
          {testArr.map((arr, index) => (
            <div key={index}>
              <div className="relative h-52 p-5 m-1 bg-white rounded-3xl shadow-lg ">
                {arr}
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Writing;
