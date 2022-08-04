import "css/App.css";
import { dbService } from "fbase";
import {
  collection,
  collectionGroup,
  orderBy,
  query,
  where,
  getDocs,
  getDoc,
  doc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { faFireFlameCurved } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StormingTagBar = ({ setIdeasPublic }) => {
  const [itemPrmtr, setItemPrmtr] = useState("");

  const onItemClick = (tag) => {
    setItemPrmtr(tag);
  };

  const getDocuments = async (query) => {
    const stormingRef = await getDocs(query);
    const newData = stormingRef.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setIdeasPublic(newData);
  };

  useEffect(() => {
    if (itemPrmtr === "전체") {
      const q1 = query(
        collectionGroup(dbService, "userIdeas"),
        where("isPublic", "==", true),
        orderBy("createdAt", "desc")
      );
      getDocuments(q1);
    } else {
      const q1 = query(
        collectionGroup(dbService, "userIdeas"),
        where("isPublic", "==", true),
        where("tags", "array-contains", itemPrmtr),
        orderBy("createdAt", "desc")
      );
      getDocuments(q1);
    }
  }, [itemPrmtr]);

  // const commonTags = [
  //   "전체",
  //   "엘지에너지솔루션",
  //   "경영",
  //   "경제",
  //   "국제",
  //   "정치",
  //   "사회",
  //   "과학",
  //   "기술",
  //   "IT",
  //   "환경",
  //   "역사",
  //   "주식",
  //   "부동산",
  //   "사업",
  // ];

  const [commonTags, setCommonTags] = useState([]);

  const getTrends = async () => {
    const trends = (await getDoc(doc(dbService, "trends", "hotTrends"))).data()
      .tags;
    setCommonTags(trends);
  };

  useEffect(() => {
    getTrends();
  }, []);

  return (
    <div className="relative pt-20 p-4 h-52 flex items-end shadow-inner bg-gradient-to-r from-blue-900 to-sky-800">
      <div className="absolute top-20 left-4 flex items-center text-base text-blue-400 font-black gap-2">
        Hot Topics
        <FontAwesomeIcon icon={faFireFlameCurved} />
      </div>
      <div
        className={`absolute top-28 left-4 text-2xl font-black text-blue-200 duration-500`}
      >
        {itemPrmtr}
      </div>
      <div className="relative flex items-end flex-nowrap gap-4 overflow-x-scroll">
        {commonTags.map((tag, index) => (
          <button
            key={index}
            className={`${
              tag === itemPrmtr
                ? "-top-10 left-0 text-xl opacity-0"
                : "top-0 opacity-50"
            } relative flex-grow-0 flex-shrink-0 border-box text-sm duration-500 break-words font-black text-blue-200`}
            onClick={() => onItemClick(tag)}
          >
            {tag}
          </button>
        ))}

        {/* {commonTags.map((tag, index) => (
        <button
          key={index}
          className={`${
            tag === itemPrmtr
              ? "-top-1 bg-red-400 text-white"
              : "top-0 bg-white"
          } relative flex-grow-0 flex-shrink-0 border-box rounded-xl rounded-tr-3xl border-2 mr-1 mb-1 px-3 py-2 text-sm shadow-sm duration-500 break-words `}
          onClick={() => onItemClick(tag)}
        >
          {tag}
        </button>
      ))} */}
      </div>
    </div>
  );
};

export default StormingTagBar;
