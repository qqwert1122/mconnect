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
  const [isDuplicated, setIsDuplicated] = useState(false);
  const [isShort, setIsShort] = useState(false);

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

  const nickNameCheck = useCallback(
    _debounce(async (value) => {
      const q = query(
        collection(dbService, "users"),
        where(
          "userName",
          "==",
          value === "" ? authService.currentUser.displayName : value
        )
      );
      const _nickNameCheck = await getDocs(q);
      loadingCallback(
        _nickNameCheck.docs.length == 0
          ? () => setIsDuplicated(false)
          : () => {
              setIsDuplicated(true);
            }
      );
    }, 1000),
    []
  );

  const onChange = (e) => {
    if (e.target.value.length < 2 && e.target.value.length > 0) {
      setIsShort(true);
      setName(e.target.value);
    } else {
      setIsShort(false);
      nickNameCheck(e.target.value);
      setName(e.target.value);
    }
  };

  const onSpaceKeyDown = (e) => {
    if (e.key === " ") {
      e.preventDefault();
    }
  };

  const onSubmit = async () => {
    if (isDuplicated || isShort) return;
    const q = query(
      collection(dbService, "users"),
      where(
        "userName",
        "==",
        name === "" ? authService.currentUser.displayName : name
      )
    );
    const _nickNameCheck = await getDocs(q);
    if (_nickNameCheck.docs.length > 0) return;

    await setDoc(doc(dbService, "users", authService.currentUser.uid), {
      userId: authService.currentUser.uid,
      userEmail: authService.currentUser.email,
      userName: name === "" ? authService.currentUser.displayName : name,
      userPhotoURL: `https://avatars.dicebear.com/api/miniavs/${
        name === "" ? authService.currentUser.displayName : name
      }.svg`,
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
      <div className="pt-32 p-8">
        <div className="relative flex justify-center mb-16">
          <Avatar
            alt="avatar"
            src={`https://avatars.dicebear.com/api/miniavs/${
              name === "" ? authService.currentUser.displayName : name
            }.svg`}
            sx={{
              display: "flex",
              width: "150px",
              height: "150px",
              borderWidth: "2px",
            }}
          />
        </div>
        <div
          className={`font-black text-lg mb-2 ${
            name.length > 20 && "text-red-400"
          }`}
        >
          닉네임을 입력하세요
        </div>
        <div className="flex items-center mb-5 gap-5">
          <input
            ref={userNameRef}
            type="text"
            name="inputUserName"
            className={`w-60 border-b-2 text-lg `}
            placeholder={authService.currentUser.displayName}
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
                isDuplicated || isShort ? "text-stone-200" : "text-sky-300"
              } duration-500`}
            >
              <FontAwesomeIcon icon={faCircleCheck} size="2xl" />
            </button>
          )}
        </div>
        {isShort && (
          <div className="text-red-400 font-black text-xs mb-2">
            닉네임은 2글자 이상이어야 합니다
          </div>
        )}
        {isDuplicated && (
          <div className="text-red-400 font-black text-xs mb-2">
            중복된 닉네임이 있습니다
          </div>
        )}
        <div className="text-xs text-stone-400 mb-10">
          최소 2글자, 최대 20글자,
          <span className={`${isShort && "text-red-400"}`}>
            현재&nbsp;
            {name.length === 0
              ? authService.currentUser.displayName.length
              : name.length}
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
            isDuplicated || isShort ? "bg-stone-200" : "bg-sky-400"
          } rounded-t-xl`}
          onClick={onSubmit}
        >
          가입하고 아이디어 남기러 가기
        </button>
      </div>
    </div>
  );
};

export default SignUp;
