import "css/App.css";
import React from "react";
import { authService, provider, signInWithPopup } from "fbase";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useSetRecoilState } from "recoil";
import { userState } from "atom";

const Auth = ({ ...props }) => {
  const { setIsLoggedIn, setInit, navigate, setNavValue } = props;
  const setLoggedInUser = useSetRecoilState(userState);

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
    setNavValue("/ideas");
  };

  const onTestClick = async () => {
    const auth = getAuth();
    await signInWithEmailAndPassword(
      auth,
      "qqwert11223344@naver.com",
      "yjh3706!@"
    );
    const testUser = {
      userId: "CobI9ZV3EGTO2FPqhoRoDdzrGti1",
      userName: "test account",
      userEmail: "qqwert11223344@naver.com",
      userPhotoURL: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
      isAdRemoved: false,
      isAuthority: false,
    };
    setLoggedInUser(testUser);
    setIsLoggedIn(true);
    setInit(true);
    setNavValue("/ideas");
  };

  return (
    <div className="w-screen h-screen">
      <img className="m-auto pt-16 w-72" src="img/auth.png" />
      <div className="mt-5 font-black text-center">
        <p className="english__font text-4xl">Welcome,</p>
        <p className="english__font text-5xl text-orange-400">Connects</p>
        <p className="my-5 text-sm text-orange-300">
          아이디어를 기록하고, 저장하고, 연결해 <br />
          통찰력 있는 새 아이디어를 찾으세요
        </p>
        <>
          <p className="mb-5 text-base text-center font-black">간편 로그인</p>
          <img
            className="mx-auto mb-1"
            width={200}
            onClick={onGoogleClick}
            src="./img/btn_google.png"
          />
          <button
            className="relative w-48 h-12 mb-3 m-1 font-black rounded-sm bg-black text-white text-sm shadow"
            onClick={onTestClick}
          >
            Test mode
          </button>
        </>
      </div>
    </div>
  );
};

export default Auth;
