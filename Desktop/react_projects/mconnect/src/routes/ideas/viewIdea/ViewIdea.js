import "css/Animation.css";
import ViewIdeaTopBar from "./ViewIdeaTopBar";
import ViewIdeaContent from "./ViewIdeaContent";
import ViewIdeaBottom from "./ViewIdeaBottom";
import React, { useState } from "react";
import {} from "fbase";
import {} from "firebase/firestore";
import Skeleton from "@mui/material/Skeleton";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { userState, whatViewState } from "atom";
import { faAd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ViewIdea = ({ ...props }) => {
  const {
    timeDisplay,
    navigate,
    setNavValue,
    viewIdea,
    onBackClick,
    getIdeasFromIDs,
    initEditor,
    isItIn,
    getCount,
    countUpdate,
    onLikeUpdate,
    onBookmarkUpdate,
    onPublicUpdate,
    onDeleteClick,
    toastAlarm,
  } = props;
  const loggedInUser = useRecoilValue(userState);
  const whatView = useRecoilValue(whatViewState);
  const isOwner = loggedInUser.userId === whatView.userId;

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
              onDeleteClick={onDeleteClick}
              toastAlarm={toastAlarm}
            />
            <ViewIdeaContent
              user={loggedInUser}
              itemChangeProps={itemChangeProps}
              isOwner={isOwner}
              timeDisplay={timeDisplay}
              onBackClick={onBackClick}
              getCount={getCount}
              countUpdate={countUpdate}
              onLikeUpdate={onLikeUpdate}
              onBookmarkUpdate={onBookmarkUpdate}
              onPublicUpdate={onPublicUpdate}
            />
          </div>
          <div className="py-6 mt-2 mb-56 bg-stone-600 text-stone-400 text-sm text-center font-black ">
            광고 <FontAwesomeIcon icon={faAd} />
          </div>
          <ViewIdeaBottom
            itemChangeProps={itemChangeProps}
            setItemChangeProps={setItemChangeProps}
            navigate={navigate}
            setNavValue={setNavValue}
            viewIdea={viewIdea}
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
