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
  faAd,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import FloatingUpButton from "routes/ideas/FloatingUpButton";
import { useRecoilValue } from "recoil";
import { userState } from "atom";
import Slider from "react-slick";

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

  const settings = {
    dots: true,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToScroll: 1,
    centerMode: true,
    focusOnSelect: true,
    initialSlide: 0,
  };

  return (
    <>
      <BottomNavigationBar navValue={navValue} setNavValue={setNavValue} />
      <StormingTopBar />
      <div className="bg-stone-100 min-h-screen pb-14 text-sm">
        <div className="text-center mt-14 pt-6 pb-2 pl-4 font-black text-base">
          이번 주 추천 아이디어 👍
        </div>
        <ul className={`pb-10`}>
          <Slider {...settings}>
            <div className="relative">
              <div className="h-60 p-5 m-1 mx-2 bg-white shadow-md rounded-3xl break-all text-xs">
                <div className="mb-2 truncate font-black text-sm">Title</div>

                <div className="mb-3 line-clamp-6">Text</div>

                <div className="ml-2 mb-1 flex gap-1 text-stone-400">
                  <FontAwesomeIcon icon={faQuoteLeft} />
                  <span>Source</span>
                </div>

                <div className="absolute bottom-4 left-4 flex items-center gap-2 text-xs">
                  <Avatar
                    className="border-2"
                    alt="avatar"
                    sx={{
                      display: "flex",
                      width: "25px",
                      height: "25px",
                    }}
                  />
                  <div className="flex-col">
                    <span className="flex">Name</span>
                    <span className="flex text-stone-400">CreateAt</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="h-60 p-5 m-1 mx-2 bg-white shadow-md rounded-3xl break-all text-xs">
                <div className="mb-2 truncate font-black text-sm">Title</div>

                <div className="mb-3 line-clamp-6">Text</div>

                <div className="ml-2 mb-1 flex gap-1 text-stone-400">
                  <FontAwesomeIcon icon={faQuoteLeft} />
                  <span>Source</span>
                </div>

                <div className="absolute bottom-4 left-4 flex items-center gap-2 text-xs">
                  <Avatar
                    className="border-2"
                    alt="avatar"
                    sx={{
                      display: "flex",
                      width: "25px",
                      height: "25px",
                    }}
                  />
                  <div className="flex-col">
                    <span className="flex">Name</span>
                    <span className="flex text-stone-400">CreateAt</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="h-60 p-5 m-1 mx-2 bg-white shadow-md rounded-3xl break-all text-xs">
                <div className="mb-2 truncate font-black text-sm">Title</div>

                <div className="mb-3 line-clamp-6">Text</div>

                <div className="ml-2 mb-1 flex gap-1 text-stone-400">
                  <FontAwesomeIcon icon={faQuoteLeft} />
                  <span>Source</span>
                </div>

                <div className="absolute bottom-4 left-4 flex items-center gap-2 text-xs">
                  <Avatar
                    className="border-2"
                    alt="avatar"
                    sx={{
                      display: "flex",
                      width: "25px",
                      height: "25px",
                    }}
                  />
                  <div className="flex-col">
                    <span className="flex">Name</span>
                    <span className="flex text-stone-400">CreateAt</span>
                  </div>
                </div>
              </div>
            </div>
          </Slider>
        </ul>
        <StormingTagBar setIdeas={setIdeas} />

        {ideas.length > 0 ? (
          <>
            {ideas.map((idea, index) => (
              <div key={index} className="my-2">
                {index % 7 === 6 ? (
                  <div className="py-6 bg-stone-600 text-stone-400 text-sm text-center font-black ">
                    광고 <FontAwesomeIcon icon={faAd} />
                  </div>
                ) : (
                  <div key={index} className="bg-white">
                    <StormingIdea idea={idea} timeDisplay={timeDisplay} />
                  </div>
                )}
              </div>
            ))}
          </>
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
