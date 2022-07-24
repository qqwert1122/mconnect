import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";

const ViewIdeaBottomBar = ({ viewIdea, itemChange, itemChangeProps }) => {
  return (
    <div className="flex justify-between items-center p-2 py-4 shadow-inner bg-white">
      <div className="flex gap-2 text-lg">
        <button
          className="px-2 text-base font-black"
          onClick={(e) => itemChange(1)}
        >
          관련 <FontAwesomeIcon icon={faThumbsUp} />
        </button>
      </div>

      {viewIdea.connectedIdeas.length > 0 && (
        <div className="flex justify-end items-center gap-2 ">
          <button
            className="text-base font-black"
            onClick={() => itemChange(2)}
          >
            연결된 아이디어
          </button>
          <span
            className={`${itemChangeProps === 2 && "rotate-180"} duration-500`}
          >
            <FontAwesomeIcon icon={faAngleUp} />
          </span>
        </div>
      )}
    </div>
  );
};

export default ViewIdeaBottomBar;
