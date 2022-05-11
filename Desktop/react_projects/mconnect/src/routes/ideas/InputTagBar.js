import {
  faPlus,
  faRotateBack,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const InputTagBar = () => {
  return (
    <div className="w-screen fixed bottom-0 shadow-inner bg-white z-30 font-black">
      <div className="m-2 flex justify-between">
        <button>
          <FontAwesomeIcon icon={faRotateBack} />
        </button>
        <button>
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
      <div className="m-2 flex">tags</div>
      <hr />
      <div className="m-2 flex justify-between border-box gap-4">
        <input className="w-full px-2" placeholder="태그..." />
        <button className="w-16 h-8 rounded bg-green-600 text-white">
          <FontAwesomeIcon icon={faPlus} size="xl" />
        </button>
      </div>
    </div>
  );
};

export default InputTagBar;
