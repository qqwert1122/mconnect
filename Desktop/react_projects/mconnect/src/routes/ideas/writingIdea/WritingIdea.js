import "css/Writing.css";
import "css/Animation.css";
import WritingTopBar from "./WritingTopBar";
import WritingBottom from "./WritingBottom";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService, dbService } from "fbase";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  setDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { v4 } from "uuid";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {} from "@fortawesome/free-regular-svg-icons";
import {} from "@fortawesome/free-solid-svg-icons";

var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);
var customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);
dayjs.locale("ko");

const WritingIdea = ({ customHooks }) => {
  const dbIdeas = customHooks.dbIdeas;
  const user = customHooks.loggedInUser;
  const userContext = customHooks.userContext;
  const setUserContext = customHooks.setUserContext;
  const navigate = customHooks.navigate;
  const viewIdea = customHooks.viewIdea;
  const setViewIdea = customHooks.setViewIdea;
  const selectedIdeas = customHooks.selectedIdeas;
  const setSelectedIdeas = customHooks.setSelectedIdeas;
  const tagList = customHooks.tagList;
  const sourceList = customHooks.sourceList;
  const colorList = customHooks.colorList;

  // form
  const [formTitle, setFormTitle] = useState("");
  const [formCategory, setFormCategory] = useState(0);
  const [formText, setFormText] = useState("");
  const [formSource, setFormSource] = useState("");
  const [formTag, setFormTag] = useState("");
  const [formTags, setFormTags] = useState([]);
  const [formConnectedIdeas, setFormConnectedIdeas] = useState([]);
  const [formPublic, setFormPublic] = useState(false);

  useEffect(() => {
    if (viewIdea != null) {
      setFormTitle(viewIdea.title);
      setFormText(viewIdea.text);
      setFormSource(viewIdea.source);
      setFormTags(viewIdea.tags);
      setFormConnectedIdeas(viewIdea.connectedIdeas);
      setFormPublic(viewIdea.public);
    }
  }, [selectedIdeas]);

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

    if (viewIdea != null) {
      try {
        if (
          viewIdea.connectedIdeas.length >= 2 &&
          formConnectedIdeas.length < 2
        ) {
          toast.error("아이디어 2개 이상을 선택하세요", {
            theme: "colored",
          });
          return;
        }
        const ideaRef = doc(
          dbService,
          "users",
          user.userId,
          "userIdeas",
          `${viewIdea.id}`
        );
        await updateDoc(ideaRef, {
          ...viewIdea,
          title: formTitle,
          text: formText,
          source: formSource,
          tags: formTags,
          isPublic: formPublic,
          connectedIdeas: formConnectedIdeas,
          updatedAt: dayjs().format("YYYY. MM. DD. HH:mm:ss"),
        });
      } catch (event) {
        console.error("Error editing document: ", event);
      }
      setViewIdea(null);
      navigate("/ideas");
    } else {
      try {
        const newIdeaId = v4();
        const newUserIdeaRef = doc(
          dbService,
          "users",
          user.userId,
          "userIdeas",
          newIdeaId
        );
        await setDoc(newUserIdeaRef, {
          userId: user.userId,
          title: formTitle,
          text: formText,
          source: formSource,
          tags: formTags,
          connectedIdeas: formConnectedIdeas,
          createdAt: dayjs().format("YYYY. MM. DD. HH:mm:ss"),
          updatedAt: dayjs().format("YYYY. MM. DD. HH:mm:ss"),
          isPublic: false,
        });
        const newCountRef = doc(dbService, "counts", newIdeaId);
        await setDoc(newCountRef, {
          like_count: 0,
          like_users: {},
          bookmark_count: 0,
          bookmark_users: {},
          view_count: 0,
          view_users: {},
        });
      } catch (event) {
        console.error("Error adding document: ", event);
      }
      setSelectedIdeas([]);
      navigate("/ideas");
    }
  };

  return (
    <div className="flex-col text-sm">
      <form onSubmit={onSubmit}>
        <WritingTopBar
          userContext={userContext}
          setUserContext={setUserContext}
          navigate={navigate}
          setViewIdea={setViewIdea}
          formCategory={formCategory}
          formTitle={formTitle}
          setFormTitle={setFormTitle}
        />
        <textarea
          className="w-full p-4 text-base"
          style={{ height: "calc(100vh - 104px)", marginTop: "52px" }}
          type="text"
          name="formText"
          placeholder="내용..."
          autoComplete="off"
          value={formText}
          onChange={onTextChange}
          required
        />
        <WritingBottom
          dbIdeas={dbIdeas}
          userContext={userContext}
          setViewIdea={setViewIdea}
          navigate={navigate}
          formSource={formSource}
          setFormSource={setFormSource}
          formTag={formTag}
          setFormTag={setFormTag}
          formTags={formTags}
          setFormTags={setFormTags}
          formCategory={formCategory}
          formConnectedIdeas={formConnectedIdeas}
          setFormConnectedIdeas={setFormConnectedIdeas}
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
