import "css/App.css";
import "css/Gradient.css";
import React from "react";
import { authService, provider, signInWithPopup } from "fbase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useSetRecoilState } from "recoil";
import { userState } from "atom";

const Auth = ({ ...props }) => {
  const { setNavValue } = props;

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

  return (
    <div className="w-screen h-screen flex justify-center items-center ">
      <div>
        <img className="m-auto mb-24" width={300} src="./img/text_logo.svg" />
        <div className="text-center">
          <span className="inline-flex mb-4 text-sm font-black px-3 py-1 ">
            다음 계정으로 로그인
          </span>
          <div className="flex items-center justify-center gap-2 text-sm">
            <img
              className="mb-1"
              width={50}
              onClick={onGoogleClick}
              src="./img/btn_google_light_normal_ios.svg"
            />
            <span className="font-black">Google</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
