import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {} from "@fortawesome/free-regular-svg-icons";
import {
  faHashtag,
  faFireFlameCurved,
  faDice,
  faHeart as fasHeart,
} from "@fortawesome/free-solid-svg-icons";

const StormingToggleButton = () => {
  const [itemPrmtr, setItemPrmtr] = useState(0);

  const onItemClick = (index) => {
    setItemPrmtr(index);
  };

  const menuItems = [
    {
      icon: <FontAwesomeIcon icon={faFireFlameCurved} />,
      label: "인기",
      bgColor: "bg-orange-400",
      value: 0,
    },
    {
      icon: <FontAwesomeIcon icon={fasHeart} />,
      label: "좋아요",
      bgColor: "bg-red-400",
      value: 1,
    },
    {
      icon: <FontAwesomeIcon icon={faHashtag} />,
      label: "태그",
      bgColor: "bg-lime-500",
      value: 2,
    },
    {
      icon: <FontAwesomeIcon icon={faDice} />,
      label: "랜덤",
      bgColor: "bg-stone-500",
      value: 3,
    },
  ];

  return (
    <div className="bg-white pt-24 pb-5 px-5 mb-2">
      <div className="flex flex-wrap">
        {menuItems.map((item, index) => (
          <div key={index} className="border-box flex w-1/4 px-1 ">
            <button
              className={`relative w-full h-16 p-1 rounded-lg rounded-tr-3xl text-white duration-500 ${
                item.value === itemPrmtr
                  ? `${item.bgColor} shadow-xl -top-2`
                  : "bg-stone-300 top-0"
              }`}
              onClick={() => {
                onItemClick(index);
              }}
            >
              <p className="absolute left-2 top-2 text-2xl">{item.icon}</p>
              <p className="absolute bottom-2 right-2 text-sm font-black">
                {item.label}
              </p>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StormingToggleButton;
