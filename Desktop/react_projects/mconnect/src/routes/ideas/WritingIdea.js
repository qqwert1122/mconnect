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
import { ToastContainer, toast } from "react-toastify";
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

const WritingIdea = ({ customHooks }) => {
  const user = authService.currentUser;
  const selectedIdeas = customHooks.selectedIdeas;
  const setSelectedIdeas = customHooks.setSelectedIdeas;
  const tagList = customHooks.tagList;
  const sourceList = customHooks.sourceList;
  const setCategory = customHooks.setCategory;
  const colorList = customHooks.colorList;
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
    if (e.target.value === " ") {
      setFormTitle("");
    } else {
      setFormTitle(e.target.value);
    }
  };
  const onTextChange = (e) => {
    if (e.target.value === " ") {
      setFormText("");
    } else {
      setFormText(e.target.value);
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;

    if (formCategory > 0 && selectedIdeas.length < 2) {
      toast.error("아이디어 2개 이상을 선택하세요", {
        theme: "colored",
      });
      return;
    } else {
      try {
        await addDoc(collection(dbService, "ideas"), {
          category: formCategory,
          title: formTitle,
          text: formText,
          source: formSource,
          tags: formTags,
          like: false,
          bookmark: false,
          public: formPublic,
          connectedIdeas: selectedIdeas,
          likeUsers: [],
          isClicked: false,
          createdAt: dayjs().format("YYYY. MM. DD. HH:mm"),
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
    }
  };

  return (
    <div className="opening flex-col text-sm">
      <form onSubmit={onSubmit}>
        <div className="fixed top-0 w-full z-20 p-3 flex justify-between items-center shadow bg-white">
          <div className="flex gap-4">
            <button onClick={onBackClick}>
              <FontAwesomeIcon icon={faAngleLeft} size="lg" />
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
            className="p-1 px-2 rounded font-black text-center shadow-md text-white bg-green-600"
            value="작성"
          />
        </div>
        {/* 텍스트 */}
        <textarea
          className="w-full p-4"
          style={{ height: "calc(100vh - 104px)", marginTop: "52px" }}
          type="text"
          name="formText"
          placeholder="내용..."
          autoComplete="off"
          value={formText}
          onChange={onTextChange}
          required
        />
        <BottomBar
          formSource={formSource}
          setFormSource={setFormSource}
          formTag={formTag}
          setFormTag={setFormTag}
          formTags={formTags}
          setFormTags={setFormTags}
          setCategory={setCategory}
          formCategory={formCategory}
          selectedIdeas={selectedIdeas}
          setSelectedIdeas={setSelectedIdeas}
          tagList={tagList}
          formPublic={formPublic}
          setFormPublic={setFormPublic}
          sourceList={sourceList}
          colorList={colorList}
        />
      </form>
      <ToastContainer
        className="black-background"
        position="bottom-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default WritingIdea;
