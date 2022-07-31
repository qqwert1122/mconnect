import "css/Animation.css";
import ViewIdeaTopBar from "./ViewIdeaTopBar";
import ViewIdeaContent from "./ViewIdeaContent";
import ViewIdeaBottom from "./ViewIdeaBottom";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { dbService } from "fbase";
import {
  doc,
  getDoc,
  deleteDoc,
  updateDoc,
  increment,
  query,
  onSnapshot,
  collection,
} from "firebase/firestore";
import Skeleton from "@mui/material/Skeleton";

const ViewIdea = ({ customHooks }) => {
  const timeDisplay = customHooks.timeDisplay;
  const userIdeas = customHooks.userIdeas;
  const user = customHooks.loggedInUser;
  const navigate = customHooks.navigate;
  const colorList = customHooks.colorList;
  const whatView = customHooks.whatView;
  const setWhatView = customHooks.setWhatView;
  const setWhatEdit = customHooks.setWhatEdit;

  const selectedIdeas = customHooks.selectedIdeas;
  const setSelectedIdeas = customHooks.setSelectedIdeas;

  const onBackClick = () => {
    setWhatView(null);
    navigate(-1);
  };

  const [countInfo, setCountInfo] = useState();
  const [isOwner, setIsOwner] = useState(whatView.userId === user.userId);
  const [isDeleted, setIsDeleted] = useState(false);

  const getCountInfo = async () => {
    const countDoc = (
      await getDoc(doc(dbService, "counts", whatView.id))
    ).data();
    if (countDoc === undefined) {
      setCountInfo("delete");
      setIsDeleted(true);
    } else {
      setCountInfo(countDoc);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      getCountInfo();
    }, 1000);
  }, []);

  return (
    <div
      className=" text-sm min-h-screen bg-stone-100"
      style={{ paddingBottom: "52px" }}
    >
      <div className="moveRightToLeft flex-col bg-white shadow">
        {whatView && (
          <ViewIdeaTopBar
            user={user}
            isOwner={isOwner}
            whatView={whatView}
            setWhatEdit={setWhatEdit}
            navigate={navigate}
            onBackClick={onBackClick}
          />
        )}
        {/*제목, 아바타, 시간 */}
        {countInfo ? (
          <ViewIdeaContent
            user={user}
            isOwner={isOwner}
            isDeleted={isDeleted}
            countInfo={countInfo}
            setCountInfo={setCountInfo}
            whatView={whatView}
            setWhatView={setWhatView}
            timeDisplay={timeDisplay}
            onBackClick={onBackClick}
          />
        ) : (
          <div className="p-4 flex-col">
            <div className="flex items-center gap-2">
              <Skeleton variant="circular" width={30} height={30} />
              <Skeleton variant="text" width={120} height={30} />
            </div>
            <Skeleton variant="text" width={320} height={160} />
          </div>
        )}
      </div>
      {whatView && (
        <ViewIdeaBottom
          userIdeas={userIdeas}
          navigate={navigate}
          onBackClick={onBackClick}
          whatView={whatView}
          setWhatView={setWhatView}
          colorList={colorList}
          selectedIdeas={selectedIdeas}
          setSelectedIdeas={setSelectedIdeas}
        />
      )}
    </div>
  );
};

export default ViewIdea;
