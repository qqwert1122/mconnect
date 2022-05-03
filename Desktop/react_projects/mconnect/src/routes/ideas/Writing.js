import "css/Writing.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService, dbService } from "fbase";
import { collection, addDoc } from "firebase/firestore";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark as farBookmark,
  faHeart as farHeart,
  faCompass as farCompass,
} from "@fortawesome/free-regular-svg-icons";
import {
  faAngleLeft,
  faBookmark as fasBookmark,
  faHeart as fasHeart,
  faCompass as fasCompass,
  faT,
  faCircle,
  faQuoteLeft,
  faHashtag,
  faDiceD6,
  faSquare,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";

var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);
var customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);
dayjs.locale("ko");

const Writing = ({ customHooks }) => {
  const user = authService.currentUser;
  const selectedIdeas = customHooks.selectedIdeas;
  const setSelectedIdeas = customHooks.setSelectedIdeas;
  let navigate = useNavigate();

  // form
  const [formTitle, setFormTitle] = useState("");
  const [formCategory, setFormCategory] = useState(1);
  const [formText, setFormText] = useState("");
  const [formSource, setFormSource] = useState("");
  const [formTag, setFormTag] = useState("");
  const [formTags, setFormTags] = useState([]);
  const [formLike, setFormLike] = useState(false);
  const [formBookmark, setFormBookmark] = useState(false);
  const [formPublic, setFormPublic] = useState(false);

  useEffect(() => {
    if (selectedIdeas.length === 0) {
      setFormCategory(0);
    } else {
      const newCategory = selectedIdeas
        .map((idea) => idea.category)
        .sort(function (a, b) {
          return b - a;
        })[0];
      switch (newCategory) {
        case 3:
          setFormCategory(3);
          break;
        default:
          setFormCategory(newCategory + 1);
          break;
      }
    }
  }, []);

  const onBackClick = (e) => {
    e.preventDefault();
    navigate("/ideas", { replace: true });
  };

  const onTitleChange = (e) => {
    setFormTitle(e.target.value);
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
  const onEnterKeyDown = (e) => {
    if (e.key === "Process") {
      return;
    }

    if (e.code === "Enter") {
      if (e.target.value.trim().length == 0) {
        e.preventDefault();
        return;
      }

      e.preventDefault();
      if (formTags.includes(e.target.value)) {
        setFormTag("");
      } else {
        setFormTags([...formTags, e.target.value]);
        setFormTag("");
      }
    }
  };
  const onTagChange = (e) => {
    setFormTag(e.target.value);
  };
  const onTagClick = (e, tag) => {
    e.preventDefault();
    setFormTags(formTags.filter((_tag) => _tag != tag));
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    try {
      await addDoc(collection(dbService, "ideas"), {
        category: formCategory,
        title: formTitle,
        text: formText,
        source: formSource,
        tags: formTags,
        like: formLike,
        bookmark: formBookmark,
        public: formPublic,
        connectedIdeas: selectedIdeas,
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
    setFormTitle("");
    setFormText("");
    setFormSource("");
    setFormTag("");
    setFormTags([]);
    setFormLike(false);
    setFormBookmark(false);
    setFormPublic(false);
    setSelectedIdeas([]);
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

  return (
    <div className="opening flex-col bg-stone-100 min-h-screen text-sm">
      <form className="pb-6" onSubmit={onSubmit}>
        <div className="bg-white pb-5 rounded-b-3xl shadow-xl">
          <div className="flex justify-between items-center m-5 ">
            <button onClick={onBackClick}>
              <FontAwesomeIcon icon={faAngleLeft} size="2xl" />
            </button>
            <h1 className="text-lg font-black">
              {selectedIdeas.length === 0
                ? "새 아이디어 ✏️"
                : "아이디어 연결 ♾️"}
            </h1>
            <input
              type="submit"
              className="p-1 rounded-xl text-lg font-black text-center shadow-md text-white bg-stone-600"
              value="작성"
            />
          </div>
          {/* 제목 */}
          {selectedIdeas.length === 0 ? (
            <></>
          ) : (
            <div className="border-box  m-5 mt-10">
              <span className="mr-5 w-2/12 text-xl">
                <FontAwesomeIcon icon={faT} />
              </span>
              <input
                className="w-10/12 px-2 rounded-xl border-2 focus:border-current border-gray-200"
                type="text"
                name="formTitle"
                placeholder="제목"
                value={formTitle}
                onChange={onTitleChange}
                onKeyDown={onKeyDownPreventDefault}
                autoComplete="off"
              />
            </div>
          )}
          {/* 텍스트 */}
          <div
            className={`flex border-box m-5 ${
              selectedIdeas.length === 0 ? "mt-10" : "mt-5"
            }`}
          >
            <span className="items-start mr-5 text-xl ">
              {formCategory === 3 ? (
                <FontAwesomeIcon icon={faDiceD6} />
              ) : formCategory === 2 ? (
                <FontAwesomeIcon icon={faSquare} size="sm" />
              ) : formCategory === 1 ? (
                <FontAwesomeIcon icon={faMinus} />
              ) : (
                <FontAwesomeIcon icon={faCircle} size="xs" />
              )}
            </span>
            <textarea
              className="w-10/12 h-60 p-2 rounded-xl border-2 focus:border-current border-gray-200"
              type="text"
              name="formText"
              placeholder="내용"
              autoComplete="off"
              value={formText}
              onChange={onTextChange}
              required
            />
          </div>
          {/* 출처 */}
          <div className="flex border-box m-5 mb-0">
            <span className="items-start mr-5 text-xl">
              <FontAwesomeIcon icon={faQuoteLeft} />
            </span>
            <input
              className="w-10/12 px-2 rounded-xl border-2 focus:border-current border-gray-200"
              type="text"
              name="formSource"
              placeholder="출처"
              autoComplete="off"
              value={formSource}
              onChange={onSourceChange}
              onKeyDown={onKeyDownPreventDefault}
            />
          </div>
          {/* 태그 */}
          <div className="m-5 my-2">
            <span className="mr-5 text-xl">
              <FontAwesomeIcon icon={faHashtag} />
            </span>
            {formTags.map((tag, index) => (
              <button
                key={index}
                className="mr-2 mb-1 px-2 rounded-xl text-sm duration-500 bg-stone-500 text-white"
                onClick={(e) => {
                  onTagClick(e, tag);
                }}
              >
                {tag}
              </button>
            ))}
            <input
              className=" rounded-xl border-2 px-2 w-24"
              name="tags"
              type="text"
              placeholder="태그"
              autoComplete="off"
              value={formTag}
              onChange={(e) => onTagChange(e)}
              onKeyDown={(e) => onEnterKeyDown(e)}
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex m-5 text-2xl gap-4">
            <button className="text-red-600" onClick={onLikeClick}>
              <FontAwesomeIcon icon={formLike ? fasHeart : farHeart} />
            </button>
            <button className="text-orange-400" onClick={onBookmarkClick}>
              <FontAwesomeIcon
                icon={formBookmark ? fasBookmark : farBookmark}
              />
            </button>
            <button className="text-sky-400" onClick={onPublicClick}>
              <FontAwesomeIcon icon={formPublic ? fasCompass : farCompass} />
            </button>
          </div>
          <span className="m-5 text-base font-black">
            {dayjs().format("YYYY. MM. DD. HH:mm:ss")}
          </span>
        </div>
      </form>
      {selectedIdeas.length > 0 ? (
        <>
          <div className="mx-16 my-2 text-lg font-black">
            연결된 아이디어 ♾️
          </div>
          <div className="relative pb-10 ">
            <Slider {...settings}>
              {selectedIdeas.map((idea, index) => (
                <div key={index}>
                  <div className="relative h-52 p-5 m-1 bg-white rounded-3xl shadow-lg break-all">
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
                        <div className="mb-2 font-black text-lg">
                          {idea.title}
                        </div>
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
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Writing;
