import "css/App.css";
import {
  faChevronLeft,
  faChevronRight,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import Page1 from "./Page1";
import Page2 from "./Page2";
import Page3 from "./Page3";
import Page4 from "./Page4";
import Page5 from "./Page5";
import Page6 from "./Page6";

const Tutorial = ({ ...props }) => {
  const { onBackClick } = props;
  const contents = ["1", "2", "3", "4", "5", "6"];
  let lastPage = contents.length - 1;
  const [page, setPage] = useState(0);
  const [style, setStyle] = useState({
    marginLeft: `-${page}00%`,
  });

  useEffect(() => {
    setStyle({ marginLeft: `-${page}00%` });
  }, [page]);

  const handleBack = () => {
    setPage((page) => page - 1);
  };
  const handleNext = () => {
    if (page === lastPage) {
      onBackClick();
    } else {
      setPage((page) => page + 1);
    }
  };

  return (
    <div className="relative w-screen h-screen">
      <div
        className="px-8 flex justify-between items-center"
        style={{
          height: "10%",
        }}
      >
        <button className="bg-white text-stone-300" onClick={onBackClick}>
          <FontAwesomeIcon icon={faXmark} size="lg" />
        </button>
        <div className="flex gap-2">
          {contents.map((v, i) => (
            <div
              key={i}
              className={`${
                i === page ? "w-7 bg-orange-400" : "w-2 bg-stone-200"
              } h-2 rounded-full  duration-500`}
            ></div>
          ))}
        </div>
      </div>
      <div
        className="overflow-hidden"
        style={{
          height: "90%",
        }}
      >
        <div className="flex h-full duration-200 " style={style}>
          <Page1 page={page} />
          <Page2 page={page} />
          <Page3 page={page} />
          <Page4 page={page} />
          <Page5 page={page} />
          <Page6 page={page} />
        </div>
      </div>

      <button
        className={`${
          page === lastPage ? "px-4 text-base" : "w-12 text-lg"
        } absolute h-12 bottom-5 right-5 bg-gradient-to-b from-orange-300 to-orange-500 text-orange-50 duration-500 shadow-xl rounded-2xl font-black`}
        onClick={handleNext}
      >
        {page === lastPage ? (
          "새 아이디어를 찾으러!"
        ) : (
          <FontAwesomeIcon icon={faChevronRight} />
        )}
      </button>
      <button
        className={`absolute w-12 h-12 bottom-5 left-5  ${
          page === 0 ? "opacity-0" : "opacity-100 text-stone-400"
        } text-lg font-black duration-500`}
        onClick={handleBack}
        disabled={page === 0}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
    </div>
  );
};

export default Tutorial;
