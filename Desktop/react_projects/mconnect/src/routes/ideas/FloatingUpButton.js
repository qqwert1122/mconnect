import "css/Animation.css";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/free-regular-svg-icons";

const FloatingUpButton = ({ floating, scrollY, setScrollY }) => {
  const handleFollow = () => {
    setScrollY(window.pageYOffset); // window 스크롤 값을 ScrollY에 저장
  };

  useEffect(() => {
    const watch = () => {
      window.addEventListener("scroll", handleFollow);
    };
    watch(); // addEventListener 함수를 실행
    return () => {
      window.removeEventListener("scroll", handleFollow); // addEventListener 함수를 삭제
    };
  });

  const onScrollTopClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <>
      {scrollY > 300 && (
        <div
          className={`opacity fixed ${
            floating ? "bottom-10" : "bottom-28"
          }  right-3 z-10`}
        >
          <button
            className="shadow-2xl rounded-full w-11 h-11 p-2 px-3 text-sm font-black border-4 border-stone-300 bg-stone-500 text-white"
            onClick={onScrollTopClick}
          >
            <FontAwesomeIcon icon={faAngleUp} />
          </button>
        </div>
      )}
    </>
  );
};

export default FloatingUpButton;
