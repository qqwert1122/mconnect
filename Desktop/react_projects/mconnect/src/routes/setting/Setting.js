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
