import "css/Animation.css";
import SelectedIdeasSlide from "./SelectedIdeasSlide";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCompass as fasCompass,
  faHeart as fasHeart,
  faBookmark as fasBookmark,
  faCircleNodes,
} from "@fortawesome/free-solid-svg-icons";
import {
  faCompass as farCompass,
  faHeart as farHeart,
  faBookmark as farBookmark,
} from "@fortawesome/free-regular-svg-icons";

const IdeasToggleButton = ({
  user,
  dbIdeas,
  selectedIdeas,
  setShowingIdeas,
  scrollY,
  filters,
  filterPrmtr,
  setFilterPrmtr,
  isSelectMode,
  isViewDetailsClicked,
}) => {
  useEffect(() => {
    if (filterPrmtr === null) {
      setShowingIdeas(dbIdeas);
    } else {
      switch (filterPrmtr.value) {
        case "connect":
          setShowingIdeas(
            dbIdeas.filter((idea) => idea.connectedIdeas.length > 0)
          );
          break;
        case "like":
          setShowingIdeas(
            dbIdeas.filter((idea) => idea.likeUsers.includes(user.userId))
          );
          break;
        case "bookmark":
          setShowingIdeas(dbIdeas.filter((idea) => idea.bookmark));
          break;
        case "public":
          setShowingIdeas(dbIdeas.filter((idea) => idea.public));
          break;
      }
    }
  }, [filterPrmtr, dbIdeas]);

  const onFilterPrmtrClick = (item) => {
    if (filterPrmtr != null && filterPrmtr.value === item.value) {
      setFilterPrmtr(null);
    } else {
      setFilterPrmtr(item);
    }
  };

  return (
    <div className="bg-white px-5 pb-5 mb-2">
      <div
        className={`font-black duration-100 pb-5 ${
          isSelectMode && selectedIdeas.length ? "pt-44" : "pt-24"
        }`}
      >
        카테고리
      </div>
      <div className="p-1 flex flex-nowrap overflow-x-scroll gap-2">
        {filters.map((item, index) => (
          <button
            key={index}
            className={`flex-grow-0 flex-shrink-0 border-box rounded-3xl ${
              filterPrmtr != null &&
              item.value === filterPrmtr.value &&
              item.bgColor
            } ${item.color} ${
              item.borderColor
            } border-2 px-2 py-1 text-sm font-black shadow-md duration-500`}
            onClick={() => {
              onFilterPrmtrClick(item);
            }}
          >
            {item.icon}&nbsp;{item.label}
          </button>
        ))}
      </div>
      {scrollY > 160 && (
        <div
          className={`moveRightToLeft p-1 z-10 fixed ${
            isSelectMode && selectedIdeas.length > 0 ? "top-40" : "top-20"
          } right-3 flex gap-2`}
        >
          {filters.map((item, index) => (
            <button
              key={index}
              className={`w-10 h-10 shadow-lg rounded-full border-2 ${
                filterPrmtr != null && item.value === filterPrmtr.value
                  ? item.bgColor
                  : "bg-white"
              } ${item.color} ${item.borderColor} duration-500`}
              onClick={() => {
                onFilterPrmtrClick(item);
              }}
            >
              {item.icon}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default IdeasToggleButton;
