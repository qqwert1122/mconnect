import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {} from "@fortawesome/free-regular-svg-icons";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

const WritingTopBar = ({
  userContext,
  setUserContext,
  navigate,
  setViewIdea,
  formCategory,
  formTitle,
  setFormTitle,
}) => {
  const onBackClick = (e) => {
    e.preventDefault();
    setViewIdea(null);
    navigate(-1);
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
        <button onClick={onBackClick}>
          <FontAwesomeIcon icon={faAngleLeft} size="lg" />
        </button>
        {/* 제목 */}
        {formCategory > 0 && (
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
        className="p-1 px-2 rounded font-black text-center shadow-md text-white bg-green-600"
        value="작성"
      />
    </div>
  );
};

export default WritingTopBar;
