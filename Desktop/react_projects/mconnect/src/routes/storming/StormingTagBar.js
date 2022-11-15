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
  // tags toggle
  const onItemClick = (tag) => {
    if (tag === itemPrmtr) initItemPrmtr();
    setItemPrmtr(tag);
    loadNewIdea(tag);
  };

  const initItemPrmtr = () => {
    setItemPrmtr();
    loadNewIdea();
  };

  return (
    <div className="relative p-4 px-6 h-32 flex shadow-inner rounded bg-gradient-to-r from-rose-400 to-orange-400">
      <div className="flex-col">
        <div className="flex items-center gap-4 text-2xl font-black text-orange-100 duration-500">
          {itemPrmtr === undefined ? (
            <>전체</>
          ) : (
            <>
              {itemPrmtr}
              <button onClick={initItemPrmtr}>
                <FontAwesomeIcon icon={faXmarkCircle} size="xs" />
              </button>
            </>
          )}
        </div>
        <div className="absolute mr-6 bottom-5 flex items-end flex-nowrap gap-4 overflow-x-scroll">
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
