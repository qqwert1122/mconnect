import "css/App.css";
import React, { useRef, useState } from "react";
import { authService, dbService, storageService } from "fbase";
import { ref, uploadString, getDownloadURL } from "@firebase/storage";
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

const SignUp = ({ customHooks }) => {
  const setNavValue = customHooks.setNavValue;
  const setLoggedInUser = customHooks.setLoggedInUser;
  const setIsLoggedIn = customHooks.setIsLoggedIn;

  const userNameRef = useRef();

  const [userName, setUserName] = useState("");
  const [userPhotoURL, setUserPhotoURL] = useState(
    authService.currentUser.photoURL
  );
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

  const onXmarkClick = () => {
    setUserPhotoURL(authService.currentUser.photoURL);
  };

  const onUserPhotoURLChange = (e) => {
    const theFile = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      setUserPhotoURL(finishedEvent.currentTarget.result);
    };
    reader.readAsDataURL(theFile);
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
        let attachmentUrl = authService.currentUser.photoURL;
        if (userPhotoURL !== authService.currentUser.photoURL) {
          const fileRef = ref(
            storageService,
            `${authService.currentUser.uid}/${v4()}`
          );
          const response = await uploadString(
            fileRef,
            userPhotoURL,
            "data_url"
          );
          attachmentUrl = await getDownloadURL(response.ref);
        }
        await setDoc(doc(dbService, "users", authService.currentUser.uid), {
          userId: authService.currentUser.uid,
          userEmail: authService.currentUser.email,
          userName:
            userName === "" ? authService.currentUser.displayName : userName,
          userPhotoURL: attachmentUrl,
          isAdRemoved: false,
          isAuthority: false,
        });
        const registeredUser = (
          await getDoc(doc(dbService, "users", authService.currentUser.uid))
        ).data();
        setLoggedInUser(registeredUser);
        setNavValue("/");
        setIsLoggedIn(true);
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div
        className="absolute w-screen h-screen opacity-50"
        style={{
          background: "linear-gradient(to bottom, #1D976C, #93F9B9)",
        }}
      ></div>
      <img className="z-20 fixed -top-8 -left-20 w-72" src="img/line_1.png" />
      <img className="fixed -bottom-8 -right-16 w-72" src="img/line_2.png" />
      <div className="z-10 relative w-4/5 h-3/4 py-24 px-5 flex justify-center items-center rounded-3xl shadow-xl bg-white">
        <div className="absolute top-8 right-8 english__font text-4xl text-stone-400">
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
                src={userPhotoURL}
                sx={{
                  display: "flex",
                  width: "150px",
                  height: "150px",
                  borderWidth: "2px",
                }}
              />
              {authService.currentUser.photoURL != userPhotoURL && (
                <button
                  className="absolute top-2 right-2 bg-white rounded-full text-stone-600"
                  onClick={onXmarkClick}
                >
                  <FontAwesomeIcon icon={faCircleXmark} size="2xl" />
                </button>
              )}
              <label
                for="inputUserPhotoURL"
                className="absolute -bottom-2 -right-2 p-2 rounded-lg shadow-xl border-2 border-stone-100 bg-white text-stone-600"
              >
                <FontAwesomeIcon icon={faImage} size="2xl" />
              </label>
            </div>
            <input
              className="hidden"
              id="inputUserPhotoURL"
              type="file"
              accept="image/*"
              onChange={onUserPhotoURLChange}
            />
          </div>
        )}
        <button
          className={`absolute left-5 bottom-5 px-4 py-2 flex items-center justify-center rounded-full text-lg font-black duration-500 shadow-lg  ${
            tabValue === 0
              ? "bg-stone-200 text-stone-400"
              : "bg-green-600 text-white"
          }`}
          onClick={onPrevClick}
        >
          이전
        </button>
        <button
          className={`absolute right-5 bottom-5 px-4 py-2 flex items-center justify-center rounded-full text-lg font-black  duration-500 shadow-lg ${
            isDuplicated ? "bg-red-400 text-white" : "bg-green-600 text-white"
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
