import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {} from "@fortawesome/free-regular-svg-icons";
import { faBolt, faSearch } from "@fortawesome/free-solid-svg-icons";

const StormingTopBar = () => {
  return (
    <div className="fixed top-0 w-full z-10">
      <div className="flex justify-between items-center px-2 py-4 bg-white shadow">
        <div className="px-2 text-lg font-black">
          스토밍 <FontAwesomeIcon icon={faBolt} color="orange" />
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
