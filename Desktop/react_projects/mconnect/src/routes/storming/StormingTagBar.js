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
import {
  faFireFlameCurved,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StormingTagBar = ({ setIdeas, trends }) => {
  // tags toggle
  const [itemPrmtr, setItemPrmtr] = useState("전체");

  const onItemClick = (tag) => {
    setItemPrmtr(tag);
  };

  const onPrmtrClear = () => {
    setItemPrmtr("전체");
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
    <div className="relative p-4 pl-6 h-32 flex shadow-inner rounded bg-gradient-to-r from-rose-400 to-orange-400">
      <div className="flex-col">
        {/* <div className="flex items-center text-lg text-blue-400 font-black gap-2">
          Hot Trends
          <FontAwesomeIcon icon={faFireFlameCurved} />
        </div> */}
        <div className="flex items-center gap-4 text-2xl font-black text-orange-100 duration-500">
          {itemPrmtr}
          {itemPrmtr !== "전체" && (
            <button onClick={onPrmtrClear}>
              <FontAwesomeIcon icon={faXmarkCircle} size="xs" />
            </button>
          )}
        </div>
        <div className="absolute bottom-5 flex items-end flex-nowrap gap-4 overflow-x-scroll">
          {trends.map((tag, index) => (
            <button
              key={index}
              className={`${
                tag === itemPrmtr
                  ? "-top-10 left-0 text-xl opacity-0"
                  : "top-0 opacity-50"
              } relative flex-grow-0 flex-shrink-0 border-box text-sm duration-500 break-words font-black text-orange-100`}
              onClick={() => onItemClick(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StormingTagBar;
