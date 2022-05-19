import { useState } from "react";
import {
  faHashtag,
  faPlus,
  faQuoteLeft,
  faRotateBack,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const sampleTags = [
  "경영",
  "경제",
  "환율",
  "국제정치",
  "러우크라이나전쟁",
  "기술",
  "주식",
  "부동산",
];

const BottomBar = ({ formSource, setFormSource }) => {
  const [isSourceClicked, setIsSourceClicked] = useState(false);
  const [isHashTagClicked, setIsHashTagClicked] = useState(false);

  const onSourceChange = (e) => {
    setFormSource(e.target.value);
  };
  const onSourceClick = (e) => {
    e.preventDefault();
    setIsSourceClicked(!isSourceClicked);
  };
  const onHashTagClick = (e) => {
    e.preventDefault();
    setIsHashTagClicked(!isHashTagClicked);
  };

  return (
    <div className="w-screen fixed bottom-0 bg-white z-30 font-black">
      {isSourceClicked && (
        <input
          className="w-full p-2 shadow-inner"
          type="text"
          name="formSource"
          placeholder="출처..."
          autoComplete="off"
          value={formSource}
          onChange={onSourceChange}
        />
      )}

      {isHashTagClicked && (
        <div className="flex-col border-box shadow-inner">
          <div className="flex flex-wrap">
            {sampleTags.map((tag, index) => (
              <span
                key={index}
                className="border-box rounded-3xl border-2 mr-1 mb-1 px-3 py-1 text-xs shadow-sm duration-500 break-words"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex justify-between ">
            <input className="w-full p-2 shadow-inner" placeholder="태그..." />
            <button className="w-16 rounded bg-green-600 text-white">
              <FontAwesomeIcon icon={faPlus} size="xl" />
            </button>
          </div>
        </div>
      )}

      <div className="flex gap-8 text-lg p-4 shadow-inner">
        <button
          className={`${formSource.length > 0 ? "" : "text-stone-400"}`}
          onClick={onSourceClick}
        >
          <FontAwesomeIcon icon={faQuoteLeft} />
        </button>
        <button
          className={`${isHashTagClicked ? "" : "text-stone-400"}`}
          onClick={onHashTagClick}
        >
          <FontAwesomeIcon icon={faHashtag} />
        </button>
      </div>
    </div>
  );
};

export default BottomBar;
