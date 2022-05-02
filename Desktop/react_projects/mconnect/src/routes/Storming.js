import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {} from "@fortawesome/free-regular-svg-icons";
import {
  faHeart as fasHeart,
  faHashtag,
  faFireFlameCurved,
  faDice,
  faBolt,
} from "@fortawesome/free-solid-svg-icons";

const Storming = () => {
  const menuItems = [
    {
      icon: <FontAwesomeIcon icon={faFireFlameCurved} />,
      label: "인기",
      bgColor: "bg-red-500",
      color: "text-red-500",
    },
    {
      icon: <FontAwesomeIcon icon={fasHeart} />,
      label: "좋아요",
      bgColor: "bg-orange-500",
      color: "text-orange-500",
    },
    {
      icon: <FontAwesomeIcon icon={faHashtag} />,
      label: "태그",
      bgColor: "bg-lime-500",
      color: "text-lime-500",
    },
    {
      icon: <FontAwesomeIcon icon={faDice} />,
      label: "랜덤",
      bgColor: "bg-sky-500",
      color: "text-sky-500",
    },
  ];

  return (
    <div className="bg-stone-200 min-h-screen">
      <div className="relative bg-white mb-2">
        <div className="english__font relative mb-2 p-2 px-4 text-2xl font-black z-10 text-white bg-orange-400">
          Storming&nbsp;
          <FontAwesomeIcon icon={faBolt} />
        </div>
        <div className="px-5 flex flex-wrap pb-2">
          {menuItems.map((item, index) => (
            <div key={index} className="border-box flex w-1/4 p-1 ">
              <div
                className={`relative shadow-lg w-full h-20 m-1 p-1 rounded-xl text-white ${item.bgColor}`}
              >
                <p className="absolute left-2 top-2 text-3xl">{item.icon}</p>
                <p className="absolute bottom-2 right-2 text-base font-black">
                  {item.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="relative bg-white mb-2">
        {menuItems.map((item, index) => (
          <div key={index} className={`p-5 text-lg font-black ${item.color}`}>
            {item.label}&nbsp;
            {item.icon}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Storming;
