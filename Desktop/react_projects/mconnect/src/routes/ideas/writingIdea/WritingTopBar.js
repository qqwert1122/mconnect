import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {} from "@fortawesome/free-regular-svg-icons";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { useRecoilState, useRecoilValue } from "recoil";
import { formTitleState, formTextState } from "atom";

const WritingTopBar = ({ onBackClick, showTitleAndCnctn }) => {
  const [formTitle, setFormTitle] = useRecoilState(formTitleState);
  const formText = useRecoilValue(formTextState);

  const _onBackClick = (e) => {
    e.preventDefault();
    onBackClick("edit");
  };

  const onTitleChange = (e) => {
    if (e.target.value === " ") {
      setFormTitle("");
    } else {
      setFormTitle(e.target.value);
    }
  };

  return (
    <div className="fixed top-0 w-full z-20 p-3 flex justify-between items-center shadow bg-white">
      <div className="flex gap-4">
        <button onClick={_onBackClick}>
          <FontAwesomeIcon icon={faAngleLeft} size="lg" />
        </button>
        {/* 제목 */}

        {showTitleAndCnctn && (
          <input
            className="w-full px-2 text-lg font-black"
            type="text"
            name="formTitle"
            placeholder="제목"
            value={formTitle}
            onChange={onTitleChange}
            autoComplete="off"
          />
        )}
      </div>
      <input
        type="submit"
        className={`${
          formText
            ? "bg-gradient-to-tr from-sky-400 to-blue-400 text-white"
            : "bg-stone-200 text-stone-400"
        } p-1 px-2 rounded font-black text-center shadow-md duration-500`}
        value="작성"
      />
    </div>
  );
};

export default WritingTopBar;
