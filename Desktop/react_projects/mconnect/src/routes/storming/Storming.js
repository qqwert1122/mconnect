import BottomNavigationBar from "routes/BottomNavigationBar";
import Recommendation from "./Recommendation";
import StormingTopBar from "./StormingTopBar";
import StormingTagBar from "./StormingTagBar";
import StormingIdea from "./StormingIdea";
import React, { useEffect, useState } from "react";
import algoliasearch from "algoliasearch";
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

  const APP_ID = process.env.REACT_APP_ALGOLIA_APP_ID;
  const API_KEY = process.env.REACT_APP_ALGOLIA_API_KEY;
  const client = algoliasearch(APP_ID, API_KEY);
  const index = client.initIndex("userIdeas");

  const [lastVisible, setLastVisible] = useState();
  const [ideas, setIdeas] = useState([]);
  const [recommendation, setRecommendation] = useState([]);
  const [itemPrmtr, setItemPrmtr] = useState();

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
      <div className=" min-h-screen pb-14 text-sm">
        <div className="pt-20 m-4 ml-10 mb-2">
          <div className="font-black text-lg text-sky-400">오늘의 발견</div>
          <div className="text-sky-300 text-xs ">에디터 추천</div>
        </div>
        <ul className="pb-10">
          <Slider {...settings}>
            {recommendation.map((idea, i) => (
              <Recommendation key={i} idea={idea} />
            ))}
          </Slider>
        </ul>
        <div className="ml-10 mt-4 mb-2">
          <div className="font-black text-lg text-sky-400">인기 태그</div>
          <div className="text-xs text-sky-300">최근 트렌드</div>
        </div>
        <StormingTagBar
          loadNewIdea={loadNewIdea}
          trends={trends}
          itemPrmtr={itemPrmtr}
          setItemPrmtr={setItemPrmtr}
        />
        {ideas.length > 0 ? (
          <div className="mt-5 ">
            {ideas.map((idea, i) => (
              <div key={i} className="my-1">
                <div key={i} className="ml-5 bg-white rounded-lg">
                  <StormingIdea
                    index={index}
                    idea={idea}
                    timeDisplay={timeDisplay}
                  />
                </div>
                {i % 7 === 6 && (
                  <div className="py-6 bg-stone-600 text-stone-400 text-sm text-center font-black ">
                    광고 <FontAwesomeIcon icon={faAd} />
                  </div>
                )}
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
