import "css/Animation.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAd,
  faBookmark,
  faChevronLeft,
  faCircle,
  faEllipsisVertical,
  faHeart,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import {
  faPenToSquare,
  faTrashCan,
  faCopy,
} from "@fortawesome/free-regular-svg-icons";

const AlarmPage = ({ ...props }) => {
  const { navigate } = props;

  const onBackClick = () => {
    navigate(-1);
  };

  const arr = [
    {
      name: "무한으로즐겨요 명륜진사갈비",
      type: "좋아요",
      text: "미국 연방준비제도(Fed, 연준)의 금리인상 공포가 되살아나면서 22일 아시아 주요국 증시가 중국을 제외하고 일제히 하락했다",
      date: "1분 전",
      isClicked: false,
    },
    {
      name: "Stephan",
      type: "좋아요",
      text: "증권가에서는 별다른 호재가 보이지 않는 만큼 쏘카의 주가는 당분간 약세·횡보할 것이란 전망이 나온다.",
      date: "3시간 전",
      isClicked: true,
    },
    {
      name: "May",
      type: "저장",
      text: "한승한 SK증권 연구원은 “단기적으로는 주가 약세가 전망되나 장기적으로 수익성이 확인될 시 상승 동력을 가져올 수 있을 것”이라며 “당분간은 쏘카 자체 이슈보다는 매크로 환경이 주요하며 올 하반기 실적이 매우 중요하다”고 분석했다.",
      date: "3일 전",
      isClicked: false,
    },
    {
      name: "둔산동 검둥오리",
      type: "저장",
      text: "경기 침체 공포감이 커지고 있는 상황에서 글로벌 소비 시장의 양극화 양상이 나타나고 있는데요.",
      date: "7일 전",
      isClicked: true,
    },
    {
      name: "Yang",
      type: "좋아요",
      text: "베블렌 효과는 사치재의 가격이 오르면 수요도 함께 증가하는 소비 현상을 말합니다.",
      date: "1개월 전",
      isClicked: false,
    },
  ];

  return (
    <>
      <div className="fixed top-0 z-10 w-full h-14 p-3 flex justify-between items-center shadow bg-white">
        <button onClick={onBackClick}>
          <FontAwesomeIcon icon={faChevronLeft} size="lg" />
        </button>
      </div>
      <div className="pt-14 bg-stone-50">
        {arr.map((data, index) => (
          <>
            <div
              key={index}
              className={`relative m-3 mx-5 mb-5 p-3 pb-10 ${
                data.isClicked
                  ? "bg-white"
                  : "bg-gradient-to-tr from-rose-400 to-orange-400 text-orange-100"
              } rounded-xl shadow-xl text-sm`}
            >
              <span className="font-black">{data.name}</span>님이{" "}
              {data.type === "좋아요" && "당신의 아이디어를 좋아합니다"}
              {data.type === "저장" && "당신의 아이디어를 저장했습니다"}
              <div
                className={`${
                  data.isClicked ? "text-stone-400" : "text-orange-300"
                } line-clamp-2 text-xs mt-2`}
              >
                {data.text}
              </div>
              <span
                className={`absolute right-3 bottom-2 text-xs ${
                  data.isClicked ? "text-stone-400" : "text-orange-100"
                }`}
              >
                @ {data.date}
              </span>
              {data.type === "좋아요" && (
                <span
                  className={`absolute left-3 bottom-1 ${
                    data.isClicked ? "text-red-400" : "text-orange-100"
                  } `}
                >
                  <FontAwesomeIcon icon={faHeart} size="lg" />
                </span>
              )}
              {data.type === "저장" && (
                <span
                  className={`absolute left-3 bottom-1 ${
                    data.isClicked ? "text-orange-400" : "text-orange-100"
                  }`}
                >
                  <FontAwesomeIcon icon={faBookmark} size="lg" />
                </span>
              )}
            </div>
          </>
        ))}
      </div>
      <div className="p-5 pb-10 text-center text-stone-400">
        최근 알림 5개만 보입니다
      </div>
      <div className="py-6 bg-stone-600 text-stone-400 text-sm text-center font-black ">
        광고 <FontAwesomeIcon icon={faAd} />
      </div>
    </>
  );
};

export default AlarmPage;
