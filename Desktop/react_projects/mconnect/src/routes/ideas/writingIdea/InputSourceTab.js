import "css/Animation.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faQuoteLeft,
} from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/free-regular-svg-icons";

const InputSourceTab = ({
  sourceList,
  formSource,
  setFormSource,
  sourceInput,
}) => {
  const onSourceChange = (e) => {
    if (e.target.value === " ") {
      setFormSource("");
    } else {
      setFormSource(e.target.value);
    }
  };

  const onSourceClick = (e, source) => {
    e.preventDefault();
    setFormSource(source);
  };

  return (
    <div className="moveRightToLeft">
      <div className="overflow-y-scroll flex-col border-box shadow-inner bg-stone-50">
        <div className="pt-4 px-4 text-stone-400">
          검색 <FontAwesomeIcon icon={faMagnifyingGlass} />
        </div>
        {sourceList.length === 0 ? (
          <div className="p-4 pt-2 text-sm">기존 출처가 없습니다</div>
        ) : (
          <div className="p-4 pt-2 flex flex-nowrap overflow-x-auto">
            {sourceList
              .filter((source) => source.includes(formSource))
              .map((source, index) => (
                <button
                  key={index}
                  className={`flex-shrink-0 flex-grow-0 rounded-3xl border-2 mr-1 mb-1 px-3 py-1 text-xs shadow-sm duration-500 ${
                    source === formSource
                      ? "bg-stone-600 text-white"
                      : "bg-white"
                  }`}
                  style={{ flexBasis: "auto" }}
                  onClick={(e) => onSourceClick(e, source)}
                >
                  {source}
                </button>
              ))}
          </div>
        )}
        <input
          className="opacity flex p-2 w-full shadow-inner bg-white"
          type="text"
          name="formSource"
          placeholder="출처..."
          autoComplete="off"
          value={formSource}
          onChange={onSourceChange}
          ref={sourceInput}
        />
      </div>
      <div
        className={`absolute ${
          formSource.length > 0 ? "-top-2 left-2" : "-top-2 -left-20"
        } text-stone-400 duration-500`}
      >
        <FontAwesomeIcon icon={faQuoteLeft} /> 출처
      </div>
    </div>
  );
};

export default InputSourceTab;
