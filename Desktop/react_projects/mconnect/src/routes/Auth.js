import "css/App.css";
import { authService, provider, signInWithPopup } from "fbase";
import React from "react";

const Auth = () => {
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

  return (
    <div class="relative w-screen h-screen flex flex-wrap justify-center content-center">
      <div>
        <h2 class="english__font text-5xl">Welcome to</h2>
        <h2 class="highlight english__font text-5xl">Connecteas</h2>
      </div>
      <h3 class="mt-16 text-xl font-bold">간편하게 회원가입/로그인 하기</h3>

      <button class="flex" onClick={onGoogleClick}>
        <img
          class="mt-8"
          style={{
            width: "auto",
            height: "4rem",
          }}
          src="img/btn_google_signin_light_normal_web.png"
        />
      </button>
    </div>
  );
};

export default Auth;
