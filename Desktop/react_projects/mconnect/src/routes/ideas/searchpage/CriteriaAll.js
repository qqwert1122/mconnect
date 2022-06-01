import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/free-regular-svg-icons";

const CriteriaAll = ({ listAllCriteria, onXmarkClick }) => {
  return (
    <>
      <div className="m-4 mb-2 flex flex-nowrap overflow-x-scroll">
        {listAllCriteria.map((all, index) => (
          <span
            key={index}
            className={`mr-1 mb-1 px-2 py-1 flex-grow-0 flex-shrink-0 border-box rounded-3xl border-2  break-words bg-green-400 text-white text-xs shadow-sm duration-500`}
            style={{ flexBasis: "auto" }}
          >
            {all}
            <button className="px-1" onClick={() => onXmarkClick(all)}>
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
          </span>
        ))}
      </div>
      <hr />
    </>
  );
};

export default CriteriaAll;
