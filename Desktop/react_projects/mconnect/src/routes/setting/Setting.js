import "css/Animation.css";
import BottomNavigationBar from "routes/BottomNavigationBar";
import React, { useState } from "react";
import { authService } from "fbase";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faRectangleAd,
  faCommentDollar,
  faEnvelope,
  faCircleInfo,
  faStar,
  faMagnifyingGlass,
  faMagnifyingGlassPlus,
  faAd,
} from "@fortawesome/free-solid-svg-icons";
import { faEye, faImage } from "@fortawesome/free-regular-svg-icons";
import { useRecoilValue } from "recoil";
import { userState } from "atom";
import {
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";

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

  const onOpenSourceClick = () => {
    navigate("/setting/opensource");
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

  const onEvalClick = () => {
    navigate("/setting/eval");
  };

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
        <div className="flex justify-between">
          <div className="w-1/2 h-24 relative ml-5 mr-2 p-5 rounded-xl shadow-lg bg-gradient-to-br from-red-400  via-orange-400 to-yellow-500 text-orange-50 font-black text-sm">
            <span className="absolute top-2 left-2">
              <FontAwesomeIcon icon={faCommentDollar} size="xl" />
            </span>
            <span className="absolute bottom-2 right-2">개발자 후원</span>
          </div>
          <div className="w-1/2 h-24 relative mr-5 ml-2  p-5 rounded-xl shadow-lg bg-gradient-to-br from-yellow-300 via-orange-300 to-rose-400 text-orange-50 font-black text-sm">
            <span className="absolute top-2 left-2">
              <FontAwesomeIcon icon={faRectangleAd} size="xl" />
            </span>
            <span className="absolute bottom-2 right-2">광고 제거</span>
          </div>
        </div>
        <div className="relative m-5 p-5 rounded-xl shadow-lg bg-stone-100">
          <div className="flex gap-5">
            <div className="relative">
              <Avatar
                alt="avatar"
                src={loggedInUser.userPhotoURL}
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
        <div className="relative mx-5 p-5">
          <div className="font-black pb-2">업적</div>
          <div className="flex flex-wrap gap-1">
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
        {/* <div className="mx-5 p-5">
          <div className="font-black">세팅</div>
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Inbox" />
                <Switch
                  edge="end"
                  onChange={handleToggle("wifi")}
                  checked={checked.indexOf("wifi") !== -1}
                  inputProps={{
                    "aria-labelledby": "switch-list-label-wifi",
                  }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <DraftsIcon />
                </ListItemIcon>
                <ListItemText primary="Drafts" />
              </ListItemButton>
            </ListItem>
          </List>
        </div> */}
        <div className="mx-5 p-5">
          <div className="font-black pb-2">정보</div>
          <button
            className="btn flex items-center gap-5 p-2 w-full text-start shadow bg-stone-50 rounded-t-lg "
            onClick={onEvalClick}
          >
            <FontAwesomeIcon icon={faStar} size="sm" color="gray" />
            &nbsp;평가
          </button>
          <Divider />
          <button className="btn flex items-center gap-5 p-2 w-full text-start shadow bg-stone-50  ">
            <FontAwesomeIcon icon={faEnvelope} size="sm" color="gray" />
            &nbsp;제안
          </button>
          <Divider />
          <button
            className="btn flex items-center gap-5 p-2 w-full text-start shadow-lg bg-stone-50 rounded-b-lg "
            onClick={onOpenSourceClick}
          >
            <FontAwesomeIcon icon={faCircleInfo} size="sm" color="gray" />
            &nbsp;오픈소스
          </button>
        </div>
        <div className="m-5 mb-24 py-6 h-32 flex gap-2 justify-center items-center bg-stone-600 text-stone-400 text-sm text-center font-black ">
          광고 <FontAwesomeIcon icon={faAd} />
        </div>
      </div>
    </>
  );
};

export default Setting;
