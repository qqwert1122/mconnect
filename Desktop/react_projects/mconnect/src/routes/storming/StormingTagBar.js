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

const StormingTagBar = ({ setIdeas }) => {
  // tags toggle
  const [itemPrmtr, setItemPrmtr] = useState("");

  const onItemClick = (tag) => {
    setItemPrmtr(tag);
  };

  // get Trend Keywords from firestore
  const [trends, setTrends] = useState([]);

  useEffect(() => {
    getTrends();
  }, []);

  const getTrends = async () => {
    const trends = (await getDoc(doc(dbService, "trends", "hotTrends"))).data()
      .tags;
    setTrends(trends);
  };

  // get new ideas filtered by selected trend keywords
  useEffect(() => {
    if (itemPrmtr === "전체") {
      const q1 = query(
        collectionGroup(dbService, "userIdeas"),
        where("isOriginal", "==", true),
        where("isPublic", "==", true),
        orderBy("createdAt", "desc")
      );
      getNewIdeas(q1);
    } else {
      const q1 = query(
        collectionGroup(dbService, "userIdeas"),
        where("isOriginal", "==", true),
        where("isPublic", "==", true),
        where("tags", "array-contains", itemPrmtr),
        orderBy("createdAt", "desc")
      );
      getNewIdeas(q1);
    }
  }, [itemPrmtr]);

  const getNewIdeas = async (query) => {
    const stormingRef = await getDocs(query);
    const newData = stormingRef.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setIdeas(newData);
  };

  return (
    <div className="relative p-4 h-40 flex items-end shadow-inner bg-gradient-to-r from-indigo-900 to-sky-800 ">
      <div className="absolute top-4 left-4 flex items-center text-lg text-blue-400 font-black gap-2">
        Hot Trends
        <FontAwesomeIcon icon={faFireFlameCurved} />
      </div>
      <div
        className={`absolute top-12 left-4 text-2xl font-black text-blue-200 duration-500`}
      >
        {itemPrmtr}
      </div>
      <div className="relative flex items-end flex-nowrap gap-4 overflow-x-scroll">
        {trends.map((tag, index) => (
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
      </div>
    </div>
  );
};

export default StormingTagBar;
