import "css/App.css";
import "css/Gradient.css";
import React, { useCallback, useState } from "react";
import { authService, provider, signInWithPopup } from "fbase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useSetRecoilState } from "recoil";
import { userState } from "atom";
import CircularProgress from "@mui/material/CircularProgress";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Auth = ({ ...props }) => {
  const { setNavValue, navigate } = props;

  const [alertMessage, setAlertMessage] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberEmail, setRememberEmail] = useState(true);

  const handleRememberEmail = (e) => {
    setRememberEmail(e.target.checked);
  };

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const clearPassword = () => {
    setPassword("");
  };

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(email);
  };

  const onSubmit = () => {
    if (email.length < 1) {
      setAlertMessage("이메일을 입력하세요");
      return;
    }
    if (!validateEmail(email)) {
      setAlertMessage("유효하지 않은 이메일입니다");
      return;
    }
    if (password.length < 1) {
      setAlertMessage("비밀번호를 입력하세요");
      return;
    }

    setAlertMessage("");
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setAlertMessage("이메일 혹은 비밀번호가 일치하지 않습니다");
      });
  };

  const onCreateNewAccountClick = () => {
    navigate("/createnewaccount");
  };

  return (
    <div className="relative w-screen h-screen flex justify-center items-center ">
      <div className="w-full">
        <img className="m-auto mb-24" width={250} src="./img/text_logo.svg" />
        <div className="text-center">
          <span className="inline-flex mb-4 text-xl font-black px-3 py-1 ">
            로그인
          </span>
          <div className="mb-2">
            <input
              className="m-2 p-2 border border-stone-300 placeholder-stone-400 rounded w-64 h-8 text-sm"
              placeholder="이메일 주소"
              type="text"
              value={email}
              onChange={onEmailChange}
            />
            <br />
            <input
              className="m-2 p-2 border border-stone-300 placeholder-stone-400 rounded w-64 h-8 text-sm"
              placeholder="비밀번호"
              type="password"
              value={password}
              onChange={onPasswordChange}
              onClick={clearPassword}
            />
            <br />
            <br />
            <div className="flex justify-center gap-2">
              <input
                type="checkbox"
                id="re"
                checked={rememberEmail}
                onChange={(e) => handleRememberEmail(e)}
              />
              <label
                className={`text-sm  ${
                  rememberEmail ? "text-sky-400" : "text-stone-400"
                }`}
                for="re"
              >
                이메일 기억하기
              </label>
            </div>
          </div>
          <div className="h-8 mb-8 text-red-400 text-xs animate-pulse">
            {alertMessage}
          </div>
          <div className="relative mb-20">
            <button
              className="w-64 h-10 p-2 m-2 rounded text-white bg-sky-400"
              onClick={onSubmit}
            >
              로그인
            </button>
            <br />
            <button
              className="w-64 h-10 p-2 m-2 rounded text-sky-400 border-sky-400 border"
              onClick={onCreateNewAccountClick}
            >
              회원가입
            </button>
            <br />
          </div>
          <div className="gap-4 flex items-center justify-center text-xs text-stone-300">
            <button className="p-2">아이디 찾기</button>|
            <button className="p-2">비밀번호 재설정</button>
          </div>
        </div>
      </div>
      <div className="mb-2 absolute bottom-0 text-stone-300 text-xs">
        Copyright (c) 2023, Connect, All rights reserved
      </div>
    </div>
  );
};

export default Auth;
