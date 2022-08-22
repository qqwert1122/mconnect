import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNodes, faPlus } from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/free-regular-svg-icons";
import { selectedIdeasState } from "atom";
import { useRecoilValue } from "recoil";

const FloatingActionButton = ({ navigate, initForm }) => {
  const selectedIdeas = useRecoilValue(selectedIdeasState);

  const onWritingClick = () => {
    if (selectedIdeas.length === 1) {
      toast.error("2개 이상을 선택하세요", {
        theme: "colored",
      });
    } else {
      initForm();
      navigate("/writingidea");
    }
  };

  return (
    <div className="fixed bottom-20 right-3 z-10">
      <button
        className={`flex gap-2 shadow-2xl rounded-full px-4 p-2 text-sm duration-200 border-4   ${
          selectedIdeas.length === 1
            ? "text-stone-400 border-stone-200 bg-stone-600"
            : "bg-gradient-to-tr from-rose-400 to-orange-400 text-orange-100 border-orange-200 animate-bounce"
        }`}
        onClick={onWritingClick}
      >
        <FontAwesomeIcon
          icon={selectedIdeas.length > 0 ? faCircleNodes : faPlus}
          size="lg"
        />
        {selectedIdeas.length > 0 ? "연결" : "새 아이디어"}
      </button>
    </div>
  );
};

export default FloatingActionButton;
