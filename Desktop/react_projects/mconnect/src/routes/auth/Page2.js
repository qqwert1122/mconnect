import {
  faBookmark,
  faCompass,
  faHeart,
} from "@fortawesome/free-regular-svg-icons";
import { faHashtag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar } from "@mui/material";
import { userState } from "atom";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import Typewriter from "typewriter-effect";

const Page2 = ({ page }) => {
  const loggedInUser = useRecoilValue(userState);
  const comment =
    "전기차 가격이 가솔린차 가격만큼 떨어지려면 kWh 당 배터리 가격이 83달러까지 떨어져야 한다";
  const [pressed, setPressed] = useState(false);
  const [isEnd, setIsEnd] = useState(false);

  const renderTypewriter = () => {
    return (
      <Typewriter
        options={{
          cursor: "|",
          autoStart: true,
          delay: 50,
        }}
        onInit={(typewriter) => {
          typewriter
            .pauseFor(500)
            .typeString(comment)
            .pauseFor(100)
            .callFunction(() => {
              setIsEnd(true);
            })
            .start();
        }}
      />
    );
  };

  const [typewriter, setTypewriter] = useState(renderTypewriter());

  useEffect(() => {
    setTypewriter(<></>);
    if (page === 1) {
      setPressed(false);
      setIsEnd(false);
      setTimeout(() => setTypewriter(renderTypewriter()));
    }
  }, [page]);

  const handlePress = () => {
    setPressed(true);
  };

  return (
    <div className="w-screen h-full flex-none">
      <div className="h-full flex justify-center items-center">
        <div
          className={`${
            page === 1 ? "right-0 opacity-100 " : "-right-10 opacity-0"
          } text-center relative duration-1000 text-stone-400`}
        >
          <div className="mb-2 text-xl text-orange-400 font-black">
            아이디어를 기록하세요
          </div>
          <span>
            발견한 지식과 아이디어를
            <br />
            간단하게 한두 줄로 기록하세요
          </span>
          <div
            className={`mt-10 relative w-72  shadow-lg ${
              pressed ? "opacity-0 h-0" : "h-44 opacity-100"
            } duration-500`}
          >
            <div className=" p-2 flex justify-end shadow">
              <button
                className={`relative ${
                  !pressed && isEnd
                    ? "bg-gradient-to-tr from-rose-400 to-orange-400 text-orange-100"
                    : "bg-stone-200 text-stone-400"
                }  p-1 px-2 rounded font-black text-sm text-center shadow-md`}
                onClick={handlePress}
                disabled={!isEnd}
              >
                작성
                <div
                  className={`absolute bottom-1 left-1 w-8 h-5 bg-rose-400 rounded ${
                    !pressed && isEnd ? "animate-ping" : "opacity-0"
                  }`}
                ></div>
              </button>
            </div>
            <div className="p-4 text-left text-sm">
              {pressed ? "" : typewriter}
            </div>
            {!pressed && (
              <div
                className={`absolute ${
                  isEnd ? "bottom-2 opacity-100" : "bottom-0 opacity-0"
                } left-5 duration-100 text-xs`}
              >
                <FontAwesomeIcon icon={faHashtag} size="xs" /> 전기차, 배터리
              </div>
            )}
          </div>
          <div
            className={`mt-10 relative w-72 ${
              pressed ? "bottom-0 opacity-100" : "h-0 -bottom-10 opacity-0"
            } p-3 text-left shadow-lg duration-500`}
          >
            <div className="pb-4 flex items-center gap-2 text-xs">
              <Avatar
                className="border-2 mr-1"
                alt="avatar"
                src={loggedInUser.userPhotoURL}
                sx={{
                  display: "flex",
                  width: "25px",
                  height: "25px",
                }}
              />
              <span>{loggedInUser.userName}</span>
            </div>
            <div className="pb-4 text-sm">{comment}</div>
            <div className="flex gap-4 ">
              <span className="text-red-400">
                <FontAwesomeIcon icon={faHeart} />
              </span>
              <span className="text-orange-400">
                <FontAwesomeIcon icon={faBookmark} />
              </span>
              <span className="text-sky-400">
                <FontAwesomeIcon icon={faCompass} />
                <div className=""></div>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page2;
