import "css/Animation.css";
import SelectedIdeasSlide from "routes/ideas/SelectedIdeasSlide";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faCircleCheck as fasCircleCheck,
  faXmarkCircle,
  faFlaskVial,
} from "@fortawesome/free-solid-svg-icons";
import {
  faBell,
  faCircleCheck as farCircleCheck,
  faCircleQuestion,
  faCommentDots,
} from "@fortawesome/free-regular-svg-icons";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState, selectedIdeasState } from "atom";
import dayjs from "dayjs";

const IdeasTopBar = ({ ...props }) => {
  const {
    navigate,
    viewIdea,
    isSelectMode,
    setIsSelectMode,
    isViewDetailsClicked,
    setIsViewDetailsClicked,
    alarm,
    setAlarm,
  } = props;
  const loggedInUser = useRecoilValue(userState);
  const [selectedIdeas, setSelectedIdeas] = useRecoilState(selectedIdeasState);

  const onSelectModeClick = () => {
    setIsSelectMode((prev) => !prev);
    if (isSelectMode === true) {
      setSelectedIdeas([]);
    }
  };

  const onAlarmClick = () => {
    navigate("/alarm");
  };

  const onTutorialClick = () => {
    navigate("/tutorial");
  };

  const onDeleteClick = () => {
    setAlarm({ boolean: false, message: "" });
  };

  return (
    <div className="fixed top-0 w-full z-10">
      <div className="flex justify-between items-center px-2 py-4 bg-white shadow">
        <div className="flex items-center gap-2">
          <span className="pl-2 text-lg font-black">아이디어</span>
          <span
            className="h-5 flex justify-center items-center font-black text-xs text-stone-400 bg-stone-200 rounded-xl px-2"
            style={{ minWidth: "24px", maxWidth: "128px" }}
          >
            {loggedInUser.idea_count}
          </span>
        </div>
        <div className="flex gap-2">
          <button className="relative px-2" onClick={onTutorialClick}>
            <FontAwesomeIcon icon={faCircleQuestion} size="lg" />
            {dayjs().diff(dayjs(loggedInUser.createdAt), "day") < 3 && (
              <>
                <span className="animate-ping absolute right-0 -top-1 w-4 h-4 bg-red-300 text-white rounded-full" />
                <span className="absolute right-1 top-0 w-2 h-2 bg-red-400 text-white rounded-full" />
              </>
            )}
          </button>
          <button className="px-2" onClick={onSelectModeClick}>
            {isSelectMode ? (
              <FontAwesomeIcon icon={fasCircleCheck} size="lg" />
            ) : (
              <FontAwesomeIcon icon={farCircleCheck} size="lg" />
            )}
          </button>
        </div>
      </div>
      {isSelectMode && selectedIdeas.length > 0 && (
        <SelectedIdeasSlide
          viewIdea={viewIdea}
          isViewDetailsClicked={isViewDetailsClicked}
          setIsViewDetailsClicked={setIsViewDetailsClicked}
        />
      )}

      <div
        className={`${
          alarm.boolean ? "visible opacity-100" : "invisible opacity-0"
        } duration-1000 p-4 flex justify-between bg-gradient-to-br from-pink-500  to-orange-500  text-orange-200 shadow-xl`}
      >
        <span className="flex gap-5">
          <span>
            <FontAwesomeIcon icon={faBell} /> 알림
          </span>
          <span>{alarm.message}</span>
        </span>

        <button onClick={onDeleteClick}>
          <FontAwesomeIcon icon={faXmarkCircle} />
        </button>
      </div>
    </div>
  );
};

export default IdeasTopBar;
