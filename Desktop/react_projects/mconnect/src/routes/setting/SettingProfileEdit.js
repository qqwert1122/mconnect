import { useCallback, useRef, useState } from "react";
import { dbService } from "fbase";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/free-regular-svg-icons";
import CircularProgress from "@mui/material/CircularProgress";

const SettingProfileEdit = ({ loggedInUser, isEdit, setIsEdit }) => {
  const inputRef = useRef();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDuplicated, setIsDuplicated] = useState(false);

  const init = () => {
    setName("");
    setLoading(false);
    setIsDuplicated(false);
    setIsEdit(false);
  };

  const onCancle = () => init();

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
      if (value.length !== 0) {
        const q = query(
          collection(dbService, "users"),
          where("userName", "==", value)
        );
        const _nickNameCheck = await getDocs(q);
        loadingCallback(
          _nickNameCheck.docs.length == 0
            ? () => setIsDuplicated(false)
            : () => {
                inputRef.current.focus();
                setIsDuplicated(true);
              }
        );
      }
    }, 1000),
    []
  );

  const onChange = (e) => {
    nickNameCheck(e.target.value);
    setName(e.target.value);
  };

  const onSubmit = async () => {
    if (isDuplicated || name.length === 0) return;
    const userRef = doc(dbService, "users", loggedInUser.userId);
    await updateDoc(userRef, { userName: name });
    loadingCallback(() => setIsEdit(false));
    init();
  };

  return (
    <div
      className={`relative ${!isEdit && "hidden"} m-7 p-5 px-10
      relative  bg-gradient-to-tr from-orange-300 to-red-400 rounded shadow-lg`}
    >
      <div className="mb-2 flex gap-1 font-black text-white">
        <span>닉네임 변경</span>
        <span>({name.length}/20)</span>
      </div>
      <input
        ref={inputRef}
        className={`w-48 mb-2 ${
          name.length === 0 && "animate-pulse"
        } bg-transparent placeholder-white text-white ${
          name.length > 20 && "text-red-400"
        }`}
        type="text"
        placeholder="여기를 클릭해주세요"
        value={name}
        onChange={(e) => {
          onChange(e);
        }}
        maxLength={20}
      />
      <button
        className="absolute top-2 right-2 text-red-200"
        onClick={onCancle}
      >
        <FontAwesomeIcon icon={faXmarkCircle} size="lg" />
      </button>
      {loading ? (
        <span className="absolute bottom-1 right-2 text-white text-xs">
          <CircularProgress color="inherit" size={32} />
        </span>
      ) : (
        <button
          className={`absolute bottom-2 right-2 ${
            isDuplicated || name.length === 0 ? "text-red-300" : "text-white"
          } duration-100`}
          onClick={onSubmit}
        >
          <FontAwesomeIcon icon={faCircleCheck} size="2xl" />
        </button>
      )}
      {isDuplicated && (
        <div className="text-red-500 font-black text-xs">
          중복된 이름이 있습니다
        </div>
      )}
    </div>
  );
};

export default SettingProfileEdit;
