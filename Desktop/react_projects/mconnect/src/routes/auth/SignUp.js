import "css/App.css";
import React, { useRef, useState } from "react";
import { authService, dbService } from "fbase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { v4 } from "uuid";
import Avatar from "@mui/material/Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import dayjs from "dayjs";

const SignUp = ({ ...props }) => {
  const { setLoggedInUser, setIsLoggedIn, navigate } = props;

  const userNameRef = useRef();

  const [userName, setUserName] = useState("");
  const [tabValue, setTabValue] = useState(0);

  const [isDuplicated, setIsDuplicated] = useState(false);

  const onUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const onSpaceKeyDown = (e) => {
    if (e.key === " ") {
      e.preventDefault();
    }
  };

  const onPrevClick = () => {
    setTabValue(0);
  };

  const onNextClick = async () => {
    switch (tabValue) {
      case 0:
        const q = query(
          collection(dbService, "users"),
          where(
            "userName",
            "==",
            userName === "" ? authService.currentUser.displayName : userName
          )
        );
        const nickNameCheck = await getDocs(q);
        if (nickNameCheck.docs.length == 0) {
          setIsDuplicated(false);
          setTabValue(1);
        } else {
          userNameRef.current.focus();
          setIsDuplicated(true);
          return;
        }
        break;
      case 1:
        await setDoc(doc(dbService, "users", authService.currentUser.uid), {
          userId: authService.currentUser.uid,
          userEmail: authService.currentUser.email,
          userName:
            userName === "" ? authService.currentUser.displayName : userName,
          userPhotoURL: `https://avatars.dicebear.com/api/miniavs/${
            userName === "" ? authService.currentUser.displayName : userName
          }.svg`,
          isAdRemoved: false,
          isAuthority: false,
          isOfficial: false,
          setting: {
            isSimpleMode: false,
            isDarkMode: false,
          },
          achievement: {},
          createdAt: dayjs().format("YYYY. MM. DD. HH:mm:ss"),
          lastVisitedAt: dayjs().format("YYYY. MM. DD. HH:mm:ss"),
          vistCount: 1,
        });
        const registeredUser = (
          await getDoc(doc(dbService, "users", authService.currentUser.uid))
        ).data();
        setLoggedInUser(registeredUser);
        navigate("/ideas");
        setIsLoggedIn(true);
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="absolute w-screen h-screen opacity-50 bg-gradient-to-t from-rose-400 to-orange-400"></div>
      <div className="z-10 relative w-4/5 h-3/4 py-24 px-5 flex justify-center items-center rounded-3xl shadow-xl bg-white">
        <div className="absolute top-8 right-8 text-4xl text-stone-400">
          Sign Up
        </div>
        {tabValue === 0 && (
          <div>
            <div
              className={`font-black text-xl mb-10 ${
                userName.length > 20 && "text-red-400"
              }`}
            >
              이름을 입력하세요(
              {userName.length === 0
                ? authService.currentUser.displayName.length
                : userName.length}
              /20)
            </div>
            <input
              ref={userNameRef}
              type="text"
              name="inputUserName"
              className={`w-60 border-b-2 text-xl mb-2`}
              placeholder={authService.currentUser.displayName}
              value={userName}
              onChange={onUserNameChange}
              onKeyDown={onSpaceKeyDown}
              maxLength="20"
              autoComplete="off"
            />
            {isDuplicated && (
              <div className="text-red-400 font-black">
                중복된 이름이 있습니다
              </div>
            )}
          </div>
        )}

        {tabValue === 1 && (
          <div>
            <div className="font-black text-xl mb-10">사진을 입력하세요</div>
            <div className="relative">
              <Avatar
                alt="avatar"
                src={`https://avatars.dicebear.com/api/miniavs/${
                  userName === ""
                    ? authService.currentUser.displayName
                    : userName
                }.svg`}
                sx={{
                  display: "flex",
                  width: "150px",
                  height: "150px",
                  borderWidth: "2px",
                }}
              />
            </div>
            <input
              className="hidden"
              id="inputUserPhotoURL"
              type="file"
              accept="image/*"
            />
          </div>
        )}
        <button
          className={`absolute left-5 bottom-5 px-4 py-2 flex items-center justify-center rounded-full text-lg font-black duration-500 shadow-lg  ${
            tabValue === 0
              ? "bg-stone-200 text-stone-400"
              : "bg-orange-400 text-white"
          }`}
          onClick={onPrevClick}
        >
          이전
        </button>
        <button
          className={`absolute right-5 bottom-5 px-4 py-2 flex items-center justify-center rounded-full text-lg font-black  duration-500 shadow-lg ${
            isDuplicated ? "bg-red-400 text-white" : "bg-orange-400 text-white"
          } `}
          onClick={onNextClick}
        >
          {tabValue === 0 && "다음"}
          {tabValue === 1 && "시작"}
        </button>
      </div>
    </div>
  );
};

export default SignUp;
