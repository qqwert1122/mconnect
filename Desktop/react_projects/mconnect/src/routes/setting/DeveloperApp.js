import "css/Animation.css";
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

const DeveloperApp = ({ ...props }) => {
  const { onBackClick } = props;

  const createApp = (appName, dscrp, themeColor, complete) => {
    return {
      appName,
      dscrp,
      themeColor,
      complete,
    };
  };

  const developerApp = [
    createApp(
      "Connects",
      "점(dot)을 저장하고 연결해 세상을 연결하는 선(line)을 만드는, 아이디어 기록 앱",
      "bg-orange-400",
      true
    ),
    createApp(
      "너가 최고야!",
      "칭찬에 목마른 현대인. 묻지도 따지지도 않고 항상 당신을 칭찬해줘요",
      "bg-lime-400",
      false
    ),
    createApp(
      "DIFIL",
      "디지털 필사! 동기부여 문장, 아름다운 글귀를 따라 적어 저장하세요",
      "bg-purple-600",
      false
    ),
    createApp(
      "Hustle",
      "우리의 일상을 Hustle! 최고의 몰입을 위한 동기부여 앱",
      "bg-stone-600",
      false
    ),
    createApp(
      "Catch Moment",
      "순간 떠오르는 아이디어를 기록하고, 이력관리를 통해 아이디어에 살을 붙이세요",
      "bg-rose-400",
      false
    ),
    createApp(
      "Factos",
      "정보를 기록하고 팩트를 체크하세요",
      "bg-yellow-400",
      false
    ),
  ];

  return (
    <div className="moveRightToLeft">
      <div className="fixed top-0 z-10 w-full h-14 px-5 p-3 flex justify-between items-center shadow bg-white">
        <button onClick={onBackClick}>
          <FontAwesomeIcon icon={faChevronLeft} size="lg" />
        </button>
      </div>
      <div className="w-screen h-screen">
        <div className="pt-20 mx-5 h-full">
          {developerApp.map((app, index) => (
            <div key={index}>
              <button className="flex gap-5 items-center py-4 w-full">
                <div
                  className={`w-10 h-10 p-2 rounded-full text-white text-2xl font-black ${app.themeColor}`}
                  style={{ minWidth: "40px" }}
                >
                  {app.appName[0]}
                </div>
                <div className="text-start">
                  <p className="text-lg font-black">{app.appName}</p>
                  <p className="line-clamp-2 text-sm text-stone-400">
                    {app.dscrp}
                  </p>
                </div>
              </button>
              {!app.complete && (
                <div className="pb-4 text-sm text-center text-stone-400">
                  구상 중 💭
                </div>
              )}
              {index !== developerApp.length - 1 && <hr />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeveloperApp;
