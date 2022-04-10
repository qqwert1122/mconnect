import { authService, provider, signInWithPopup } from "fbase";
import React from "react";

const Auth = () => {
  const onClick = async (event) => {
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
    <div class="w-screen h-screen flex justify-center items-center">
      <h1 class="text-6xl font-extrabold">반갑습니다</h1>
      <br />
      <div class="bg-green-200">
        <button class="flex" onClick={onClick}>
          <img src="img/btn_google_signin_light_normal_web.png" />
        </button>
      </div>
    </div>
  );
};

export default Auth;
