import SettingProfile from "./SettingProfile";
import "css/Animation.css";
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
  const { navigate, navValue, setNavValue } = props;
  const loggedInUser = useRecoilValue(userState);
  const setChatUser = useSetRecoilState(chatUserState);
  const [isFirstChat, setIsFirstChat] = useRecoilState(isFirstChatState);

  const onSignOutClick = async () => {
    await authService.signOut();
    navigate("/");
  };

  const menuItem = [
    {
      label: "평가",
      dscrp: "Connects에 대해 솔직히 평가해주세요",
      navigation: "/setting/eval",
      color: "bg-red-400",
      icon: <FontAwesomeIcon icon={faStar} size="sm" />,
    },
    {
      label: "제안 / 협업",
      dscrp:
        "Connects 운영자에게 서비스 개선 방안, 협업 등에 대해 제안해주세요",
      navigation: `${
        loggedInUser.isAuthority ? "/setting/offer" : "/setting/offer/offerChat"
      }`,
      color: "bg-yellow-400",
      icon: <FontAwesomeIcon icon={faCommentDots} size="sm" />,
    },
    {
      label: "다른 어플리케이션",
      dscrp: "Connects 제작자의 다른 어플리케이션들을 확인해보세요",
      navigation: "/setting/developerApp",
      color: "bg-green-400",
      icon: <FontAwesomeIcon icon={faLayerGroup} size="sm" />,
    },
    {
      label: "오픈소스",
      dscrp: "Connects 제작에 도움을 준 오픈소스를 확인해보세요",
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
  // 처음 chat을 열면 채팅방을 개설해줘야지.
  // 채팅
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
        <div className="flex justify-between items-center px-2 p-4 bg-white shadow">
          <div className="px-2 text-lg font-black">더보기</div>
          <button className="mr-2 text-stone-400" onClick={onSignOutClick}>
            <FontAwesomeIcon icon={faArrowRightFromBracket} size="lg" />
          </button>
        </div>
      </div>
      <div className="mt-20 mb-16">
        <SettingProfile loggedInUser={loggedInUser} />
        <div className="m-5 p-2">
          <div className="font-black pb-2">후원</div>
          <div className="flex gap-5 relative">
            <div className="w-1/2 h-24 relative p-5 rounded shadow-lg bg-gradient-to-br from-red-400  via-orange-400 to-yellow-500 text-orange-50 font-black text-sm">
              <span className="absolute top-2 left-2">
                <FontAwesomeIcon icon={faCommentDollar} size="xl" />
              </span>
              <span className="absolute bottom-2 right-2">개발자 후원</span>
            </div>
            <div className="w-1/2 h-24 relative p-5 rounded shadow-lg bg-gradient-to-br from-yellow-300 via-orange-300 to-rose-400 text-orange-50 font-black text-sm">
              <span className="absolute top-2 left-2">
                <FontAwesomeIcon icon={faRectangleAd} size="xl" />
              </span>
              <span className="absolute bottom-2 right-2">광고 제거</span>
            </div>
          </div>
        </div>
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
