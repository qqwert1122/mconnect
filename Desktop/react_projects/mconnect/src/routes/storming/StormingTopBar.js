import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {} from "@fortawesome/free-regular-svg-icons";
import { faBolt, faCompass, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import StormingTagBar from "./StormingTagBar";

const StormingTopBar = ({ loadNewIdea, trends, itemPrmtr, setItemPrmtr }) => {
  const [scrollY, setScrollY] = useState(0);
  window.addEventListener("scroll", function () {
    setScrollY(window.scrollY);
  });

  const _trends = ["전체", ...trends];

  // tags toggle
  const onItemClick = (tag) => {
    window.scrollTo({ top: 390, left: 0, behavior: "smooth" });
    if (tag === itemPrmtr || tag === "전체") {
      setItemPrmtr();
      loadNewIdea();
    } else {
      setItemPrmtr(tag);
      loadNewIdea(tag);
    }
  };

  return (
    <div className="fixed top-0 w-full z-10">
      <div className="px-2 py-4 bg-white shadow">
        <div
          className={`${
            scrollY < 300 ? "opacity-100 h-10" : "opacity-0 h-0"
          } duration-100`}
        >
          <img className="mb-4 pl-2" width={110} src="./img/logo.png" />
        </div>
        <div className="flex items-center gap-2 px-2 text-lg font-black">
          탐색
          <FontAwesomeIcon className="text-sky-400" icon={faCompass} />
        </div>
        <div
          className={`${
            scrollY > 500 ? "opacity-100 h-5 mt-2" : "opacity-0 h-0 mt-0"
          } duration-100`}
        >
          <div className="flex items-end flex-nowrap gap-4 overflow-x-scroll">
            {_trends.map((tag, index) => (
              <button
                key={index}
                className={`${
                  tag === itemPrmtr || (itemPrmtr === undefined && index === 0)
                    ? "text-sky-400"
                    : "text-stone-300"
                } flex-grow-0 flex-shrink-0 border-box text-sm duration-500 break-words font-black
            ${index === 0 && "ml-2"} ${
                  index === _trends.length - 1 && "mr-10"
                }`}
                onClick={() => onItemClick(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StormingTopBar;
