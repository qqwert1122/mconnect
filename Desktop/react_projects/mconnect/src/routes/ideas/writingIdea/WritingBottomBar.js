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
  faHashtag,
  faQuoteLeft,
} from "@fortawesome/free-solid-svg-icons";
import { faCompass as farCompass } from "@fortawesome/free-regular-svg-icons";

const WritingBottomBar = ({
  bottomItemChangeProps,
  setBottomItemChangeProps,
  showTitleAndCnctn,
}) => {
  const formSource = useRecoilValue(formSourceState);
  const formTags = useRecoilValue(formTagsState);
  const [formPublic, setFormPublic] = useRecoilState(formPublicState);
  const formCnctedIdeas = useRecoilValue(formCnctedIdeasState);

  const bottomItemChange = (e, props) => {
    e.preventDefault();
    switch (props) {
      case 1:
        if (bottomItemChangeProps != 1) {
          setBottomItemChangeProps(1);
        } else {
          setBottomItemChangeProps(0);
        }
        break;
      case 2:
        if (bottomItemChangeProps != 2) {
          setBottomItemChangeProps(2);
        } else {
          setBottomItemChangeProps(0);
        }
        break;
      case 3:
        if (bottomItemChangeProps != 3) {
          setBottomItemChangeProps(3);
        } else {
          setBottomItemChangeProps(0);
        }
        break;
    }
  };

  const onPublicClick = (e) => {
    e.preventDefault();
    setFormPublic((prev) => !prev);
  };

  return (
    <div className="flex justify-between items-center p-2 py-4 shadow-inner">
      <div className="flex gap-2 text-lg">
        <button
          className={`${formSource.length === 0 && "text-stone-400"} px-2`}
          onClick={(e) => bottomItemChange(e, 1)}
        >
          <FontAwesomeIcon icon={faQuoteLeft} />
        </button>
        <button
          className={`relative ${
            formTags.length === 0 && "text-stone-400"
          } px-2`}
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
        <div
          className={`flex justify-end items-center gap-2 ${
            formCnctedIdeas.length < 2 && "animate-pulse text-red-400"
          }`}
        >
          <button
            className="text-base font-black"
            onClick={(e) => bottomItemChange(e, 3)}
          >
            연결된 아이디어
          </button>
          <span
            className={`${
              bottomItemChangeProps === 3 && "rotate-180"
            } duration-500`}
          >
            <FontAwesomeIcon icon={faAngleUp} />
          </span>
        </div>
      )}
    </div>
  );
};

export default WritingBottomBar;
