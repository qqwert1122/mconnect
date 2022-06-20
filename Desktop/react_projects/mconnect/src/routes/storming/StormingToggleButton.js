import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {} from "@fortawesome/free-regular-svg-icons";
import {
  faHashtag,
  faFireFlameCurved,
  faDice,
  faHeart as fasHeart,
} from "@fortawesome/free-solid-svg-icons";

const StormingToggleButton = () => {
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
    <div className="bg-white px-5  pb-10 mb-2">
      <div className="text-base font-black pt-24 pb-5">카테고리</div>
      <div className="flex flex-wrap">
        {menuItems.map((item, index) => (
          <div key={index} className="border-box flex w-1/4 px-1 ">
            <div
              className={`relative shadow-lg w-full h-16 p-1 rounded-xl text-white ${item.bgColor}`}
            >
              <p className="absolute left-2 top-2 text-2xl">{item.icon}</p>
              <p className="absolute bottom-2 right-2 text-sm font-black">
                {item.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StormingToggleButton;
