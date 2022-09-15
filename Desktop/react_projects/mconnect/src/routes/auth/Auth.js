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
  const { setIsLoggedIn, setInit, navigate } = props;
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
    navigate("/ideas");
  };

  const onTestClick = async () => {
    const auth = getAuth();
    const data = await signInWithEmailAndPassword(
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
    navigate("/ideas");
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
      <div className="z-10 relative py-24 px-5 rounded-3xl shadow-xl bg-white">
        <div className="font-black mx-auto mb-24 text-center">
          <p className="english__font text-4xl">Welcome,</p>
          <p className="english__font text-5xl text-green-600">Connects</p>
          <p className="my-5 text-base text-lime-500">
            아이디어를 연결하고 찾으세요
          </p>
        </div>
        <div className="mb-3 text-lg text-center font-black">간편 로그인</div>
        <img
          className="mb-3"
          width={250}
          onClick={onGoogleClick}
          src="./img/btn_google.png"
        />
        <button
          className="relative w-full h-12 mb-3 p-2 font-black rounded bg-black text-white shadow"
          onClick={onTestClick}
        >
          <div className="absolute bg-white h-10 w-12 m-auto left-1 top-1 text-black text-2xl">
            t
          </div>
          Test mode
        </button>
        <div className="absolute bottom-2 text-sm text-stone-400">
          © 2022 Connects, All rights reserved
        </div>
      </div>
    </div>
  );
};

export default Auth;
