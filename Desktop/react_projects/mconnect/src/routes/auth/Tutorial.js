import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

const Tutorial = ({ ...props }) => {
  const { onBackClick } = props;
  const contents = ["1", "2", "3"];
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
    setPage((page) => page + 1);
  };

  return (
    <div className="relative w-screen h-screen">
      <button className="bg-white p-2" onClick={onBackClick}>
        back
      </button>
      <div className="mt-16 overflow-hidden">
        <div className="flex duration-200" style={style}>
          <div className="w-screen p-2 flex-none bg-red-200">1번</div>
          <div className="w-screen p-2 flex-none bg-red-400">2번</div>
          <div className="w-screen p-2 flex-none bg-red-600">3번</div>
        </div>
      </div>
      {/* <ul className={`pb-10`}>
        <Slider {...settings}>
          <li className="relative p-5 w-full h-32 bg-gradient-to-r from-orange-300 to-pink-300 text-orange-100 text-sm shadow">
            <div className="w-3/5 font-bold">
              <h1 className="mb-2 font-black text-xl text-white">기록하세요</h1>
              <p>경제, 정치, 기술 무엇이든</p>
              <p>기록하세요</p>
            </div>
            <img
              className="absolute top-4 right-10"
              width={100}
              src="./img/info_1.png"
            />
          </li>
          <li className="relative p-5 w-full h-32 bg-gradient-to-r from-pink-300 to-red-300 text-red-100 text-sm shadow">
            <div className="w-3/5 font-bold">
              <h1 className="mb-2 font-black text-xl text-white">저장하세요</h1>
              <p>다른 사람들의 아이디어를</p>
              <p>탐색하고 저장하세요</p>
            </div>
            <img
              className="absolute top-4 right-10"
              width={100}
              src="./img/info_2.png"
            />
          </li>
          <li className="relative p-5 w-full h-32 bg-gradient-to-r from-red-300 to-orange-300 text-orange-100 text-sm shadow">
            <div className="w-3/5 font-bold">
              <h1 className="mb-2 font-black text-xl text-white">연결하세요</h1>
              <p>아이디어들을 연결해</p>
              <p>새로운 아이디어를 찾으세요</p>
            </div>
            <img
              className="absolute top-4 right-10"
              width={100}
              src="./img/info_3.png"
            />
          </li>
        </Slider>
      </ul> */}
      <div className="absolute bottom-24 right-6 flex gap-2">
        {contents.map((v, i) => (
          <div
            key={i}
            className={`${
              i === page ? "w-7 bg-orange-400" : "w-2 bg-stone-200"
            } h-2 rounded-full  duration-500`}
          ></div>
        ))}
      </div>
      <button
        className={`absolute w-12 h-12 bottom-5 right-5 ${
          page === 2
            ? "bg-stone-100 text-stone-200"
            : "bg-gradient-to-b from-orange-300 to-orange-500 text-orange-50"
        } duration-500 shadow-xl rounded-2xl text-lg font-black`}
        onClick={handleNext}
        disabled={page === 2}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
      <button
        className={`absolute w-12 h-12 bottom-5 left-5  ${
          page === 0 ? "text-stone-200" : "text-stone-400"
        } text-lg font-black`}
        onClick={handleBack}
        disabled={page === 0}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
    </div>
  );
};

export default Tutorial;
