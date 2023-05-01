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
    setNavValue("/contents");
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
    setNavValue("/contents");
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center ">
      <div>
        <img className="m-auto mb-10" width={300} src="./img/text_logo.svg" />
        <div className="ml-4 mb-24">
          <div className="text-3xl font-black">
            <span className="text-sky-400">기록</span>하고,
          </div>
          <div className="text-3xl font-black">
            <span className="text-sky-600">연결</span>하라!
          </div>
          <div className="mt-5 text-base font-black text-stone-400">
            아이디어 기록하고 공유해
            <br />
            창의적인 아이디어를 이끌어내세요!
          </div>
        </div>
        <div className="ml-4">
          <span className="inline-flex mb-4 text-base font-black text-sky-400 border-sky-400 border-2 px-3 py-1 rounded-3xl">
            간편 로그인
          </span>
          <div className="flex-col m-auto text-sm">
            <p className="mb-3 text-sm font-black text-sky-400">
              기존에 사용하시는 계정으로
              <br />
              간단하게 회원가입 하세요
            </p>
            <img
              className="mb-1"
              width={200}
              onClick={onGoogleClick}
              src="./img/btn_google.png"
            />
            <button
              style={{
                height: "40px",
                width: "200px",
              }}
              className="relative mb-3 m-1 font-black rounded-sm bg-sky-300 text-white text-sm shadow"
              onClick={onTestClick}
            >
              TEST MODE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
