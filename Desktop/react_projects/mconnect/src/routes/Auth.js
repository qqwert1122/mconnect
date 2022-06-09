import "css/App.css";
import React, { useRef, useState } from "react";
import {
  authService,
  dbService,
  storageService,
  provider,
  signInWithPopup,
} from "fbase";
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
import { faCircleXmark, faRotateBack } from "@fortawesome/free-solid-svg-icons";
import { faImage } from "@fortawesome/free-regular-svg-icons";

const Auth = ({ customHooks }) => {
  const registerMode = customHooks.registerMode;
  const setRegisterMode = customHooks.setRegisterMode;
  const loggedInUser = customHooks.loggedInUser;
  const setIsLoggedIn = customHooks.setIsLoggedIn;
  const setInit = customHooks.setInit;

  const userNameRef = useRef();

  const [userName, setUserName] = useState("");
  const [userPhotoURL, setUserPhotoURL] = useState(loggedInUser.photoURL);
  const [tabValue, setTabValue] = useState(0);

  const [isDuplicated, setIsDuplicated] = useState(false);

  const onGoogleClick = async (event) => {
    event.preventDefault();
    try {
      signInWithPopup(authService, provider).then((result) => {
        const credential = provider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const onXmarkClick = () => {
    setUserPhotoURL(loggedInUser.photoURL);
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
    if (tabValue === 0) {
      const q = query(
        collection(dbService, "users"),
        where(
          "userName",
          "==",
          userName === "" ? loggedInUser.displayName : userName
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
    } else {
      const fileRef = ref(storageService, `${loggedInUser.uid}/${v4()}`);
      const response = await uploadString(fileRef, userPhotoURL, "data_url");
      const attachmentUrl = await getDownloadURL(response.ref);
      await setDoc(doc(dbService, "users", loggedInUser.uid), {
        userId: loggedInUser.uid,
        userEmail: loggedInUser.email,
        userName: userName === "" ? loggedInUser.displayName : userName,
        userPhotoURL:
          userPhotoURL === "" ? loggedInUser.photoURL : attachmentUrl,
        isAdRemoved: false,
        isAuthority: false,
      });
      setRegisterMode(false);
      setIsLoggedIn(true);
      setInit(true);
    }
  };

  const settings = {
    dots: true,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToScroll: 1,
    centerMode: true,
    focusOnSelect: true,
    initialSlide: 0,
  };

  return (
    <>
      {registerMode ? (
        <div className="w-screen h-screen flex justify-center items-center">
          <div className="flex-col">
            {tabValue === 0 && (
              <>
                <div className="font-black text-xl mb-10">
                  닉네임을 입력하세요
                </div>
                <input
                  ref={userNameRef}
                  type="text"
                  name="inputUserName"
                  className={`border-b-2 text-xl mb-2`}
                  placeholder={loggedInUser.displayName}
                  value={userName}
                  onChange={onUserNameChange}
                  autoComplete="off"
                />
                {isDuplicated && (
                  <div className="text-red-400 font-black">
                    중복된 닉네임이 있습니다
                  </div>
                )}
              </>
            )}

            {tabValue === 1 && (
              <>
                <div className="font-black text-xl mb-10">
                  사진을 입력하세요
                </div>
                <div className="relative">
                  <Avatar
                    alt="avatar"
                    src={userPhotoURL}
                    sx={{
                      display: "flex",
                      width: "150px",
                      height: "150px",
                    }}
                  />
                  {loggedInUser.photoURL != userPhotoURL && (
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
              </>
            )}
          </div>

          <button
            className={`fixed left-5 bottom-5 px-4 py-2 flex items-center justify-center rounded-full text-lg font-black duration-500 shadow-lg  ${
              tabValue === 0
                ? "bg-stone-200 text-stone-400"
                : "bg-green-600 text-white"
            }`}
            onClick={onPrevClick}
          >
            이전
          </button>
          <button
            className={`fixed right-5 bottom-5 px-4 py-2 flex items-center justify-center rounded-full text-lg font-black  duration-500 shadow-lg ${
              isDuplicated ? "bg-red-400 text-white" : "bg-green-600 text-white"
            } `}
            onClick={onNextClick}
          >
            {tabValue === 0 && "다음"}
            {tabValue === 1 && "시작"}
          </button>
        </div>
      ) : (
        <div className="relative w-screen h-screen flex flex-wrap justify-center content-center">
          <div>
            <h2 className="english__font text-5xl">Welcome to</h2>
            <h2 className="highlight english__font text-5xl">Connecteas</h2>
          </div>
          <h3 className="mt-16 text-xl font-bold">
            간편하게 회원가입/로그인 하기
          </h3>

          <button className="flex" onClick={onGoogleClick}>
            <img
              className="mt-8"
              style={{
                width: "auto",
                height: "4rem",
              }}
              src="img/btn_google_signin_light_normal_web.png"
            />
          </button>
        </div>
      )}
    </>
  );
};

export default Auth;
