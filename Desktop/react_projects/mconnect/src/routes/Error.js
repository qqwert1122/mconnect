import "css/Animation.css";
import { useEffect, useRef, useState } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Error = ({ ...props }) => {
  const { navigate } = props;
  const [isMount, setIsMount] = useState(false);

  useEffect(() => {
    setIsMount(true);
  }, []);

  const onBackClick = () => {
    navigate("/contents");
  };
  return (
    <CSSTransition in={isMount} timeout={300} classNames="open">
      <div className="w-screen h-screen flex justify-center items-center">
        <div className="text-center">
          <img className="m-auto" width={150} src="./img/alert.png" />
          <p className="font-black">잠시 후 다시 시도해주세요</p>
          <button
            className="mt-10 bg-stone-600 text-white px-3 py-2 rounded-xl font-black text-sm"
            onClick={onBackClick}
          >
            돌아가기
          </button>
        </div>
      </div>
    </CSSTransition>
  );
};

export default Error;
