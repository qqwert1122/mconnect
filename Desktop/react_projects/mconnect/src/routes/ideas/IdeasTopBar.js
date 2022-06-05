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

const IdeasTopBar = ({
  setViewIdea,
  setNavValue,
  setScrollY,
  selectedIdeas,
  setSelectedIdeas,
  isSelectMode,
  setIsSelectMode,
}) => {
  const onSelectModeClick = () => {
    setIsSelectMode((prev) => !prev);
    if (isSelectMode === true) {
      setSelectedIdeas([]);
    }
  };

  const onSearchClick = () => {
    setNavValue("/ideas/searchpage");
  };

  return (
    <div className="fixed top-0 w-full z-10">
      <div className="flex justify-between items-center px-2 py-4 bg-white shadow">
        <div className="px-2 text-lg font-black">아이디어</div>
        <div className="flex gap-2">
          <button className="relative px-2">
            <FontAwesomeIcon icon={faBell} size="lg" />
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
          setNavValue={setNavValue}
          selectedIdeas={selectedIdeas}
          setSelectedIdeas={setSelectedIdeas}
          setViewIdea={setViewIdea}
        />
      )}
    </div>
  );
};

export default IdeasTopBar;
