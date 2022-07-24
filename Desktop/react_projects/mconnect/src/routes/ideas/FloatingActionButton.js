import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNodes, faPlus } from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/free-regular-svg-icons";

const FloatingActionButton = ({ navigate, selectedIdeas }) => {
  const onWritingClick = () => {
    if (selectedIdeas.length === 1) {
      toast.error("2개 이상을 선택하세요", {
        theme: "colored",
      });
    } else {
      navigate("/writingidea");
    }
  };

  return (
    <div className="fixed bottom-16 right-3 z-10">
      {selectedIdeas.length > 0 ? (
        <button
          className={`shadow-2xl rounded-full px-4 p-2 text-sm duration-200 border-4  text-white ${
            selectedIdeas.length === 1
              ? "border-stone-200 bg-stone-600"
              : "border-green-200 bg-green-600"
          }`}
          onClick={onWritingClick}
        >
          <FontAwesomeIcon icon={faCircleNodes} size="lg" /> 연결
        </button>
      ) : (
        <button
          className="shadow-2xl rounded-full p-2 text-sm font-black px-4 border-4 border-green-200 bg-green-600 text-white"
          onClick={onWritingClick}
        >
          <FontAwesomeIcon icon={faPlus} size="lg" /> 새 아이디어
        </button>
      )}
    </div>
  );
};

export default FloatingActionButton;
