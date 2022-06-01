import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleUp,
  faHashtag,
  faMagnifyingGlass,
  faPlus,
  faQuoteLeft,
  faXmark,
  faCompass as fasCompass,
} from "@fortawesome/free-solid-svg-icons";
import {
  faThumbsUp,
  faCompass as farCompass,
} from "@fortawesome/free-regular-svg-icons";

const InputTagTab = ({
  tagList,
  tagInput,
  formTag,
  setFormTag,
  formTags,
  setFormTags,
}) => {
  const onTagChange = (e) => {
    setFormTag(e.target.value);
  };

  const onAddTag = (e) => {
    e.preventDefault();
    if (formTag.trim().length === 0) {
      setFormTag("");
      return;
    }
    if (!formTags.includes(formTag)) {
      setFormTags([...formTags, formTag]);
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

  const commonTags = [
    "경영",
    "경제",
    "국제",
    "정치",
    "사회",
    "과학",
    "기술",
    "IT",
    "환경",
    "역사",
    "주식",
    "부동산",
    "사업",
  ];

  return (
    <>
      <div className="opacity overflow-y-scroll flex-col border-box shadow-inner bg-stone-50">
        {formTags.length > 0 && (
          <div className="p-4 flex flex-nowrap overflow-x-scroll">
            {formTags.map((tag, index) => (
              <button
                key={index}
                className="flex-grow-0 flex-shrink-0 border-box rounded-3xl border-2 mr-1 mb-1 px-3 py-1 text-xs shadow-sm duration-500 break-words bg-green-400 text-white"
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
          이런 태그는 어때요 ? <FontAwesomeIcon icon={faThumbsUp} />
        </div>
        <div className="p-4 pt-2 flex flex-wrap">
          {commonTags.map((tag, index) => (
            <button
              key={index}
              className={`border-box rounded-3xl border-2 mr-1 mb-1 px-3 py-1 text-xs shadow-sm duration-500 break-words ${
                formTags.includes(tag) ? "bg-stone-300 " : "bg-white"
              }`}
              onClick={(e) => onTagClick(e, tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="px-4 text-stone-400">
          검색 <FontAwesomeIcon icon={faMagnifyingGlass} />
        </div>
        {tagList.length === 0 ? (
          <div className="p-4 pt-2 text-sm">기존 태그가 없습니다</div>
        ) : (
          <div className="p-4 pt-2 flex flex-nowrap overflow-x-auto">
            {tagList
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
    </>
  );
};

export default InputTagTab;
