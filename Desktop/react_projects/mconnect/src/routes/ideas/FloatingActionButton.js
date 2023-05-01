import "css/Gradient.css";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNodes, faPlus } from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/free-regular-svg-icons";
import { selectedIdeasState } from "atom";
import { useRecoilValue } from "recoil";

const FloatingActionButton = ({ scrollY, navigate, initForm }) => {
  const selectedIdeas = useRecoilValue(selectedIdeasState);

  const onWritingClick = () => {
    if (selectedIdeas.length === 1) {
      toast.error("아이디어를 2개 이상 선택하세요", {
        theme: "colored",
      });
    } else {
      initForm();
      navigate("/writingidea");
    }
  };

  if (scrollY < 300) {
  }

  return (
    <div className="fixed bottom-20 right-3 z-10">
      <button
        className={`${
          scrollY < 300 ? (selectedIdeas.length > 0 ? "w-36" : "w-32") : "w-12"
        } font-black inline-flex flex-shrink whitespace-nowrap h-12 items-center justify-center gap-2 rounded-full px-4 p-2 text-sm duration-500 border text-white ${
          selectedIdeas.length === 1
            ? "text-white bg-gradient-to-br from-stone-600 to-stone-800 "
            : "stacked-linear-circle animate-bounce "
        }`}
        onClick={onWritingClick}
      >
        <FontAwesomeIcon
          icon={selectedIdeas.length > 0 ? faCircleNodes : faPlus}
          size="lg"
        />
        {scrollY < 300 && (
          <>{selectedIdeas.length > 0 ? "아이디어 연결" : "새 아이디어"}</>
        )}
      </button>
    </div>
  );
};

export default FloatingActionButton;
