import {
  faFaceGrin,
  faFaceGrinHearts,
  faFaceGrinSquint,
  faFaceGrinStars,
  faFaceRollingEyes,
  faFaceSadTear,
  faPaperPlane,
} from "@fortawesome/free-regular-svg-icons";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, TextField } from "@mui/material";
import { useState } from "react";

const Report = ({ ...props }) => {
  const { onBackClick } = props;

  const evl = [
    {
      icon: <FontAwesomeIcon icon={faFaceGrinSquint} size="xl" />,
      color: "bg-red-400 text-red-100 shadow-red-400",
      value: 10,
    },
    {
      icon: <FontAwesomeIcon icon={faFaceGrin} size="xl" />,
      color: "bg-orange-400 text-orange-100 shadow-orange-400",
      value: 7,
    },
    {
      icon: <FontAwesomeIcon icon={faFaceRollingEyes} size="xl" />,
      color: "bg-sky-400 text-sky-100 shadow-sky-400",
      value: 4,
    },
    {
      icon: <FontAwesomeIcon icon={faFaceSadTear} size="xl" />,
      color: "bg-purple-400 text-purple-100 shadow-purple-400",
      value: 1,
    },
  ];
  const [evlPrmtr, setEvlPrmtr] = useState(1);
  const changePrmtr = (index) => {
    setEvlPrmtr(index);
  };

  return (
    <>
      <div className="fixed top-0 z-10 w-full h-14 px-5 p-3 flex justify-between items-center shadow bg-white">
        <button onClick={onBackClick}>
          <FontAwesomeIcon icon={faChevronLeft} size="lg" />
        </button>
        <button>
          <FontAwesomeIcon icon={faPaperPlane} size="lg" />
        </button>
      </div>
      <div className="w-screen h-screen">
        <div className="pt-20 mx-5">
          <div className="mb-2 font-black">App을 평가해주세요</div>
          <div className="mb-5 flex gap-5 font-black">
            {evl.map((_evl, index) => (
              <button
                key={index}
                className={`${
                  index === evlPrmtr
                    ? _evl.color
                    : "bg-stone-600 text-stone-500"
                } shadow-lg p-2 rounded-full text-xl duration-500`}
                onClick={() => changePrmtr(index)}
              >
                {_evl.icon}
              </button>
            ))}
          </div>
        </div>
        <textarea
          className="mx-auto m-10 p-5 w-11/12 h-2/3 flex rounded-3xl shadow-inner bg-stone-50 text-sm"
          placeholder="당신의 목소리를 자세히 들려주세요"
        />
      </div>
    </>
  );
};

export default Report;
