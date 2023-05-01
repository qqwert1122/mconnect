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
  collectionGroup,
} from "firebase/firestore";
import Skeleton from "@mui/material/Skeleton";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { userState } from "atom";
import { faAd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import UserList from "./UserList";

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

  const [isMount, setIsMount] = useState(false);
  const [itemChangeProps, setItemChangeProps] = useState(0);
  const [count, setCount] = useState({});
  const [content, setContent] = useState({});
  const [isDeleted, setIsDeleted] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
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
    const contentData = (await getDoc(contentRef)).data();
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
      if (contentData !== undefined) {
        await updateDoc(contentRef, {
          isViewed: true,
        });
      }
    } else if (countData === undefined || countData === null) {
      setIsDeleted(true);
    }
    setCount(countData);
    setIsDeleted(false);

    if (contentData === undefined) {
      const q = query(
        collectionGroup(dbService, "userIdeas"),
        where("docId", "==", docId)
      );
      await getDocs(q).then((snapshot) => {
        snapshot.forEach((doc) => {
          setContent(doc.data());
        });
      });
    } else {
      setContent(contentData);
    }
    setIsMount(true);
  };

  const [open, setOpen] = useState(false);

  // Ellipsis Menu
  const handleEllipsisClick = () => {
    setItemChangeProps(0);
    setOpen(true);
  };

  const handleEllipsisClose = () => {
    setOpen(false);
    setTabs(0);
  };

  const [tabs, setTabs] = useState(0);
  const handleTabs = (v) => {
    setTabs(v);
  };

  const loading = (
    <div className="w-screen h-screen flex justify-center items-center mx-auto bg-white">
      <div className="flex justify-center text-center">
        <CircularProgress color="inherit" />
      </div>
    </div>
  );

  return (
    <div className="h-screen bg-stone-100">
      {isMount ? (
        <>
          <div
            className={` ${
              (itemChangeProps != 0 || open) && "brightness-75 blur-sm"
            } duration-500 bg-stone-100`}
          >
            <div className="flex-col pt-12 bg-white shadow">
              <ViewIdeaTopBar
                content={content}
                isOwner={loggedInUser.userId === content.userId}
                navigate={navigate}
                initEditor={initEditor}
                onDeleteClick={onDeleteClick}
                toastAlarm={toastAlarm}
              />
              <ViewIdeaContent
                navigate={navigate}
                user={loggedInUser}
                handleEllipsisClick={handleEllipsisClick}
                itemChangeProps={itemChangeProps}
                isOwner={loggedInUser.userId === content.userId}
                timeDisplay={timeDisplay}
                count={count}
                setCount={setCount}
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
            open={open}
            setOpen={setOpen}
            setIsMount={setIsMount}
            content={content}
            itemChangeProps={itemChangeProps}
            setItemChangeProps={setItemChangeProps}
            setNavValue={setNavValue}
            viewIdea={viewIdea}
            getIdeasFromIDs={getIdeasFromIDs}
            isItIn={isItIn}
          />

          <UserList
            open={open}
            handleEllipsisClose={handleEllipsisClose}
            tabs={tabs}
            handleTabs={handleTabs}
            count={count}
          />
        </>
      ) : (
        loading
      )}
    </div>
  );
};

export default ViewIdea;
