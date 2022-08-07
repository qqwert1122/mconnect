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
  query,
  where,
  doc,
  setDoc,
  getDocs,
  documentId,
  increment,
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
  const userIdeas = customHooks.userIdeas;
  const user = customHooks.loggedInUser;
  const navigate = customHooks.navigate;
  const whatView = customHooks.whatView;
  const setWhatView = customHooks.setWhatView;
  const whatEdit = customHooks.whatEdit;
  const setWhatEdit = customHooks.setWhatEdit;
  const selectedIdeas = customHooks.selectedIdeas;
  const setSelectedIdeas = customHooks.setSelectedIdeas;
  const tagList = customHooks.tagList;
  const sourceList = customHooks.sourceList;
  const colorList = customHooks.colorList;

  // form
  const [formTitle, setFormTitle] = useState("");
  const [formText, setFormText] = useState("");
  const [formSource, setFormSource] = useState("");
  const [formTag, setFormTag] = useState("");
  const [formTags, setFormTags] = useState([]);
  const [formConnectedIdeas, setFormConnectedIdeas] = useState([]);
  const [formPublic, setFormPublic] = useState(false);

  const getConncetedIdeas = async (ids) => {
    const q1 = query(
      collection(dbService, "users", user.userId, "userIdeas"),
      where(documentId(), "in", ids)
    );
    const ideaRef = await getDocs(q1);
    const newData = ideaRef.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setFormConnectedIdeas(newData);
  };

  useEffect(() => {
    if (whatEdit === undefined) {
      if (selectedIdeas.length > 1) {
        const tempoInputTagList = [];
        for (var a in selectedIdeas) {
          for (var b in selectedIdeas[a].tags) {
            if (tempoInputTagList.includes(selectedIdeas[a].tags[b])) {
            } else {
              tempoInputTagList.push(selectedIdeas[a].tags[b]);
            }
          }
        }
        setFormTags(tempoInputTagList);
        setFormConnectedIdeas(selectedIdeas);
      }
    } else {
      if (whatEdit.connectedIdeas.length > 0) {
        getConncetedIdeas(whatEdit.connectedIdeas);
      }
      setFormTitle(whatEdit.title);
      setFormText(whatEdit.text);
      setFormSource(whatEdit.source);
      setFormTags(whatEdit.tags);
      setFormPublic(whatEdit.isPublic);
    }
  }, []);

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
    const connectedIdeasId = formConnectedIdeas.map((idea) => idea.id);
    if (whatEdit === undefined) {
      try {
        if (selectedIdeas.length >= 2 && formConnectedIdeas.length < 2) {
          toast.error("아이디어 2개 이상을 선택하세요", {
            theme: "colored",
          });
          return;
        }
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
          userName: user.userName,
          userPhotoURL: user.userPhotoURL,
          title: formTitle,
          text: formText,
          source: formSource,
          tags: formTags,
          connectedIdeas: connectedIdeasId,
          createdAt: dayjs().format("YYYY. MM. DD. HH:mm:ss"),
          updatedAt: dayjs().format("YYYY. MM. DD. HH:mm:ss"),
          isPublic: formPublic,
          isLiked: false,
          isBookmarked: false,
          isViewed: false,
          isDeleted: false,
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
        const userRef = doc(dbService, "users", user.userId);
        await updateDoc(userRef, {
          idea_count: increment(1),
        });
      } catch (event) {
        console.error("Error adding document: ", event);
      }
      setSelectedIdeas([]);
      navigate(-1);
    } else {
      try {
        if (
          whatEdit.connectedIdeas.length >= 2 &&
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
          `${whatEdit.id}`
        );
        await updateDoc(ideaRef, {
          ...whatEdit,
          title: formTitle,
          text: formText,
          source: formSource,
          tags: formTags,
          isPublic: formPublic,
          connectedIdeas: connectedIdeasId,
          updatedAt: dayjs().format("YYYY. MM. DD. HH:mm:ss"),
        });
      } catch (event) {
        console.error("Error editing document: ", event);
      }
      setWhatEdit();
      navigate(-1);
    }
  };

  return (
    <div className="flex-col text-sm">
      <form onSubmit={onSubmit}>
        <WritingTopBar
          navigate={navigate}
          whatEdit={whatEdit}
          setWhatEdit={setWhatEdit}
          formTitle={formTitle}
          setFormTitle={setFormTitle}
          formConnectedIdeas={formConnectedIdeas}
          selectedIdeas={selectedIdeas}
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
          userIdeas={userIdeas}
          setWhatView={setWhatView}
          whatEdit={whatEdit}
          navigate={navigate}
          formSource={formSource}
          setFormSource={setFormSource}
          formTag={formTag}
          setFormTag={setFormTag}
          formTags={formTags}
          setFormTags={setFormTags}
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
