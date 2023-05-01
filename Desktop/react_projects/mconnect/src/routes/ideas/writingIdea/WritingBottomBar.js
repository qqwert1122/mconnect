import { useRecoilState, useRecoilValue } from "recoil";
import {
  formPublicState,
  formSourceState,
  formTagsState,
  formCnctedIdeasState,
} from "atom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleUp,
  faCircleNodes,
  faHashtag,
  faQuoteLeft,
} from "@fortawesome/free-solid-svg-icons";
import {
  faThumbsUp,
  faCompass as farCompass,
} from "@fortawesome/free-regular-svg-icons";

const WritingBottomBar = ({
  bottomItemChangeProps,
  bottomItemChange,
  showTitleAndCnctn,
}) => {
  const formSource = useRecoilValue(formSourceState);
  const formTags = useRecoilValue(formTagsState);
  const [formPublic, setFormPublic] = useRecoilState(formPublicState);
  const formCnctedIdeas = useRecoilValue(formCnctedIdeasState);

  const onPublicClick = (e) => {
    e.preventDefault();
    setFormPublic((prev) => !prev);
  };

  return (
    <div className="flex justify-between items-center p-2 py-4 shadow-inner">
      <div className="flex gap-2 text-lg">
        <button
          className={`${formSource.length === 0 && "text-stone-400"} ${
            bottomItemChangeProps === 1 && "text-sky-400"
          } duration-500 px-2`}
          onClick={(e) => bottomItemChange(e, 1)}
        >
          <FontAwesomeIcon icon={faQuoteLeft} />
        </button>
        <button
          className={`relative ${formTags.length === 0 && "text-stone-400"} ${
            bottomItemChangeProps === 2 && "text-sky-400"
          } duration-500 px-2`}
          onClick={(e) => bottomItemChange(e, 2)}
        >
          <FontAwesomeIcon icon={faHashtag} />
          {formTags.length > 0 && (
            <div
              className="absolute bottom-0 -right-2 text-xs px-1 bg-red-400 text-white rounded-3xl"
              style={{ minWidth: "20px" }}
            >
              {formTags.length}
            </div>
          )}
        </button>
        <button
          className={`relative ${
            formPublic === false && "text-stone-400"
          } px-2`}
          onClick={onPublicClick}
        >
          <FontAwesomeIcon icon={farCompass} />
          {formPublic && (
            <div
              className="absolute -bottom-2 -right-5 text-xs px-1 bg-stone-600 text-white rounded-3xl border-white border-4"
              style={{ minWidth: "20px" }}
            >
              공개
            </div>
          )}
        </button>
      </div>

      {showTitleAndCnctn && (
        <div className="flex justify-end items-center gap-4">
          <button
            className={`text-base font-black duration-500 ${
              bottomItemChangeProps === 4 && "text-sky-400"
            }`}
            onClick={(e) => bottomItemChange(e, 4)}
          >
            추천 <FontAwesomeIcon icon={faThumbsUp} />
          </button>
          <button
            className={`text-base font-black duration-500 ${
              formCnctedIdeas.length < 2 && "animate-pulse text-red-400"
            } ${bottomItemChangeProps === 3 && "text-sky-400"}`}
            onClick={(e) => bottomItemChange(e, 3)}
          >
            연결 <FontAwesomeIcon icon={faCircleNodes} />
          </button>
        </div>
      )}
    </div>
  );
};

export default WritingBottomBar;
