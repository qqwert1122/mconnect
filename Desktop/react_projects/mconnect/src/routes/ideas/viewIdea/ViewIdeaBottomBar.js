import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";

const ViewIdeaBottomBar = ({
  viewIdea,
  getCategory,
  itemChange,
  itemChangeProps,
}) => {
  return (
    <div className="flex justify-between items-center p-2 shadow-inner bg-white">
      <div className="flex gap-2 text-lg">
        <span className="border-box rounded-3xl border-2 mb-1 px-3 py-1 font-black text-sm shadow-sm duration-500">
          {getCategory(viewIdea.category).icon}&nbsp;
          {getCategory(viewIdea.category).label}
        </span>
        <button
          className="px-2 text-base font-black"
          onClick={(e) => itemChange(1)}
        >
          추천 <FontAwesomeIcon icon={faThumbsUp} />
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
