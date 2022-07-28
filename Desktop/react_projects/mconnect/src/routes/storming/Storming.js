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

const Storming = ({ customHooks }) => {
  const timeDisplay = customHooks.timeDisplay;
  const user = customHooks.loggedInUser;

  const [ideasPublic, setIdeasPublic] = useState([]);

  const getDocuments = async (query) => {
    const stormingRef = await getDocs(query);
    const newData = stormingRef.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setIdeasPublic(newData);
  };

  useEffect(() => {
    if (customHooks.isLoggedIn) {
      const q1 = query(
        collectionGroup(dbService, "userIdeas"),
        where("isPublic", "==", true),
        orderBy("createdAt", "desc")
      );
      getDocuments(q1);
    }
  }, []);

  return (
    <>
      <BottomNavigationBar customHooks={customHooks} />
      <StormingTopBar />
      <div className="bg-stone-100 pb-14 text-sm">
        {/* <StormingToggleButton /> */}
        <StormingTagBar />

        <div className="pt-2 min-h-screen bg-white">
          {ideasPublic.map((idea, index) => (
            <div key={index} className="bg-white">
              <StormingIdea user={user} idea={idea} timeDisplay={timeDisplay} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Storming;
