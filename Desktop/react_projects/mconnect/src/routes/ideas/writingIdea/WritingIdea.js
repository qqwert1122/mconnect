import "css/Writing.css";
import "css/Animation.css";
import WritingTopBar from "./WritingTopBar";
import WritingBottom from "./WritingBottom";
import React, { useState } from "react";
import algoliasearch from "algoliasearch";
import { dbService } from "fbase";
import { updateDoc, doc, setDoc, increment } from "firebase/firestore";
import { v4 } from "uuid";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ToastContainer, toast } from "react-toastify";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import {
  userState,
  formTitleState,
  formTextState,
  formSourceState,
  formTagsState,
  formCnctedIdeasState,
  isEditState,
  whatEditState,
  recentTagsState,
  recentSourcesState,
  selectedIdeasState,
  formPublicState,
  ideasState,
} from "atom";

var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);
var customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);
dayjs.locale("ko");
const APP_ID = process.env.REACT_APP_ALGOLIA_APP_ID;
const API_KEY = process.env.REACT_APP_ALGOLIA_API_KEY;

const client = algoliasearch(APP_ID, API_KEY);
const index = client.initIndex("userIdeas");

const WritingIdea = ({ ...props }) => {
  const {
    navigate,
    setNavValue,
    viewIdea,
    isItIn,
    trends,
    onBackClick,
    toastAlarm,
  } = props;
  const loggedInUser = useRecoilValue(userState);
  const whatEdit = useRecoilValue(whatEditState);
  const isEdit = useRecoilValue(isEditState);
  const formTitle = useRecoilValue(formTitleState);
  const [formText, setFormText] = useRecoilState(formTextState);
  const formSource = useRecoilValue(formSourceState);
  const formTags = useRecoilValue(formTagsState);
  const formPublic = useRecoilValue(formPublicState);
  const formCnctedIdeas = useRecoilValue(formCnctedIdeasState);
  const [recentTags, setRecentTags] = useRecoilState(recentTagsState);
  const [recentSources, setRecentSources] = useRecoilState(recentSourcesState);
  const [ideas, setIdeas] = useRecoilState(ideasState);
  const [selectedIdeas, setSelectedIdeas] = useRecoilState(selectedIdeasState);

  const clearEdit = useResetRecoilState(isEditState);

  const isCnctnRequired = isEdit
    ? whatEdit.connectedIDs.length >= 2 && formCnctedIdeas.length < 2
    : selectedIdeas.length >= 2 && formCnctedIdeas.length < 2;

  const showTitleAndCnctn =
    (!isEdit && selectedIdeas.length > 1) ||
    (isEdit && whatEdit.connectedIDs.length > 1);

  const MAX_LENGTH = 10;

  const arrangeRecentSources = (_source) => {
    if (_source !== "") {
      const tempSources = [
        _source,
        ...recentSources.filter((source) => source !== _source),
      ];
      setRecentSources(tempSources.filter((e, i) => i < MAX_LENGTH));
    }
  };

  const arrangeRecentTags = (_tags) => {
    var tempTags = [..._tags];
    recentTags.forEach((element) => {
      if (tempTags.includes(element) === false) {
        tempTags.push(element);
      }
    });
    setRecentTags(tempTags.filter((e, i) => i < MAX_LENGTH));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const connectedIdeasId = formCnctedIdeas.map((idea) => idea.docId);
    if (isEdit) {
      // UPDATE
      const document = {
        ...whatEdit,
        title: formTitle,
        text: formText,
        source: formSource,
        tags: formTags,
        isPublic: formPublic,
        connectedIDs: connectedIdeasId,
        updatedAt: dayjs().format("YYYY. MM. DD. HH:mm:ss"),
      };
      try {
        if (isCnctnRequired) {
          toast.error("아이디어를 2개 이상 선택하세요", {
            theme: "colored",
          });
          return;
        }
        const ideaRef = doc(
          dbService,
          "users",
          loggedInUser.userId,
          "userIdeas",
          `${whatEdit.docId}`
        );
        await updateDoc(ideaRef, { ...document });
        setIdeas(
          ideas.map((m) => (m.docId === whatEdit.docId ? { ...document } : m))
        );
        index.saveObject({ ...document, objectID: whatEdit.docId });
      } catch (event) {
        console.error("Error editing document: ", event);
      }
    } else {
      // CREATE
      const newIdeaId = v4();
      const _document = {
        docId: newIdeaId,
        userId: loggedInUser.userId,
        userName: loggedInUser.userName,
        userPhotoURL: loggedInUser.userPhotoURL,
        title: formTitle,
        text: formText,
        source: formSource,
        tags: formTags,
        connectedIDs: connectedIdeasId,
        createdAt: dayjs().format("YYYY. MM. DD. HH:mm:ss"),
        updatedAt: dayjs().format("YYYY. MM. DD. HH:mm:ss"),
      };
      const document = {
        ..._document,
        searchId: newIdeaId,
        isPublic: formPublic,
        isLiked: false,
        isBookmarked: false,
        isViewed: false,
        isOriginal: true,
      };
      try {
        if (isCnctnRequired) {
          toast.error("아이디어를 2개 이상 선택하세요", {
            theme: "colored",
          });
          return;
        }
        const newUserIdeaRef = doc(
          dbService,
          "users",
          loggedInUser.userId,
          "userIdeas",
          newIdeaId
        );
        await setDoc(newUserIdeaRef, { ...document });
        const newCountRef = doc(dbService, "counts", newIdeaId);
        await setDoc(newCountRef, {
          like_count: 0,
          like_users: {},
          bookmark_count: 0,
          bookmark_users: {},
          view_count: 0,
          view_users: {},
        });
        const userRef = doc(dbService, "users", loggedInUser.userId);
        await updateDoc(userRef, {
          idea_count: increment(1),
        });
        setIdeas([{ ...document }, ...ideas]);
        index.saveObject({
          ..._document,
          isPublic: formPublic,
          objectID: newIdeaId,
        });
      } catch (event) {
        console.error("Error adding document: ", event);
      }
      setSelectedIdeas([]);
      toastAlarm("new");
    }
    clearEdit();
    arrangeRecentSources(formSource);
    arrangeRecentTags(formTags);
    navigate(-1);
  };

  const onTextChange = (e) => {
    if (e.target.value === " ") {
      setFormText("");
    } else {
      setFormText(e.target.value);
    }
  };

  const [bottomItemChangeProps, setBottomItemChangeProps] = useState(0);
  const handleTabClose = (e) => {
    e.preventDefault();
    setBottomItemChangeProps(0);
  };

  return (
    <div className="flex-col text-sm">
      <form onSubmit={onSubmit}>
        <WritingTopBar
          onBackClick={onBackClick}
          showTitleAndCnctn={showTitleAndCnctn}
        />
        <textarea
          className="w-full p-4 text-base"
          style={{ height: "calc(100vh - 104px)", marginTop: "52px" }}
          type="text"
          name="formText"
          placeholder="내용..."
          autoComplete="off"
          value={formText}
          onClick={handleTabClose}
          onChange={onTextChange}
          required
        />
        <WritingBottom
          navigate={navigate}
          setNavValue={setNavValue}
          viewIdea={viewIdea}
          showTitleAndCnctn={showTitleAndCnctn}
          bottomItemChangeProps={bottomItemChangeProps}
          setBottomItemChangeProps={setBottomItemChangeProps}
          handleTabClose={handleTabClose}
          isItIn={isItIn}
          trends={trends}
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
