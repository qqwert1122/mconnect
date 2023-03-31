import "css/Animation.css";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { formTagsState, recentTagsState } from "atom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClockRotateLeft,
  faHashtag,
  faMagnifyingGlass,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";

const InputTagTab = ({ tagInput, trends }) => {
  const [formTags, setFormTags] = useRecoilState(formTagsState);
  const recentTags = useRecoilValue(recentTagsState);
  const [formTag, setFormTag] = useState("");

  const onTagChange = (e) => {
    setFormTag(e.target.value);
  };

  const onAddTag = (e) => {
    e.preventDefault();
    if (formTag.trim().length === 0) {
      setFormTag("");
      return;
    }
    if (formTags.includes(formTag) === false) {
      setFormTags([formTag, ...formTags]);
    }
    setFormTag("");
  };

  const onTagClick = (e, tag) => {
    e.preventDefault();
    if (formTags.includes(tag)) {
      setFormTags(formTags.filter((_tag) => _tag != tag));
    } else {
      setFormTags([...formTags, tag]);
    }
  };

  return (
    <div className="moveRightToLeft">
      <div className="overflow-y-scroll flex-col border-box shadow-inner bg-stone-50">
        {formTags.length > 0 && (
          <div className="p-4 flex flex-nowrap overflow-x-scroll">
            {formTags.map((tag, index) => (
              <button
                key={index}
                className="flex-grow-0 flex-shrink-0 border-box rounded-3xl border-2 mr-1 mb-1 px-3 py-1 text-xs shadow-sm duration-500 break-words bg-stone-600 text-white"
                style={{ flexBasis: "auto" }}
                onClick={(e) => onTagClick(e, tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        <div
          className={`px-4 ${formTags.length === 0 && "pt-10"} text-stone-400`}
        >
          이런 태그는 어때요 <FontAwesomeIcon icon={faThumbsUp} />
        </div>
        <div className="p-4 pt-2 flex flex-wrap">
          {trends.map((tag, index) => (
            <button
              key={index}
              className={`relative border-box rounded-3xl border-2 mr-1 mb-1 px-3 py-1 text-xs shadow-sm duration-500 break-words ${
                formTags.includes(tag)
                  ? "bg-stone-300 "
                  : index === 0
                  ? "bg-gradient-to-r from-orange-200 to-pink-200 border-red-200"
                  : "bg-white"
              } `}
              onClick={(e) => onTagClick(e, tag)}
            >
              {index===0 && <span className="absolute -left-2 -top-2 px-1 rounded-xl bg-red-500 text-white" style={{fontSize:"10px"}}>HOT</span>}
              {tag}
            </button>
          ))}
        </div>

        <div className="px-4 text-stone-400">
          최근 <FontAwesomeIcon icon={faClockRotateLeft} />
        </div>
        {recentTags.length === 0 ? (
          <div className="p-4 pt-2 text-sm">기존 태그가 없습니다</div>
        ) : (
          <div className="p-4 pt-2 flex flex-nowrap overflow-x-auto">
            {recentTags
              .filter((tag) => tag.includes(formTag))
              .map((tag, index) => (
                <button
                  key={index}
                  className={`flex-shrink-0 flex-grow-0  rounded-3xl border-2 mr-1 mb-1 px-3 py-1 text-xs shadow-sm duration-500 ${
                    formTags.includes(tag) ? "bg-stone-300 " : "bg-white"
                  }`}
                  style={{ flexBasis: "auto" }}
                  onClick={(e) => onTagClick(e, tag)}
                >
                  {tag}
                </button>
              ))}
          </div>
        )}

        <div className="flex justify-between ">
          <input
            className="w-full p-2 shadow-inner"
            placeholder="태그..."
            value={formTag}
            onChange={onTagChange}
            ref={tagInput}
          />
          <button
            className="p-2 shadow-inner bg-stone-400 text-white"
            onClick={onAddTag}
          >
            <FontAwesomeIcon icon={faPlus} size="xl" />
          </button>
        </div>
      </div>
      <div className="absolute -top-2 left-2 text-stone-400">
        <FontAwesomeIcon icon={faHashtag} /> 태그
      </div>
    </div>
  );
};

export default InputTagTab;
