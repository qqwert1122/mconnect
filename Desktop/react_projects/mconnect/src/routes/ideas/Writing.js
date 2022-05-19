import BottomBar from "./BottomBar";
import SelectedIdeasSlide from "./SelectedIdeasSlide";
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

const tags = [
  { label: "", category: 0, bgColor: "" },
  { label: "", category: 0, bgColor: "" },
];

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
  const [toggleTagBar, setToggleTagBar] = useState(false);

  const onTagHolderClick = (e) => {
    e.preventDefault();
    setToggleTagBar(!toggleTagBar);
  };

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

  useEffect(() => {
    // ref
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

  const setCategory = (formCategory) => {
    switch (formCategory) {
      case 3:
        return { icon: <FontAwesomeIcon icon={faDiceD6} />, label: "상자" };
      case 2:
        return {
          icon: <FontAwesomeIcon icon={faSquare} size="sm" />,
          label: "면",
        };
      case 1:
        return { icon: <FontAwesomeIcon icon={faMinus} />, label: "선" };
      default:
        return {
          icon: <FontAwesomeIcon icon={faCircle} size="xs" />,
          label: "점",
        };
    }
  };

  return (
    <div className="opening flex-col bg-stone-100 text-sm">
      <form onSubmit={onSubmit}>
        <div
          className={`bg-white min-h-screen ${
            selectedIdeas.length > 0 ? "pt-40" : "pt-20"
          }`}
        >
          <div className="fixed top-0 w-full z-20 flex-col bg-white shadow">
            <div className="p-3 flex justify-between items-center">
              <div className="flex gap-4">
                <button onClick={onBackClick}>
                  <FontAwesomeIcon icon={faAngleLeft} size="xl" />
                </button>
                {/* 제목 */}
                {selectedIdeas.length > 0 && (
                  <input
                    className="w-full px-2 text-lg font-black"
                    type="text"
                    name="formTitle"
                    placeholder="제목"
                    value={formTitle}
                    onChange={onTitleChange}
                    autoComplete="off"
                  />
                )}
              </div>
              <input
                type="submit"
                className="p-1 px-2 rounded text-lg font-black text-center shadow-md text-white bg-green-600"
                value="작성"
              />
            </div>
            {selectedIdeas.length > 0 && (
              <SelectedIdeasSlide
                selectedIdeas={selectedIdeas}
                setSelectedIdeas={setSelectedIdeas}
              />
            )}
          </div>

          {/* 텍스트 */}
          <textarea
            className="w-full p-2"
            style={{ minHeight: "500px" }}
            type="text"
            name="formText"
            placeholder="내용..."
            autoComplete="off"
            value={formText}
            onChange={onTextChange}
            required
          />

          {/* category, tags */}
          <div className="px-3 py-2">
            <span className="border-box rounded-3xl border-2 mr-1 mb-1 px-3 py-1 text-xs shadow-sm duration-500">
              {setCategory(formCategory).icon}&nbsp;
              {setCategory(formCategory).label}
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
            <button className="px-2 text-gray-400" onClick={onTagHolderClick}>
              태그 ...
            </button>
          </div>
        </div>
        <BottomBar formSource={formSource} setFormSource={setFormSource} />
      </form>
    </div>
  );
};

export default Writing;
