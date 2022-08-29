import "css/Animation.css";
import BottomNavigationBar from "routes/BottomNavigationBar";
import React, { useState } from "react";
import { authService } from "fbase";
import Avatar from "@mui/material/Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRectangleAd,
  faCommentDollar,
  faEnvelope,
  faCircleInfo,
  faStar,
  faAd,
} from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/free-regular-svg-icons";
import { useRecoilValue } from "recoil";
import { userState } from "atom";
import { Divider } from "@mui/material";

const Setting = ({ ...props }) => {
  const { navigate, navValue, setNavValue } = props;
  const loggedInUser = useRecoilValue(userState);

  const [detailMode, setDetailMode] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const onDetailModeChange = () => {
    setDetailMode((prev) => !prev);
  };
  const onDarkModeChange = (e) => {
    setDarkMode(e.target.checked);
  };
  const onSignOutClick = async () => {
    await authService.signOut();
    navigate("/");
  };

  const achievementItems = [
    {
      label: "불타는 열정🔥",
      bgColor: "bg-red-400",
      color: "text-white",
    },
    {
      label: "인기쟁이😎",
      bgColor: "bg-orange-400",
      color: "text-white",
    },
    {
      label: "공부벌레✏️",
      bgColor: "bg-yellow-400",
      color: "text-white",
    },
    {
      label: "뉴비🥳",
      bgColor: "bg-green-400",
      color: "text-white",
    },
    {
      label: "항해자🗺️",
      bgColor: "bg-sky-400",
      color: "text-white",
    },
    {
      label: "소통왕🤗",
      bgColor: "bg-purple-400",
      color: "text-white",
    },
  ];

  const menuItem = [
    {
      label: "평가",
      navigation: "/setting/eval",
      icon: <FontAwesomeIcon icon={faStar} size="sm" color="gray" />,
    },
    {
      label: "제안",
      navigation: "",
      icon: <FontAwesomeIcon icon={faEnvelope} size="sm" color="gray" />,
    },
    {
      label: "오픈소스",
      navigation: "/setting/opensource",
      icon: <FontAwesomeIcon icon={faCircleInfo} size="sm" color="gray" />,
    },
  ];

  const [checked, setChecked] = React.useState(["wifi"]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <>
      <BottomNavigationBar navValue={navValue} setNavValue={setNavValue} />
      <div className="fixed top-0 w-full z-10">
        <div className="flex justify-between items-center px-2 p-4 bg-white shadow">
          <div className="px-2 text-lg font-black">더보기</div>
          <div className="flex gap-2"></div>
        </div>
      </div>
      <div className="mt-20 mb-16">
        <div className="m-5 p-2">
          <div className="font-black pb-2">프로필</div>
          <div className="relative p-4 rounded-xl shadow-lg bg-stone-100">
            <div className="flex gap-5">
              <div className="relative">
                <Avatar
                  className="bg-white border-2"
                  alt="avatar"
                  src={loggedInUser.userPhotoURL}
                  sx={{
                    display: "flex",
                    width: "80px",
                    height: "80px",
                  }}
                />
              </div>

              <div className="w-full flex items-center">
                <div className="flex-col">
                  <div className="font-black text-base">
                    {loggedInUser.userName}
                  </div>
                  <div className="pb-2 text-xs">{loggedInUser.userEmail}</div>
                  <div className="flex gap-2 text-sm text-white">
                    <button className="p-1 rounded-lg bg-stone-400 font-black ">
                      프로필 수정
                    </button>
                    <button
                      className="p-1 rounded-lg bg-stone-400 font-black"
                      onClick={onSignOutClick}
                    >
                      로그아웃
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="m-5 p-2">
          <div className="font-black pb-2">후원</div>
          <div className="flex gap-5 relative p-4 rounded-xl shadow-lg bg-stone-100">
            <div className="w-1/2 h-24 relative p-5 rounded-xl shadow-lg bg-gradient-to-br from-red-400  via-orange-400 to-yellow-500 text-orange-50 font-black text-sm">
              <span className="absolute top-2 left-2">
                <FontAwesomeIcon icon={faCommentDollar} size="xl" />
              </span>
              <span className="absolute bottom-2 right-2">개발자 후원</span>
            </div>
            <div className="w-1/2 h-24 relative p-5 rounded-xl shadow-lg bg-gradient-to-br from-yellow-300 via-orange-300 to-rose-400 text-orange-50 font-black text-sm">
              <span className="absolute top-2 left-2">
                <FontAwesomeIcon icon={faRectangleAd} size="xl" />
              </span>
              <span className="absolute bottom-2 right-2">광고 제거</span>
            </div>
          </div>
        </div>
        <div className="m-5 p-2">
          <div className="font-black pb-2">업적</div>
          <div className="relative p-4 rounded-xl shadow-lg bg-stone-100">
            <div className="flex flex-wrap gap-1 ">
              {achievementItems.map((item, index) => (
                <div
                  key={index}
                  className={`flex justify-center items-center p-1 rounded-3xl text-xs  font-black ${item.bgColor} ${item.color} shadow-xl border-2 border-white`}
                >
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="m-5 p-2">
          <div className="font-black pb-2">더보기</div>
          <div className="flex gap-5 relative p-4 rounded-xl shadow-lg bg-stone-100">
            {menuItem.map((item, index) => (
              <button
                key={index}
                className="p-2 py-4 shadow-lg bg-white rounded-xl font-black text-stone-600"
                onClick={() => navigate(item.navigation)}
              >
                {item.icon}
                &nbsp;{item.label}
              </button>
            ))}
          </div>
        </div>
        <div className="m-5 mb-24 py-6 h-32 flex gap-2 justify-center items-center bg-stone-600 text-stone-400 text-sm text-center font-black ">
          광고 <FontAwesomeIcon icon={faAd} />
        </div>
      </div>
    </>
  );
};

export default Setting;
