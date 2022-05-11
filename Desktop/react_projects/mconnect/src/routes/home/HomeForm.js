import dayjs from "dayjs";
import "dayjs/locale/ko";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark as farBookmark,
  faHeart as farHeart,
  faCompass as farCompass,
} from "@fortawesome/free-regular-svg-icons";
import {
  faCircle,
  faBookmark as fasBookmark,
  faHeart as fasHeart,
  faCompass as fasCompass,
  faQuoteLeft,
  faHashtag,
} from "@fortawesome/free-solid-svg-icons";

const HomeForm = ({
  onSubmit,
  formText,
  onTextChange,
  onKeyDownPreventDefault,
  formSource,
  onSourceChange,
  formLike,
  onLikeClick,
  formBookmark,
  onBookmarkClick,
  formPublic,
  onPublicClick,
  formTags,
  setFormTags,
  formTag,
  setFormTag,
}) => {
  const onEnterKeyDown = (e) => {
    if (e.key === "Process") {
      return;
    }

    if (e.code === "Enter") {
      if (e.target.value.trim().length == 0) {
        e.preventDefault();
        return;
      }

      e.preventDefault();
      if (formTags.includes(e.target.value)) {
        setFormTag("");
      } else {
        setFormTags([...formTags, e.target.value]);
        setFormTag("");
      }
    }
  };
  const onTagChange = (e) => {
    setFormTag(e.target.value);
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="flex justify-between items-center mx-7 mt-2 pt-5">
        <div className="relative highlight text-lg font-black z-10">
          새 아이디어를 입력해주세요
        </div>
        <input
          type="submit"
          className="p-1 px-2 rounded text-base font-black text-center shadow-md text-white bg-green-600"
          value="작성 ✏️"
        />
      </div>

      <div className="shadow-xl mt-4 py-2 mx-4 rounded-3xl bg-stone-200">
        {/* Text */}
        <div className="flex items-center px-3 mt-1 mb-4">
          <FontAwesomeIcon icon={faCircle} size="xs" />
          <textarea
            className=" rounded-xl border-2 mx-3 p-2 w-full h-24"
            name="formText"
            type="text"
            value={formText}
            onChange={onTextChange}
            placeholder="내용"
            autoComplete="off"
            required
          />
        </div>
        {/* Source */}
        <div className="flex items-center mb-1 px-3">
          <FontAwesomeIcon icon={faQuoteLeft} />
          <input
            className=" rounded-xl border-2 mx-3 px-2 w-full"
            name="formSource"
            type="text"
            value={formSource}
            onChange={onSourceChange}
            onKeyDown={onKeyDownPreventDefault}
            placeholder="출처"
            autoComplete="off"
          />
        </div>
        {/* Tags */}
        <div className="mb-1 px-3">
          <FontAwesomeIcon icon={faHashtag} />
          <span className="ml-3 flex-nowrap items-center overflow-y-auto ">
            {formTags.map((tag, index) => (
              <button
                key={index}
                className="mr-2 px-2 rounded-xl text-sm duration-500 bg-stone-500 text-white"
                onClick={(e) => {
                  e.preventDefault();
                  setFormTags(formTags.filter((_tag) => _tag != tag));
                }}
              >
                {tag}
              </button>
            ))}
          </span>
          <input
            className=" rounded-xl border-2 px-2 w-24"
            name="tags"
            type="text"
            placeholder="태그"
            value={formTag}
            onChange={(e) => onTagChange(e)}
            onKeyDown={(e) => onEnterKeyDown(e)}
            autoComplete="off"
          />
        </div>
      </div>

      {/* like, bookmark, time */}
      <div className="flex justify-between items-center mx-6 my-4">
        <div className="flex mx-3 gap-4">
          <button className="text-2xl text-red-500" onClick={onLikeClick}>
            <FontAwesomeIcon icon={formLike ? fasHeart : farHeart} />
          </button>
          <button
            className="text-2xl text-orange-400"
            onClick={onBookmarkClick}
          >
            <FontAwesomeIcon icon={formBookmark ? fasBookmark : farBookmark} />
          </button>
          <button className="text-2xl text-sky-400" onClick={onPublicClick}>
            <FontAwesomeIcon icon={formPublic ? fasCompass : farCompass} />
          </button>
        </div>
        <div className="mx-3 text-base font-black">
          {dayjs().format("YYYY. MM. DD. HH:mm:ss")}
        </div>
      </div>
    </form>
  );
};

export default HomeForm;
