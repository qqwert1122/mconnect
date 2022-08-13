import "css/Animation.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import {
  faPenToSquare,
  faTrashCan,
  faCopy,
} from "@fortawesome/free-regular-svg-icons";

const AlarmPage = ({ customHooks }) => {
  const navigate = customHooks.navigate;

  const onBackClick = () => {
    navigate(-1);
  };

  const arr = [
    { name: "Kevin", type: "좋아요", date: "1분 전", isClicked: false },
    { name: "Stephan", type: "좋아요", date: "3시간 전", isClicked: false },
    { name: "May", type: "저장", date: "3일 전", isClicked: true },
    { name: "Poyth", type: "저장", date: "7일 전", isClicked: true },
    { name: "Yang", type: "좋아요", date: "1개월 전", isClicked: false },
  ];

  return (
    <div className="moveRightToLeft">
      <div className="fixed top-0 z-10 w-full h-14 p-3 flex justify-between items-center shadow bg-white">
        <button onClick={onBackClick}>
          <FontAwesomeIcon icon={faChevronLeft} size="lg" />
        </button>
      </div>
      <div className="pt-14">
        {arr.map((data) => (
          <>
            <div
              className={`p-4 ${
                data.isClicked === false &&
                "bg-gradient-to-tr from-rose-400 to-orange-400"
              }`}
            >
              <span className="font-black">{data.name}</span>님이{" "}
              {data.type === "좋아요" && "당신의 아이디어를 좋아합니다💕"}
              {data.type === "저장" && "당신의 아이디어를 저장했습니다.💡"}
              <span
                className={`truncate ${
                  data.isClicked ? "text-stone-400" : "text-white"
                }`}
              >
                @{data.date}
              </span>
            </div>
            <hr />
          </>
        ))}
      </div>
    </div>
  );
};

export default AlarmPage;
