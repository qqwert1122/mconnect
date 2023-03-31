import "css/App.css";
import "css/Gradient.css";
import React from "react";
import { authService, provider, signInWithPopup } from "fbase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
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
    <div className="w-screen h-screen flex justify-center items-center">
      <div>
        <img className="m-auto" width={300} src="./img/logo_nobg.svg" />
        <p className="mb-1 text-base text-center font-black text-orange-500">
          간편 로그인
        </p>
        <div className="flex-col m-auto text-sm text-center ">
          <p className="mb-3 text-xs text-orange-400">
            기존에 사용하시는 계정으로
            <br />
            간단하게 회원가입 하세요
          </p>
          <img
            className="mx-auto mb-1"
            width={200}
            onClick={onGoogleClick}
            src="./img/btn_google.png"
          />
          <button
            className="relative w-48 h-10 mb-3 m-1 font-black rounded-sm bg-orange-500 text-orange-100 text-sm shadow"
            onClick={onTestClick}
          >
            Test Mode
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
