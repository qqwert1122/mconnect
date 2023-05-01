import "css/Animation.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClockRotateLeft,
  faMagnifyingGlass,
  faQuoteLeft,
} from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/free-regular-svg-icons";
import { useRecoilState, useRecoilValue } from "recoil";
import { formSourceState } from "atom";
import { recentSourcesState } from "atom";

const InputSourceTab = ({ handleTabClose, sourceInput }) => {
  const [formSource, setFormSource] = useRecoilState(formSourceState);
  const recentSources = useRecoilValue(recentSourcesState);

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
    <>
      <div className="overflow-y-scroll flex-col border rounded-t-2xl">
        <div className="p-4 flex justify-between font-black text-base">
          <p>
            <FontAwesomeIcon icon={faQuoteLeft} /> 출처
          </p>
          <button onClick={(e) => handleTabClose(e)}>닫기</button>
        </div>
        <hr />
        <div className="pt-4 px-4 text-stone-400">
          최근 <FontAwesomeIcon icon={faClockRotateLeft} />
        </div>
        {recentSources.length === 0 ? (
          <div className="p-4 pt-2 text-sm">기존 출처가 없습니다</div>
        ) : (
          <div className="p-4 pt-2 relative flex flex-nowrap overflow-x-auto">
            {recentSources
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
    </>
  );
};

export default InputSourceTab;
