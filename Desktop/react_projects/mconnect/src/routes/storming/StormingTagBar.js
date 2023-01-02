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

const StormingTagBar = ({ loadNewIdea, trends, itemPrmtr, setItemPrmtr }) => {
  const _trends = ["전체", ...trends];

  // tags toggle
  const onItemClick = (tag) => {
    setItemPrmtr(tag);
    loadNewIdea(tag);
    if (tag === itemPrmtr || tag === "전체") initItemPrmtr();
  };

  const initItemPrmtr = () => {
    setItemPrmtr("전체");
    loadNewIdea();
  };

  return (
    <div className="relative mt-5">
      <div className="flex items-end flex-nowrap gap-4 overflow-x-scroll">
        {_trends.map((tag, index) => (
          <button
            key={index}
            className={`${
              tag === itemPrmtr ? "highlight text-stone-600" : "text-stone-300"
            } flex-grow-0 flex-shrink-0 border-box text-sm duration-500 break-words font-black
            ${index === 0 && "ml-10"} ${
              index === _trends.length - 1 && "mr-10"
            }`}
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
