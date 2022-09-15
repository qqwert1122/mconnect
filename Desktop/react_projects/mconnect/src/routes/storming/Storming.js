import BottomNavigationBar from "routes/BottomNavigationBar";
import StormingTopBar from "./StormingTopBar";
import StormingTagBar from "./StormingTagBar";
import StormingIdea from "./StormingIdea";
import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import {
  query,
  orderBy,
  where,
  collectionGroup,
  getDocs,
  collection,
} from "firebase/firestore";
import Avatar from "@mui/material/Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {} from "@fortawesome/free-regular-svg-icons";
import {
  faQuoteLeft,
  faAd,
  faFireFlameCurved,
} from "@fortawesome/free-solid-svg-icons";
import Slider from "react-slick";

const Storming = ({ ...props }) => {
  const { isLoggedIn, timeDisplay, navValue, setNavValue, trends } = props;

  // original and opened ideas
  const [ideas, setIdeas] = useState([]);
  const [recommendation, setRecommendation] = useState([]);

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
      const q2 = query(collection(dbService, "recommendation"));
      getRecommendation(q2);
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

  const getRecommendation = async (query) => {
    const recommendgRef = await getDocs(query);
    const newData = recommendgRef.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setRecommendation(newData);
  };

  const settings = {
    className: "center",
    centerMode: true,
    centerPadding: "30px",
    arrows: false,
    infinite: false,
    speed: 500,
    focusOnSelect: true,
    slidesToScroll: 1,
    initialSlide: 0,
  };

  return (
    <>
      <BottomNavigationBar navValue={navValue} setNavValue={setNavValue} />
      <StormingTopBar />
      <div className="bg-stone-50 min-h-screen pb-14 text-sm">
        <div className="pt-20 m-4 mb-2  font-black text-base">
          👍 이번 주 추천 아이디어
        </div>
        <ul className={`pb-5`}>
          <Slider {...settings}>
            {recommendation.map((idea) => (
              <div key={idea.id} className="relative">
                <div className="h-60 p-5 m-1 mx-2 bg-white shadow-md rounded-3xl break-all text-xs">
                  <div className="mb-2 truncate font-black text-sm">
                    {idea.title}
                  </div>

                  <div className="mb-3 line-clamp-6">{idea.text}</div>

                  <div className="ml-2 mb-1 flex gap-1 text-stone-400">
                    <FontAwesomeIcon icon={faQuoteLeft} />
                    <span>{idea.source}</span>
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
                      src={idea.userPhotoURL}
                    />
                    <div className="flex-col">
                      <span className="flex">{idea.userName}</span>
                      <span className="flex text-stone-400">
                        {idea.createdAt}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </ul>
        <div className="flex gap-2 ml-4 mb-2 font-black text-base">
          <FontAwesomeIcon icon={faFireFlameCurved} size="lg" color="orange" />
          인기 태그
        </div>
        <StormingTagBar setIdeas={setIdeas} trends={trends} />
        {ideas.length > 0 ? (
          <>
            {ideas.map((idea, index) => (
              <div key={index} className="my-2">
                {index % 7 === 6 ? (
                  <div className="py-6 bg-stone-600 text-stone-400 text-sm text-center font-black ">
                    광고 <FontAwesomeIcon icon={faAd} />
                  </div>
                ) : (
                  <div key={index} className="bg-white rounded-lg">
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
