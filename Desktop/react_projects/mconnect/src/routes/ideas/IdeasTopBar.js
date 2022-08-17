import SelectedIdeasSlide from "routes/ideas/SelectedIdeasSlide";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faCircleCheck as fasCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import {
  faBell,
  faCircleCheck as farCircleCheck,
} from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import { selectedIdeaListState } from "atom";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "atom";
import { selectedIdeasState } from "atom";

const IdeasTopBar = ({ ...props }) => {
  const {
    navigate,
    isSelectMode,
    setIsSelectMode,
    isViewDetailsClicked,
    setIsViewDetailsClicked,
  } = props;
  const loggedInUser = useRecoilValue(userState);
  const [selectedIdeas, setSelectedIdeas] = useRecoilState(selectedIdeasState);

  const onSelectModeClick = () => {
    setIsSelectMode((prev) => !prev);
    if (isSelectMode === true) {
      setSelectedIdeas([]);
    }
  };

  const onSearchClick = () => {
    navigate("/searchpage");
  };

  const onAlarmClick = () => {
    navigate("/alarm");
  };

  return (
    <div className="fixed top-0 w-full z-10">
      <div className="flex justify-between items-center px-2 py-4 bg-white shadow">
        <div className="flex items-center gap-2">
          <span className="pl-2 text-lg font-black">아이디어</span>
          <span
            className="h-5 flex justify-center items-center text-xs text-stone-400 bg-stone-100 rounded-xl px-2"
            style={{ minWidth: "24px", maxWidth: "128px" }}
          >
            {loggedInUser.idea_count}
          </span>
        </div>
        <div className="flex gap-2">
          <button className="relative px-2" onClick={onAlarmClick}>
            <FontAwesomeIcon icon={faBell} size="lg" />
            <span className="animate-ping absolute right-0 -top-1 w-4 h-4 bg-red-300 text-white rounded-full" />
            <span className="absolute right-1 top-0 w-2 h-2 bg-red-400 text-white rounded-full" />
          </button>
          <button className="px-2" onClick={onSelectModeClick}>
            {isSelectMode ? (
              <FontAwesomeIcon icon={fasCircleCheck} size="lg" />
            ) : (
              <FontAwesomeIcon icon={farCircleCheck} size="lg" />
            )}
          </button>
          <button className="px-2" onClick={onSearchClick}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </div>
      {isSelectMode && selectedIdeas.length > 0 && (
        <SelectedIdeasSlide
          navigate={navigate}
          isViewDetailsClicked={isViewDetailsClicked}
          setIsViewDetailsClicked={setIsViewDetailsClicked}
        />
      )}
    </div>
  );
};

export default IdeasTopBar;
