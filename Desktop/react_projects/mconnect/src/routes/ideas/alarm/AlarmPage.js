import "css/Animation.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faChevronLeft,
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
      date: "1분 전",
      isClicked: false,
    },
    { name: "Stephan", type: "좋아요", date: "3시간 전", isClicked: true },
    { name: "May", type: "저장", date: "3일 전", isClicked: false },
    {
      name: "둔산동 검둥오리",
      type: "저장",
      date: "7일 전",
      isClicked: true,
    },
    { name: "Yang", type: "좋아요", date: "1개월 전", isClicked: false },
  ];

  return (
    <div className="moveRightToLeft">
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
              } rounded-xl shadow-xl`}
            >
              <span className="font-black">{data.name}</span>님이{" "}
              {data.type === "좋아요" && "당신의 아이디어를 좋아합니다"}
              {data.type === "저장" && "당신의 아이디어를 저장했습니다"}
              <span
                className={`absolute right-3 bottom-2 text-xs ${
                  data.isClicked ? "text-stone-400" : "text-orange-100"
                }`}
              >
                @{data.date}
              </span>
              <span
                className={`absolute -right-1 -top-1 text-center text-orange-400 ${
                  data.isClicked ? "bg-orange-200" : "bg-orange-100"
                } bg-white w-5 h-5 rounded-full shadow-inner`}
              >
                <FontAwesomeIcon icon={faXmark} />
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
    </div>
  );
};

export default AlarmPage;
