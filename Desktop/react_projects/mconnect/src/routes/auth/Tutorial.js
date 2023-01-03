import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import Typewriter from "typewriter-effect";

const Tutorial = ({ ...props }) => {
  const { onBackClick } = props;
  const texts = [
    `
      <div style="font-size: 2.5rem; line-height: 1">안녕하세요 :)</div>
      <div style="font-size: 1.75rem; line-height: 2rem"><span style="font-size: 1.25rem;">Connects</span>는 일상에서 발견한</div>
      <div style="font-size: 1.75rem; line-height: 2rem"><span style="color: #ef4444">번뜩이는 아이디어</span>를</div>
      <div style="font-size: 1.75rem; line-height: 2rem"><span style="color: #f87171">기록</span>하고, <span style="color: #f87171">공유</span>하고, <span style="color: #f87171">연결</span>해</div>
      <div style="font-size: 1.75rem; line-height: 2rem">사용자가 <span style="color: #fca5a5">새로운 아이디어</span>를</div>
      <div style="font-size: 1.75rem; line-height: 2rem">발견하도록 돕는 도구입니다</div>
    `,
    `
      <div style="font-size: 1.75rem; line-height: 2rem">경제, 정치 등 다양한 분야의</div>
      <div style="font-size: 1.75rem; line-height: 2rem"><span style="color: #ef4444">정보, 아이디어를 직접 기록</span>하고,</div>
    `,
    `  
      <div style="font-size: 1.75rem; line-height: 2rem">다른 사람들의 다양한 아이디어를</div>
      <div style="font-size: 1.75rem; line-height: 2rem"><span style="color: #f87171">탐색하고 저장</span>하세요</div>
    `,
    `
      <div style="font-size: 1.75rem; line-height: 2rem"><span style="color: #fca5a5">수집한 아이디어들을 서로 연결</span>해</div>
      <div style="font-size: 1.75rem; line-height: 2rem">새롭고 멋진 아이디어를 발견하세요</div>
    `,
  ];

  const [pressed, setPressed] = useState(false);
  const [canPress, setCanPress] = useState(true);
  const [number, setNumber] = useState(1);
  const [showPic, setShowPic] = useState(false);

  const onNextClick = () => {
    setShowPic(false);
    setPressed((prev) => !prev);
    setTimeout(() => {
      setCanPress(false);
    }, 1000);
    if (number < texts.length) {
      setNumber((number) => number + 1);
      setComment(texts[number]);
    } else {
      setNumber(1);
      setComment(texts[0]);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setPressed(false);
    }, 1000);
  }, [pressed]);

  const [comment, setComment] = useState(texts[0]);

  const renderTypewriter = () => {
    return (
      <span className="tutorial__font">
        <Typewriter
          options={{
            cursor: "",
            autoStart: true,
          }}
          onInit={(typewriter) => {
            typewriter
              .pauseFor(500)
              .typeString(comment)
              .callFunction(() => {
                setShowPic(true);
                setCanPress(true);
              })
              .pauseFor(5000)
              .deleteAll()
              .start();
          }}
        />
      </span>
    );
  };

  const [typewriter, setTypewriter] = useState(renderTypewriter());

  useEffect(() => {
    setTypewriter(<></>);
    setTimeout(() => setTypewriter(renderTypewriter()));
  }, [comment]);

  return (
    <div className=" relative w-screen h-screen">
      <div className="pt-16 pl-5">{typewriter}</div>
      <img
        className={`absolute bottom-52 right-10 ${
          number === 2 && showPic
            ? "visible opacity-100"
            : "invisible opacity-0"
        } duration-500`}
        width={150}
        src="./img/info_1.png"
      />
      <img
        className={`absolute bottom-52 right-10 ${
          number === 3 && showPic
            ? "visible opacity-100"
            : "invisible opacity-0"
        } duration-500`}
        width={150}
        src="./img/info_2.png"
      />
      <img
        className={`absolute bottom-52 right-10 ${
          number === 4 && showPic
            ? "visible opacity-100"
            : "invisible opacity-0"
        } duration-500`}
        width={150}
        src="./img/info_3.png"
      />
      <button
        className="absolute bottom-14 left-11 text-stone-300 text-3xl"
        onClick={onBackClick}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      {canPress && (
        <button onClick={onNextClick}>
          <div
            className={`absolute right-11 bottom-11 w-16 h-16 animate-ping rounded-full ${
              pressed ? "bg-red-400" : "bg-stone-200"
            } duration-500 `}
          ></div>
          <div
            className={`absolute right-14 bottom-14 w-10 h-10 rounded-full ${
              pressed ? "bg-red-400" : "bg-stone-200"
            } duration-500 `}
          ></div>
        </button>
      )}
    </div>
  );
};

export default Tutorial;
