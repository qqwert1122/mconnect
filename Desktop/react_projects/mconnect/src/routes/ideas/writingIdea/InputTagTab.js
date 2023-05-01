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

const InputTagTab = ({ handleTabClose, tagInput, trends }) => {
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
    <>
      <div className="overflow-y-scroll flex-col border-box border rounded-t-2xl">
        <div className="flex justify-between p-4 text-base font-black">
          <p>
            <FontAwesomeIcon icon={faHashtag} /> 태그
          </p>
          <button onClick={(e) => handleTabClose(e)}>닫기</button>
        </div>
        <hr />
        <div className="p-4 pb-2 text-stone-400">선택된 태그</div>
        {formTags.length > 0 && (
          <div className="relative px-4 flex flex-nowrap overflow-x-scroll">
            {formTags.map((tag, index) => (
              <button
                key={index}
                className="flex-grow-0 flex-shrink-0 border-box rounded-3xl border-2 mr-1 mb-1 px-3 py-1 text-xs shadow-sm duration-500 break-words bg-sky-400 text-white"
                style={{ flexBasis: "auto" }}
                onClick={(e) => onTagClick(e, tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        <div
          className={`p-4 pb-2 ${
            formTags.length === 0 && "pt-10"
          } text-stone-400`}
        >
          이런 태그는 어때요 <FontAwesomeIcon icon={faThumbsUp} />
        </div>
        <div className="p-4 pt-2 flex flex-wrap">
          {trends.map((tag, index) => (
            <button
              key={index}
              className={`relative border-box rounded-3xl border-2 mr-1 mb-1 px-3 py-1 text-xs shadow-sm duration-500 break-words ${
                formTags.includes(tag)
                  ? "bg-stone-200 "
                  : index === 0
                  ? "bg-gradient-to-r from-orange-200 to-pink-200 border-red-200"
                  : "bg-white"
              } `}
              onClick={(e) => onTagClick(e, tag)}
            >
              {index === 0 && (
                <span
                  className="absolute -left-2 -top-2 px-1 rounded-xl bg-gradient-to-br from-pink-400 to-red-600 text-white"
                  style={{ fontSize: "10px" }}
                >
                  HOT
                </span>
              )}
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
          <div className="relative p-4 pt-2 flex flex-nowrap overflow-x-auto">
            {recentTags
              .filter((tag) => tag.includes(formTag))
              .map((tag, index) => (
                <button
                  key={index}
                  className={`relative flex-shrink-0 flex-grow-0 rounded-3xl border-2 mr-1 mb-1 px-3 py-1 text-xs shadow-sm duration-500 ${
                    formTags.includes(tag) ? "bg-stone-200 " : "bg-white"
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
            className="w-full p-2 border"
            placeholder="태그를 입력하세요"
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
    </>
  );
};

export default InputTagTab;
