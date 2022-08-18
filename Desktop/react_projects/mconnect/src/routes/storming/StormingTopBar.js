import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {} from "@fortawesome/free-regular-svg-icons";
import { faBolt, faCompass, faSearch } from "@fortawesome/free-solid-svg-icons";

const StormingTopBar = () => {
  const onSearchClick = () => {
    // Navigate searchPage by adding props
    // We can find out where we started from through this prop.
  };

  return (
    <div className="fixed top-0 w-full z-10">
      <div className="flex justify-between items-center px-2 py-4 bg-white shadow">
        <div className="flex items-center gap-2 px-2 text-lg font-black">
          탐색
          <span className="text-sky-400">
            <FontAwesomeIcon icon={faCompass} />
          </span>
        </div>
        <div className="flex gap-2">
          <button
            className="px-2"
            // onClick={onSearchClick}
          >
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StormingTopBar;
