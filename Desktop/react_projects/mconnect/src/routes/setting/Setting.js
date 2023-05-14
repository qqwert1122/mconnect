import SettingProfile from "./SettingProfile";
import "css/Animation.css";
import "css/Gradient.css";
import BottomNavigationBar from "routes/BottomNavigationBar";
import React from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { authService, dbService } from "fbase";
import { userState, chatUserState, isFirstChatState } from "atom";
import { doc, setDoc } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRectangleAd,
  faCommentDollar,
  faStar,
  faArrowRightFromBracket,
  faCode,
  faLayerGroup,
  faCommentDots,
} from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/free-regular-svg-icons";

const Setting = ({ ...props }) => {
  const { navigate, navValue, setNavValue, setIsLoggedIn } = props;
  const loggedInUser = useRecoilValue(userState);
  const setChatUser = useSetRecoilState(chatUserState);
  const [isFirstChat, setIsFirstChat] = useRecoilState(isFirstChatState);

  const onSignOutClick = async () => {
    setIsLoggedIn(false);
    await authService.signOut();
    navigate("/auth");
  };

  const menuItem = [
    {
      label: "평가",
      dscrp: "CONNECT에 대해 솔직히 평가해주세요",
      navigation: "/setting/eval",
      color: "bg-red-400",
      icon: <FontAwesomeIcon icon={faStar} size="sm" />,
    },
    {
      label: "제안 / 협업",
      dscrp: "운영자에게 개선, 협업을 제안해주세요",
      navigation: `${
        loggedInUser.isAuthority ? "/setting/offer" : "/setting/offer/offerChat"
      }`,
      color: "bg-yellow-400",
      icon: <FontAwesomeIcon icon={faCommentDots} size="sm" />,
    },
    {
      label: "다른 어플리케이션",
      dscrp: "CONNECT의 다른 어플리케이션들을 확인하세요",
      navigation: "/setting/developerApp",
      color: "bg-green-400",
      icon: <FontAwesomeIcon icon={faLayerGroup} size="sm" />,
    },
    {
      label: "오픈소스",
      dscrp: "제작에 도움을 준 오픈소스를 확인해보세요",
      navigation: "/setting/opensource",
      color: "bg-sky-400",
      icon: <FontAwesomeIcon icon={faCode} size="sm" />,
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

  async function onItemClick(item, index) {
    if (index === 1 && loggedInUser.isAuthority === false) {
      setChatUser(loggedInUser.userId);
      if (isFirstChat) {
        await setDoc(doc(dbService, "chatList", loggedInUser.userId), {
          userId: loggedInUser.userId,
          userName: loggedInUser.userName,
          userPhotoURL: loggedInUser.userPhotoURL,
          updatedAt: "",
          recentMessage: "",
          notToRead: false,
        });
        setIsFirstChat(false);
      }
    }
    navigate(item.navigation);
  }

  return (
    <>
      <BottomNavigationBar navValue={navValue} setNavValue={setNavValue} />
      <div className="fixed top-0 w-full z-10">
        <div className=" px-2 p-4 bg-white shadow">
          <div>
            <img className="mb-4" width={150} src="./img/text_logo.svg" />
          </div>
          <div className="flex justify-between items-center">
            <div className="px-2 text-lg font-black">더 보기</div>
            <button className="mr-2 text-stone-400" onClick={onSignOutClick}>
              <FontAwesomeIcon icon={faArrowRightFromBracket} size="lg" />
            </button>
          </div>
        </div>
      </div>
      <div className="mt-28 mb-16">
        <SettingProfile loggedInUser={loggedInUser} />
        {/* <div className="m-5 p-2">
          <div className="font-black pb-2">후원</div>
          <div className="flex gap-5 relative">
            <div className="stacked-linear-donation w-1/2 h-24 relative p-5 rounded shadow-lg text-white font-black text-sm">
              <span className="absolute top-2 left-2">
                <FontAwesomeIcon icon={faCommentDollar} size="xl" />
              </span>
              <span className="absolute bottom-2 right-2">개발자 후원</span>
            </div>
            <div className="stacked-linear-ad w-1/2 h-24 relative p-5 rounded shadow-lg text-white font-black text-sm">
              <span className="absolute top-2 left-2">
                <FontAwesomeIcon icon={faRectangleAd} size="xl" />
              </span>
              <span className="absolute bottom-2 right-2">광고 제거</span>
            </div>
          </div>
        </div> */}
        <div className="m-5 p-2">
          {menuItem.map((item, index) => (
            <div key={index}>
              <button
                className="flex gap-5 items-center py-4 w-full"
                onClick={() => onItemClick(item, index)}
              >
                <p
                  className={`flex items-center justify-center w-10 h-10 p-2 text-2xl rounded-full text-white ${item.color}`}
                >
                  {item.icon}
                </p>
                <div className="text-start">
                  <p className="font-black">{item.label}</p>
                  <p className="line-clamp-2 text-sm text-stone-400">
                    {item.dscrp}
                  </p>
                </div>
              </button>
              {index !== menuItem.length - 1 && <hr />}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Setting;
