import "css/Animation.css";
import ViewIdeaTopBar from "./ViewIdeaTopBar";
import ViewIdeaContent from "./ViewIdeaContent";
import ViewIdeaBottom from "./ViewIdeaBottom";
import React, { useEffect, useState, useRef } from "react";
import { dbService } from "fbase";
import {
  doc,
  getDoc,
  updateDoc,
  increment,
  query,
  onSnapshot,
  collection,
  where,
  getDocs,
  documentId,
} from "firebase/firestore";
import Skeleton from "@mui/material/Skeleton";
import { useRecoilValue, useRecoilState, useResetRecoilState } from "recoil";
import { userState, whatViewState } from "atom";

const ViewIdea = ({ ...props }) => {
  const {
    timeDisplay,
    navigate,
    isOwner,
    getIdeasFromIDs,
    initEditor,
    isItIn,
  } = props;
  const loggedInUser = useRecoilValue(userState);
  const whatView = useRecoilValue(whatViewState);
  const clearWhatView = useResetRecoilState(whatViewState);

  const onBackClick = () => {
    clearWhatView();
    navigate(-1);
  };

  // tab state
  const [itemChangeProps, setItemChangeProps] = useState(0);

  return (
    <>
      {whatView ? (
        <div
          className="pt-12 text-sm min-h-screen bg-stone-100"
          style={{ paddingBottom: "52px" }}
        >
          <div className="flex-col bg-white shadow">
            <ViewIdeaTopBar
              user={loggedInUser}
              isOwner={isOwner}
              navigate={navigate}
              initEditor={initEditor}
              onBackClick={onBackClick}
            />
            <ViewIdeaContent
              user={loggedInUser}
              itemChangeProps={itemChangeProps}
              isOwner={isOwner}
              timeDisplay={timeDisplay}
              onBackClick={onBackClick}
            />
          </div>
          <ViewIdeaBottom
            itemChangeProps={itemChangeProps}
            setItemChangeProps={setItemChangeProps}
            navigate={navigate}
            getIdeasFromIDs={getIdeasFromIDs}
            isItIn={isItIn}
          />
        </div>
      ) : (
        <div className="p-4 flex-col">
          <div className="flex items-center gap-2">
            <Skeleton variant="circular" width={30} height={30} />
            <Skeleton variant="text" width={120} height={30} />
          </div>
          <Skeleton variant="text" width={320} height={160} />
        </div>
      )}
    </>
  );
};

export default ViewIdea;
