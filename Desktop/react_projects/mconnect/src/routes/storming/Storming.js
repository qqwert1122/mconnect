import BottomNavigationBar from "routes/BottomNavigationBar";
import StormingTopBar from "./StormingTopBar";
import StormingTagBar from "./StormingTagBar";
import StormingIdea from "./StormingIdea";
import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import { useBottomScrollListener } from "react-bottom-scroll-listener";
import {
  query,
  orderBy,
  where,
  collectionGroup,
  getDocs,
  collection,
  limit,
  startAfter,
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

  const [lastVisible, setLastVisible] = useState();
  const [ideas, setIdeas] = useState([]);
  const [recommendation, setRecommendation] = useState([]);
  const [itemPrmtr, setItemPrmtr] = useState();

  //TODO
  // - 바닥에 닿으면 query에 limit을 줘서 불러오기
  // 단 이때 전체 ideas와 tag에 따른 ideas를 불러올 때에 모두 적용되어야 함

  // lastVisible -1, value, undefined
  // case -1
  // case value
  // 최초 load 시 undefined 이고 이때에 limit
  // 이후 lastVisible에 이어서 load
  // 마지막의 경우 -1
  // 만약 키워드 변경 시 lastVisible 초기화,

  const getIdeas = async (query) => {
    const stormingRef = await getDocs(query);
    const newData = stormingRef.docs.map((doc) => doc.data());
    setIdeas(newData);
  };

  const getRecommendation = async (query) => {
    const recommendgRef = await getDocs(query);
    const newData = recommendgRef.docs.map((doc) => doc.data());
    setRecommendation(newData);
  };

  function init() {
    setLastVisible();
  }

  async function loadNewIdea(tag = undefined) {
    init();
    let q;
    if (tag === undefined) {
      q = query(
        collectionGroup(dbService, "userIdeas"),
        where("isOriginal", "==", true),
        where("isPublic", "==", true),
        orderBy("createdAt", "desc"),
        limit(3)
      );
    } else {
      q = query(
        collectionGroup(dbService, "userIdeas"),
        where("isOriginal", "==", true),
        where("isPublic", "==", true),
        where("tags", "array-contains", tag),
        orderBy("createdAt", "desc"),
        limit(3)
      );
    }
    await getDocs(q).then((snapshot) => {
      const arr = [];
      snapshot.forEach((doc) => {
        arr.push(doc.data());
      });
      setIdeas(arr);
      if (snapshot.docs.length === 0) {
        setLastVisible(-1);
      } else {
        setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
      }
    });
  }

  async function loadMore() {
    console.log("bottom");
    if (itemPrmtr === undefined) {
      if (lastVisible === -1) return;
      else {
        const q1 = query(
          collectionGroup(dbService, "userIdeas"),
          where("isOriginal", "==", true),
          where("isPublic", "==", true),
          orderBy("createdAt", "desc"),
          limit(3),
          startAfter(lastVisible)
        );
        await getDocs(q1).then((snapshot) => {
          setIdeas((ideas) => {
            const arr = [...ideas];
            snapshot.forEach((doc) => {
              arr.push(doc.data());
            });
            return arr;
          });
          if (snapshot.docs.length === 0) {
            setLastVisible(-1);
          } else {
            setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
          }
        });
      }
    } else {
      if (lastVisible === -1) return;
      else {
        const q2 = query(
          collectionGroup(dbService, "userIdeas"),
          where("isOriginal", "==", true),
          where("isPublic", "==", true),
          where("tags", "array-contains", itemPrmtr),
          orderBy("createdAt", "desc"),
          limit(3),
          startAfter(lastVisible)
        );
        await getDocs(q2).then((snapshot) => {
          setIdeas((ideas) => {
            const arr = [...ideas];
            snapshot.forEach((doc) => {
              arr.push(doc.data());
            });
            return arr;
          });
          if (snapshot.docs.length === 0) {
            setLastVisible(-1);
          } else {
            setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
          }
        });
      }
    }
  }

  useBottomScrollListener(() => loadMore());

  useEffect(() => {
    if (isLoggedIn) {
      loadNewIdea();
      const q = query(collection(dbService, "recommendation"));
      getRecommendation(q);
    }
  }, []);

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
        <StormingTagBar
          loadNewIdea={loadNewIdea}
          trends={trends}
          itemPrmtr={itemPrmtr}
          setItemPrmtr={setItemPrmtr}
        />
        {ideas.length > 0 ? (
          <>
            {ideas.map((idea, index) => (
              <div key={index} className="my-2">
                <div key={index} className="bg-white rounded-lg">
                  <StormingIdea idea={idea} timeDisplay={timeDisplay} />
                </div>
                {index % 7 === 6 && (
                  <div className="py-6 bg-stone-600 text-stone-400 text-sm text-center font-black ">
                    광고 <FontAwesomeIcon icon={faAd} />
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
