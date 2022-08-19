import BottomNavigationBar from "routes/BottomNavigationBar";
import StormingTopBar from "./StormingTopBar";
import StormingToggleButton from "./StormingToggleButton";
import StormingTagBar from "./StormingTagBar";
import StormingIdea from "./StormingIdea";
import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import {
  doc,
  increment,
  updateDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
  arrayUnion,
  collectionGroup,
  getDocs,
} from "firebase/firestore";
import dayjs from "dayjs";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Dialog from "@mui/material/Dialog";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCopy,
  faCompass as farCompass,
  faHeart as farHeart,
  faBookmark as farBookmark,
  faThumbsUp,
} from "@fortawesome/free-regular-svg-icons";
import {
  faEllipsis,
  faHashtag,
  faFireFlameCurved,
  faDice,
  faBolt,
  faQuoteLeft,
  faCompass as fasCompass,
  faHeart as fasHeart,
  faBookmark as fasBookmark,
} from "@fortawesome/free-solid-svg-icons";
import FloatingUpButton from "routes/ideas/FloatingUpButton";
import { useRecoilValue } from "recoil";
import { userState } from "atom";

const Storming = ({ ...props }) => {
  const { isLoggedIn, timeDisplay, navValue, setNavValue } = props;

  // original and opened ideas
  const [ideas, setIdeas] = useState([]);

  // get original and opened ideas by quering from collectionGroup
  useEffect(() => {
    if (isLoggedIn) {
      const q1 = query(
        collectionGroup(dbService, "userIdeas"),
        where("isOriginal", "==", true),
        where("isPublic", "==", true),
        orderBy("createdAt", "desc")
      );
      getIdeas(q1);
    }
  }, []);

  const getIdeas = async (query) => {
    const stormingRef = await getDocs(query);
    const newData = stormingRef.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setIdeas(newData);
  };

  return (
    <>
      <BottomNavigationBar navValue={navValue} setNavValue={setNavValue} />
      <StormingTopBar />
      <div className="bg-white min-h-screen pb-14 text-sm">
        <StormingTagBar setIdeas={setIdeas} />
        {ideas.length > 0 ? (
          <div className="pt-2  ">
            {ideas.map((idea, index) => (
              <div key={index} className="bg-white">
                <StormingIdea idea={idea} timeDisplay={timeDisplay} />
              </div>
            ))}
          </div>
        ) : (
          <div className="py-10 flex justify-center text-base font-black text-gray-400 ">
            가장 먼저 아이디어를 남겨주세요 💡
          </div>
        )}
      </div>
    </>
  );
};

export default Storming;
