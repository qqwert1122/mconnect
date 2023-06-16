import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
} from "firebase/auth";
import { authService } from "fbase";
import { faChevronLeft, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CreateNewAccount = ({ ...props }) => {
  const { navigate } = props;

  const onBackClick = () => {
    navigate("/auth");
  };

  const [alertMessage, setAlertMessage] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
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
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        authService
          .auth()
          .signOut()
          .then(function () {
            // 로그아웃 성공
            console.log("회원가입 후 자동 로그인이 방지되었습니다.");
            // 여기서 필요한 추가 작업을 수행할 수 있습니다.
          })
          .catch(function (error) {
            // 로그아웃 실패
            console.log("로그아웃 중 오류가 발생했습니다.", error);
          });

        // 이메일 확인 메일 전송
        user
          .sendEmailVerification()
          .then(function () {
            // 이메일 전송 성공
            console.log("이메일 확인 메일이 전송되었습니다.");
            // 여기서 필요한 추가 작업을 수행할 수 있습니다.
          })
          .catch(function (error) {
            // 이메일 전송 실패
            console.log("이메일 확인 메일 전송 중 오류가 발생했습니다.", error);
          });
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          setAlertMessage("이미 가입된 이메일입니다");
          return;
        }
        console.log(error.code);
      });
  };

  return (
    <div className="relative w-screen h-screen flex justify-center items-center ">
      <div className="fixed top-0 z-10 w-full p-3 flex gap-4 items-center shadow bg-white">
        <button onClick={onBackClick}>
          <FontAwesomeIcon icon={faChevronLeft} size="lg" />
        </button>
      </div>

      <div className="w-full">
        <div className="text-center">
          <span className="inline-flex mb-4 text-xl font-black px-3 py-1 ">
            회원가입
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
            />
            <br />
            <div className="h-8 text-red-400 text-xs animate-pulse">
              {alertMessage}
            </div>
            <div className="mx-20 mb-8 text-stone-300 text-xs">
              <FontAwesomeIcon icon={faInfoCircle} /> 본 서비스를 이용하는 모든
              사용자는 저작권 준수를 요구받습니다. 무단으로 타인의 저작물을
              사용하거나 복제하는 행위는 법률에 따라 처벌될 수 있습니다.
            </div>
            <br />
            <button
              className="w-64 h-10 p-2 m-2 rounded text-white bg-sky-400"
              onClick={onSubmit}
            >
              회원가입
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNewAccount;
