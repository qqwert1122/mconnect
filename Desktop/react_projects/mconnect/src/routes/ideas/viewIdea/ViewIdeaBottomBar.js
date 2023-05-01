import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faCircleNodes } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";

const ViewIdeaBottomBar = ({ content, itemChange, itemChangeProps }) => {
  return (
    <div className="flex justify-between items-center p-2 py-4 shadow-inner bg-white">
      <div className="flex gap-2 text-lg">
        <button
          className={` ${
            itemChangeProps === 1 && "text-sky-400"
          } duration-200 px-2 text-base font-black`}
          onClick={() => itemChange(1)}
        >
          추천 <FontAwesomeIcon icon={faThumbsUp} />
        </button>
      </div>

      {content.connectedIDs.length > 0 && (
        <div
          className={` ${
            itemChangeProps === 2 && "text-sky-400"
          } duration-200 flex justify-end items-center gap-2`}
        >
          <button
            className="text-base font-black"
            onClick={() => itemChange(2)}
          >
            연결
          </button>
          <span
            className={`${itemChangeProps === 2 && "rotate-180"} duration-500`}
          >
            <FontAwesomeIcon icon={faCircleNodes} />
          </span>
        </div>
      )}
    </div>
  );
};

export default ViewIdeaBottomBar;
