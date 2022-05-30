import "css/Writing.css";
import WritingTopBar from "./WritingTopBar";
import WritingBottom from "./WritingBottom";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService, dbService } from "fbase";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
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
  const user = authService.currentUser;
  const userContext = customHooks.userContext;
  const setUserContext = customHooks.setUserContext;
  const setNavValue = customHooks.setNavValue;
  const viewIdea = customHooks.viewIdea;
  const setViewIdea = customHooks.setViewIdea;
  const selectedIdeas = customHooks.selectedIdeas;
  const setSelectedIdeas = customHooks.setSelectedIdeas;
  const tagList = customHooks.tagList;
  const sourceList = customHooks.sourceList;
  const getCategory = customHooks.getCategory;
  const colorList = customHooks.colorList;
  let navigate = useNavigate();

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
    switch (userContext) {
      case 0:
        if (selectedIdeas.length === 0) {
          setFormConnectedIdeas([]);
          setFormCategory(0);
        } else {
          setFormConnectedIdeas(selectedIdeas);
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
        break;
      case 1:
      case 2:
        setFormCategory(viewIdea.category);
        setFormTitle(viewIdea.title);
        setFormText(viewIdea.text);
        setFormSource(viewIdea.source);
        setFormTags(viewIdea.tags);
        setFormConnectedIdeas(viewIdea.connectedIdeas);
        setFormPublic(viewIdea.public);
        break;
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

    if (formCategory > 0 && formConnectedIdeas.length < 2) {
      toast.error("아이디어 2개 이상을 선택하세요", {
        theme: "colored",
      });
      return;
    } else {
      switch (userContext) {
        case 0:
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
              connectedIdeas: formConnectedIdeas,
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
          setSelectedIdeas([]);
          navigate("/ideas", { replace: true });
          break;
        case 1:
        case 2:
          try {
            const ideaRef = doc(dbService, "ideas", `${viewIdea.id}`);
            await updateDoc(ideaRef, {
              ...viewIdea,
              category: formCategory,
              title: formTitle,
              text: formText,
              source: formSource,
              tags: formTags,
              public: formPublic,
              connectedIdeas: formConnectedIdeas,
            });
          } catch (event) {
            console.error("Error editing document: ", event);
          }
      }
    }
  };

  return (
    <div className="opening flex-col text-sm">
      <form onSubmit={onSubmit}>
        <WritingTopBar
          userContext={userContext}
          setUserContext={setUserContext}
          setNavValue={setNavValue}
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
          setNavValue={setNavValue}
          formSource={formSource}
          setFormSource={setFormSource}
          formTag={formTag}
          setFormTag={setFormTag}
          formTags={formTags}
          setFormTags={setFormTags}
          getCategory={getCategory}
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
