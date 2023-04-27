import "css/Animation.css";
import ViewIdeaTopBar from "./ViewIdeaTopBar";
import ViewIdeaContent from "./ViewIdeaContent";
import ViewIdeaBottom from "./ViewIdeaBottom";
import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
  doc,
  getDocs,
  getDoc,
  updateDoc,
  increment,
  deleteDoc,
  limit,
  startAfter,
} from "firebase/firestore";
import Skeleton from "@mui/material/Skeleton";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { userState } from "atom";
import { faAd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

const ViewIdea = ({ ...props }) => {
  const {
    timeDisplay,
    setNavValue,
    viewIdea,
    getIdeasFromIDs,
    initEditor,
    isItIn,
    countUpdate,
    onLikeUpdate,
    onBookmarkUpdate,
    onPublicUpdate,
    onDeleteClick,
    toastAlarm,
    index,
  } = props;
  const loggedInUser = useRecoilValue(userState);
  const { docId } = useParams();

  const [isVisible, setIsVisible] = useState(false);
  const [isMount, setIsMount] = useState(false);
  const [itemChangeProps, setItemChangeProps] = useState(0);
  const [count, setCount] = useState({});
  const [content, setContent] = useState({});
  const [isDeleted, setIsDeleted] = useState(false);
  const [isOwner, setIsOwner] = useState();

  let navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
    getData();
  }, [docId]);

  const getData = async () => {
    // get content from db
    const countRef = doc(dbService, "counts", docId);
    const countData = (await getDoc(countRef)).data();
    const contentRef = doc(
      dbService,
      "users",
      loggedInUser.userId,
      "userIdeas",
      docId
    );
    if (
      countData !== undefined &&
      countData.view_users.hasOwnProperty(loggedInUser.userId) === false
    ) {
      await updateDoc(countRef, {
        view_count: increment(1),
        view_users: {
          ...countData.view_users,
          [loggedInUser.userId]: loggedInUser.userName,
        },
      });
      await updateDoc(contentRef, {
        isViewed: true,
      });
    } else if (countData === undefined || countData === null) {
      setIsDeleted(true);
    }
    setCount(countData);
    setIsDeleted(false);

    // get count from db
    const contentData = (await getDoc(contentRef)).data();
    setContent(contentData);

    setIsMount(true);
    setIsOwner(loggedInUser.userId === content.userId);
  };

  const loading = (
    <div className="w-screen h-screen flex justify-center items-center mx-auto bg-white">
      <div className="flex-col">
        <div className="flex justify-center text-center">
          <CircularProgress color="inherit" />
        </div>
        <div className="flex justify-center mt-6 text-base font-black">
          로딩중
        </div>
      </div>
    </div>
  );

  return (
    <div
      className={`page ${
        isVisible ? "visible" : ""
      } bg-stone-100 duration-500 `}
    >
      {isMount ? (
        <div className="text-sm" style={{ paddingBottom: "52px" }}>
          <div
            className={` ${
              itemChangeProps != 0 && "brightness-75 blur-sm"
            } duration-500 bg-stone-100`}
          >
            <div className="flex-col pt-12 bg-white shadow">
              <ViewIdeaTopBar
                content={content}
                isOwner={isOwner}
                navigate={navigate}
                setIsVisible={setIsVisible}
                initEditor={initEditor}
                onDeleteClick={onDeleteClick}
                toastAlarm={toastAlarm}
              />
              <ViewIdeaContent
                isMount={isMount}
                navigate={navigate}
                setIsVisible={setIsVisible}
                index={index}
                user={loggedInUser}
                itemChangeProps={itemChangeProps}
                isOwner={isOwner}
                timeDisplay={timeDisplay}
                count={count}
                content={content}
                setContent={setContent}
                isDeleted={isDeleted}
                countUpdate={countUpdate}
                onLikeUpdate={onLikeUpdate}
                onBookmarkUpdate={onBookmarkUpdate}
                onPublicUpdate={onPublicUpdate}
              />
            </div>
            <div className="py-6 mt-2 mb-56 bg-stone-600 text-stone-400 text-sm text-center font-black ">
              광고 <FontAwesomeIcon icon={faAd} />
            </div>
          </div>

          <ViewIdeaBottom
            content={content}
            itemChangeProps={itemChangeProps}
            setItemChangeProps={setItemChangeProps}
            setNavValue={setNavValue}
            viewIdea={viewIdea}
            getIdeasFromIDs={getIdeasFromIDs}
            isItIn={isItIn}
          />
        </div>
      ) : (
        loading
      )}
    </div>
  );
};

export default ViewIdea;
