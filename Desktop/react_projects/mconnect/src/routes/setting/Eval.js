import "css/Animation.css";
import { addDoc, collection } from "firebase/firestore";
import { dbService } from "fbase";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "atom";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFaceGrin,
  faFaceGrinSquint,
  faFaceRollingEyes,
  faFaceSadTear,
  faPaperPlane,
  faFaceAngry,
} from "@fortawesome/free-regular-svg-icons";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";

const Eval = ({ ...props }) => {
  const loggedInUser = useRecoilValue(userState);
  const { onBackClick } = props;

  const [text, setText] = useState();
  function onChange(e) {
    if (e.target.value === " ") {
      setText("");
    } else {
      setText(e.target.value);
    }
    console.log(text);
  }

  const ratings = [
    {
      icon: <FontAwesomeIcon icon={faFaceGrinSquint} size="xl" />,
      color: "bg-blue-500 text-white",
      value: 5,
    },
    {
      icon: <FontAwesomeIcon icon={faFaceGrin} size="xl" />,
      color: "bg-sky-400 text-white",
      value: 4,
    },
    {
      icon: <FontAwesomeIcon icon={faFaceRollingEyes} size="xl" />,
      color: "bg-lime-400 text-white",
      value: 3,
    },
    {
      icon: <FontAwesomeIcon icon={faFaceSadTear} size="xl" />,
      color: "bg-orange-400 text-white",
      value: 2,
    },
    {
      icon: <FontAwesomeIcon icon={faFaceAngry} size="xl" />,
      color: "bg-red-400 text-white",
      value: 1,
    },
  ];
  const [ratingsPrmtr, setRatingsPrmtr] = useState(0);
  let rating = 5;
  const changePrmtr = (index, value) => {
    setRatingsPrmtr(index);
    rating = value;
  };

  async function onSubmit() {
    if (text === "") {
      toast.error("내용을 채워주세요", {
        theme: "colored",
      });
      return;
    } else {
      await addDoc(collection(dbService, "evaluation"), {
        userId: loggedInUser.userId,
        userName: loggedInUser.userName,
        date: dayjs().format("YYYY. MM. DD. HH:mm:ss"),
        rating: rating,
        text: text,
      });
      setRatingsPrmtr(0);
      setText("");
      rating = 5;
      toast.success("정상적으로 제출되었습니다", {
        theme: "colored",
      });
    }
  }

  return (
    <div className="moveRightToLeft">
      <div className="fixed top-0 z-10 w-full h-14 px-5 p-3 flex justify-between items-center shadow bg-white">
        <button onClick={onBackClick}>
          <FontAwesomeIcon icon={faChevronLeft} size="lg" />
        </button>
        <button onClick={onSubmit}>
          <FontAwesomeIcon icon={faPaperPlane} size="lg" />
        </button>
      </div>
      <div className="w-screen h-screen">
        <div className="pt-20 mx-5">
          <div className="mb-2 font-black">App을 평가해주세요</div>
          <div className="mb-5 flex gap-5 font-black">
            {ratings.map((rating, index) => (
              <button
                key={index}
                className={`${
                  index === ratingsPrmtr
                    ? rating.color
                    : "bg-stone-600 text-stone-500"
                } shadow-lg p-2 rounded text-xl duration-500`}
                onClick={() => changePrmtr(index, rating.value)}
              >
                {rating.icon}
              </button>
            ))}
          </div>
        </div>
        <textarea
          className="mx-auto m-10 p-5 w-11/12 h-2/3 flex rounded shadow-inner bg-stone-50 text-sm"
          placeholder="당신의 목소리를 자세히 들려주세요"
          value={text}
          onChange={onChange}
        />
      </div>
      <ToastContainer
        className="black-background"
        position="bottom-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Eval;
