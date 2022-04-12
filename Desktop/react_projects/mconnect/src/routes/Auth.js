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
        <h1 class="text-5xl  font-bold ">환영합니다,</h1>
        <h2 class="text-3xl font-bold">바사아자차카파타하</h2>
        <h2 class="text-3xl font-bold">아야어여오요우유.</h2>
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
