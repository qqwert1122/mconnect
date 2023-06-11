import "css/App.css";
import "css/Gradient.css";
import { useCallback, useRef, useState } from "react";
import { authService, dbService } from "fbase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { v4 } from "uuid";
import Avatar from "@mui/material/Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import dayjs from "dayjs";
import CircularProgress from "@mui/material/CircularProgress";

const SignUp = ({ ...props }) => {
  const { setLoggedInUser, setIsLoggedIn, navigate } = props;

  const userNameRef = useRef();

  const [name, setName] = useState("");

  const [loading, setLoading] = useState(false);
  const [off, setOff] = useState(true);
  const [message, setMessage] = useState("닉네임이 너무 짧습니다");

  const loadingCallback = (callback) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      callback();
    }, 1000);
  };

  const _debounce = (callback, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => callback(...args), delay);
    };
  };

  const isSimilarToAdminName = (username) => {
    var adminNamePattern = /admin/i;
    var reservedUsernames = [
      "admin",
      "administrator",
      "superuser",
      "connect",
      "connects",
      "Connect",
      "Connects",
      "CONNECT",
      "CONNECTS",
      "관리자",
      "매니저",
      "운영진",
      "운영자",
      "직원",
      "대표자",
      "어드민",
      "최고관리자",
      "루트",
      "시스템관리자",
      "root",
      "rootadmin",
    ];
    if (adminNamePattern.test(username)) {
      return true;
    }
    if (reservedUsernames.includes(username.toLowerCase())) {
      return true;
    }
    return false;
  };

  const isDuplicated = useCallback(
    _debounce(async (value) => {
      const q = query(
        collection(dbService, "users"),
        where("userName", "==", value)
      );
      const _nickNameCheck = await getDocs(q);
      loadingCallback(
        _nickNameCheck.docs.length == 0
          ? () => {
              return true;
            }
          : () => {
              return false;
            }
      );
    }, 1000),
    []
  );

  const isShort = (m) => {
    if (m.length < 2) return true;
    else return false;
  };

  const onChange = (e) => {
    setName(e.target.value);
    if (isShort(e.target.value)) {
      setMessage("닉네임이 너무 짧습니다");
      setOff(true);
      return;
    }
    if (isSimilarToAdminName(e.target.value)) {
      setMessage("사용 불가능한 닉네임입니다");
      setOff(true);
      return;
    }
    if (isDuplicated(e.target.value)) {
      setMessage("이미 사용 중인 닉네임입니다");
      setOff(true);
      return;
    }
    setMessage("");
    setOff(false);
  };

  const onSpaceKeyDown = (e) => {
    if (e.key === " ") {
      e.preventDefault();
    }
  };

  const onSubmit = async () => {
    if (off) return;

    await setDoc(doc(dbService, "users", authService.currentUser.uid), {
      userId: authService.currentUser.uid,
      userEmail: authService.currentUser.email,
      userName: name,
      userPhotoURL: `https://avatars.dicebear.com/api/miniavs/${name}.svg`,
      isAdRemoved: false,
      isAuthority: false,
      isOfficial: false,
      setting: {
        isSimpleMode: false,
        isDarkMode: false,
      },
      achievement: {},
      createdAt: dayjs().format("YYYY. MM. DD. HH:mm:ss"),
      lastVisitedAt: dayjs().format("YYYY. MM. DD. HH:mm:ss"),
      visitCount: 1,
      idea_count: 0,
    });
    const registeredUser = (
      await getDoc(doc(dbService, "users", authService.currentUser.uid))
    ).data();
    setIsLoggedIn(true);
    setLoggedInUser(registeredUser);
  };

  return (
    <div className="relative w-screen h-screen bg-white">
      <div className="p-4 text-lg font-black">프로필</div>
      <div className="pt-20 p-8">
        <div className="relative flex justify-center mb-16">
          <div>
            <Avatar
              alt="avatar"
              src={`https://avatars.dicebear.com/api/miniavs/${name}.svg`}
              sx={{
                display: "flex",
                width: "150px",
                height: "150px",
                borderWidth: "2px",
              }}
            />
            <br />
            <div className="text-center h-8 font-black">{name}</div>
          </div>
        </div>
        <div
          className={`font-black text-lg mb-2 ${
            name.length > 20 && "text-red-400"
          }`}
        >
          이름(닉네임)을 입력하세요
        </div>
        <div className="flex items-center mb-5 gap-5">
          <input
            ref={userNameRef}
            type="text"
            name="inputUserName"
            className={`p-2 w-60 border-b-2`}
            placeholder="여기에 입력하세요"
            value={name}
            onChange={onChange}
            onKeyDown={onSpaceKeyDown}
            maxLength="20"
            autoComplete="off"
          />
          {loading ? (
            <span className="text-black text-xs">
              <CircularProgress color="inherit" size={28} />
            </span>
          ) : (
            <button
              className={`${
                off ? "text-stone-200" : "text-sky-300"
              } duration-500`}
            >
              <FontAwesomeIcon icon={faCircleCheck} size="2xl" />
            </button>
          )}
        </div>

        <div className="h-6 text-red-400 font-black text-xs">{message}</div>

        <div className="text-xs text-stone-400 mb-10">
          최소 2글자, 최대 20글자,
          <span className={`${isShort(name) && "text-red-400"}`}>
            현재&nbsp;
            {name.length}
            글자
          </span>
        </div>

        <input
          className="hidden"
          id="inputUserPhotoURL"
          type="file"
          accept="image/*"
        />
      </div>
      <div className="z-10 fixed bottom-0 w-full h-16">
        <button
          className={`w-full h-full font-black text-white ${
            off ? "bg-stone-200" : "bg-sky-400"
          }`}
          onClick={onSubmit}
        >
          등록하기
        </button>
      </div>
    </div>
  );
};

export default SignUp;
