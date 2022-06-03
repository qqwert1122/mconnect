import BottomNavigationBar from "routes/BottomNavigationBar";
import React from "react";
import { useNavigate } from "react-router-dom";
import { authService, signOut } from "fbase";
import Avatar from "@mui/material/Avatar";

import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faCircleCheck as fasCircleCheck,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import {
  faBell,
  faCircleCheck as farCircleCheck,
  faImage,
} from "@fortawesome/free-regular-svg-icons";

const Setting = ({ customHooks }) => {
  let navigate = useNavigate();
  const user = authService.currentUser;

  const onSignOutClick = () => {
    authService.signOut();
    navigate("/", { replace: true });
  };

  const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    "& .MuiSwitch-switchBase": {
      margin: 1,
      padding: 0,
      transform: "translateX(6px)",
      "&.Mui-checked": {
        color: "#fff",
        transform: "translateX(22px)",
        "& .MuiSwitch-thumb:before": {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            "#fff"
          )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
        },
        "& + .MuiSwitch-track": {
          opacity: 1,
          backgroundColor:
            theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
        },
      },
    },
    "& .MuiSwitch-thumb": {
      backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
      width: 32,
      height: 32,
      "&:before": {
        content: "''",
        position: "absolute",
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
      },
    },
    "& .MuiSwitch-track": {
      opacity: 1,
      backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      borderRadius: 20 / 2,
    },
  }));

  const achievementItems = [
    {
      label: "주가 떡상중📈",
      bgColor: "bg-red-500",
      color: "text-white",
    },
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

  return (
    <>
      <div className="fixed top-0 w-full z-10">
        <div className="flex justify-between items-center px-2 p-4 bg-white shadow">
          <div className="px-2 text-lg font-black">프로필</div>
          <div className="flex gap-2"></div>
        </div>
      </div>
      <div className="mt-24 mb-16">
        <div className="relative m-5 p-5 rounded-xl shadow-lg bg-stone-100">
          <div className="flex gap-5">
            <div className="relative">
              <Avatar
                alt="avatar"
                src={user.photoURL}
                sx={{
                  display: "flex",
                  width: "80px",
                  height: "80px",
                }}
              />
              <button className="absolute -bottom-2 -right-2 p-1 rounded-lg shadow-lg bg-white text-stone-600">
                <FontAwesomeIcon icon={faImage} size="lg" />
              </button>
            </div>

            <div className="flex-col ">
              <div className="text-sm">반갑습니다</div>
              <div className="relative text-lg underline font-black">
                {user.displayName}

                <FontAwesomeIcon icon={faPen} />
              </div>
            </div>
          </div>

          <button
            className="absolute -bottom-0 right-0 p-1 rounded-xl bg-green-600 font-black text-white"
            onClick={onSignOutClick}
          >
            로그아웃
          </button>
        </div>
        <div className="relative m-5 p-5 rounded-xl shadow-lg bg-stone-100">
          <div className="flex flex-wrap gap-1 mx-4 pb-8">
            {achievementItems.map((item, index) => (
              <div
                key={index}
                className={`flex justify-center items-center p-1 rounded-3xl text-sm  font-black ${item.bgColor} ${item.color} shadow-xl border-2 border-white`}
              >
                {item.label}
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-between">
          <div className="w-1/2 relative m-5 p-5 rounded-xl shadow-lg bg-stone-100">
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="Label"
            />
          </div>
          <div className="w-1/2 relative m-5 p-5 rounded-xl shadow-lg bg-stone-100">
            <FormControlLabel
              control={<MaterialUISwitch sx={{ m: 1 }} defaultChecked />}
            />
          </div>
        </div>

        <div className="bg-red-400 m-5">컨택</div>
        <div className="bg-red-400 m-5">고지</div>
      </div>
      <BottomNavigationBar customHooks={customHooks} />
    </>
  );
};

export default Setting;
