import ColoredIdeaList from "../ideas/writingIdea/ColoredIdeaList";
import { faCircleCheck as farCheck } from "@fortawesome/free-regular-svg-icons";
import {
  faCheck,
  faCircleCheck as fasCheck,
  faCircleNodes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar } from "@mui/material";
import { userState } from "atom";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import Typewriter from "typewriter-effect";

const Page6 = ({ page }) => {
  const loggedInUser = useRecoilValue(userState);
  const init = [
    {
      id: 1,
      name: loggedInUser.userName,
      photo: loggedInUser.userPhotoURL,
      text: "전기차 가격이 가솔린차 가격만큼 떨어지려면 kWh 당 배터리 가격이 83달러까지 떨어져야 한다",
      isChecked: false,
    },
    {
      id: 2,
      name: "CONNECTS",
      photo: "https://avatars.dicebear.com/api/miniavs/CONNECTS.svg",
      text: "배터리는 라이트의 법칙에 따라 누적 생산량이 두 배가 될 때마다 약 18%씩 가격이 떨어진다",
      isChecked: false,
    },
  ];
  const [samples, setSamples] = useState(init);
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [pressed, setPressed] = useState(false);
  const handleSelectMode = () => {
    setIsSelectMode((prev) => !prev);
  };
  const handleCheck = (v) => {
    setSamples(
      samples.map((_v) => {
        if (_v.id === v.id) {
          return { ..._v, isChecked: !_v.isChecked };
        } else return _v;
      })
    );
  };

  const text =
    "배터리 생산량 증가로 2025년경 배터리 가격이 kWh 당 83달러에 이르러 전기차 가격이 가솔린차 가격보다 저렴해진다";

  const renderTypewriter = () => {
    return (
      <Typewriter
        options={{
          cursor: "|",
          autoStart: true,
          delay: 50,
        }}
        onInit={(typewriter) => {
          typewriter.pauseFor(500).typeString(text).start();
        }}
      />
    );
  };

  const [typewriter, setTypewriter] = useState(renderTypewriter());

  useEffect(() => {
    setTypewriter(<></>);
    if (page === 5) {
      setIsSelectMode(false);
      setSamples(init);
      setPressed(false);
      setTimeout(() => setTypewriter(renderTypewriter()));
    }
  }, [page]);

  return (
    <div className="w-screen h-full flex-none">
      <div className="h-full flex justify-center items-center">
        <div
          className={`${
            page === 5 ? "right-0 opacity-100 " : "-right-10 opacity-0"
          } text-center duration-1000 text-stone-400`}
        >
          <div className="mb-2 text-xl text-orange-400 font-black">
            아이디어끼리 연결하세요
          </div>
          <div className="mb-10">
            내가 기록한 지식과, 다른 유저가 기록한 지식을
            <br />
            연결해 새롭고 창의적인 아이디어를 발견하세요
          </div>
          <div className="mx-4 mb-3 p-3 flex items-center justify-between shadow-2xl rounded">
            <div className="flex gap-2">
              <span>아이디어</span>
              <span className="w-6 px-2 flex items-center bg-stone-200 text-stone-400 text-center rounded-xl text-xs">
                2
              </span>
            </div>
            <button
              className="relative text-stone-600"
              onClick={handleSelectMode}
            >
              {isSelectMode ? (
                <FontAwesomeIcon icon={fasCheck} size="2xl" />
              ) : (
                <FontAwesomeIcon icon={farCheck} size="2xl" />
              )}
              {!isSelectMode && (
                <div className="absolute w-6 h-6 bottom-1 right-1 bg-rose-400 rounded-full animate-ping"></div>
              )}
            </button>
          </div>
          {samples.map((v, i) => (
            <div
              key={i}
              className={`relative mx-auto w-72 p-3 border border-stone-100 text-left text-xs ${
                i === samples.length - 1 ? "shadow-lg" : "shadow-sm"
              }`}
            >
              <div className="pb-4 flex items-center text-xs">
                <button
                  className={`relative rounded-full ${
                    v.isChecked
                      ? "bg-red-400 text-white"
                      : "border-2 border-stone-400"
                  } ${
                    isSelectMode ? "visible w-5 h-5 mr-2" : "invisible w-0 h-0"
                  } duration-100`}
                  onClick={() => handleCheck(v)}
                >
                  {v.isChecked && <FontAwesomeIcon icon={faCheck} />}
                  {!v.isChecked && isSelectMode && (
                    <div className="absolute w-4 h-4 bottom-0 right-0 bg-red-400 rounded-full animate-ping"></div>
                  )}
                </button>

                <Avatar
                  className="border-2 mr-1"
                  alt="avatar"
                  src={v.photo}
                  sx={{
                    display: "flex",
                    width: "25px",
                    height: "25px",
                  }}
                />
                <span style={{ fontSize: "8px" }}>{v.name}</span>
              </div>
              <div>{v.text}</div>
            </div>
          ))}

          <div className="flex justify-end">
            <button
              className={`relative bottom-5 z-10 flex gap-2 shadow-2xl rounded-full px-4 p-2 text-sm duration-200 border-4   ${
                samples.filter((v) => v.isChecked === true).length === 2 &&
                !pressed
                  ? "right-0 opacity-100 bg-gradient-to-tr from-rose-400 to-orange-400 text-orange-100 border-orange-200 animate-bounce"
                  : "-right-3 opacity-0"
              }`}
              onClick={() => setPressed(true)}
            >
              <FontAwesomeIcon icon={faCircleNodes} size="lg" />
              연결
            </button>
          </div>

          <div
            className={`mb-10 mx-auto relative w-72 shadow-md 
           ${pressed ? "h-24 opacity-100" : "h-0 opacity-0"}
           duration-500 text-orange-400 shadow-orange-200`}
          >
            {pressed && (
              <div className="p-4 text-left text-sm">{typewriter}</div>
            )}
            <span className="absolute right-0 bottom-0">
              <ColoredIdeaList ideas={samples} small={true} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page6;
