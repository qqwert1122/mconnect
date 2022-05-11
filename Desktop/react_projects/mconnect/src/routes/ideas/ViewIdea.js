import { useNavigate } from "react-router-dom";
import { authService } from "fbase";
import Avatar from "@mui/material/Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faHashtag,
  faQuoteLeft,
  faCompass as fasCompass,
  faHeart as fasHeart,
  faBookmark as fasBookmark,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import {
  faCompass as farCompass,
  faHeart as farHeart,
  faBookmark as farBookmark,
} from "@fortawesome/free-regular-svg-icons";

const ViewIdea = ({ customHooks }) => {
  const viewIdea = customHooks.viewIdea;
  const setViewIdea = customHooks.setViewIdea;
  let navigate = useNavigate();
  const user = authService.currentUser;

  const onBackClick = () => {
    navigate("/ideas", { replace: true });
  };

  return (
    <div className="text-sm min-h-screen bg-stone-100">
      <div className="flex-col  bg-white">
        <div className="p-3 flex justify-between items-center bg-green-600 text-white">
          <button onClick={onBackClick}>
            <FontAwesomeIcon icon={faChevronLeft} size="xl" />
          </button>
          <span className="p-1 px-2 text-base font-black text-green-600 bg-white rounded">
            수정
          </span>
        </div>
        <hr />
        <div className="p-3 flex justify-between items-center font-black">
          <div className="flex items-center  gap-4">
            <Avatar
              alt="avatar"
              src={viewIdea.userPhotoURL}
              sx={{
                display: "flex",
                width: "35px",
                height: "35px",
              }}
            />
            <span>{viewIdea.userName}</span>
          </div>
          <div>{viewIdea.createdAt}</div>
        </div>
        <hr />
        {viewIdea.title === "" ? (
          <></>
        ) : (
          <div className="flex p-5 font-black text-lg">
            <span>{viewIdea.title}</span>
          </div>
        )}
        <div className="flex p-5 text-base">
          <span>{viewIdea.text}</span>
        </div>
        {viewIdea.source && (
          <div className="flex items-center p-5 py-2 gap-4">
            <FontAwesomeIcon icon={faQuoteLeft} />
            <span>{viewIdea.source}</span>
          </div>
        )}
        {viewIdea.tags.length != 0 && (
          <div className="flex items-start p-5 pt-2 pb-4 gap-4">
            <FontAwesomeIcon icon={faHashtag} />
            <span className="flex flex-wrap">
              {viewIdea.tags.map((tag, index) => (
                <span
                  key={index}
                  className="mb-1 mr-1 px-2 rounded-xl duration-500 bg-stone-400 text-stone-100"
                >
                  {tag}
                </span>
              ))}
            </span>
          </div>
        )}

        <hr />
        <div className="flex p-3 gap-4">
          <button className="relative text-xl text-red-500">
            <FontAwesomeIcon icon={viewIdea.like ? fasHeart : farHeart} />
            <span className="absolute left-5 bottom-0 text-xs">
              {viewIdea.likeUsers.length != 0 && viewIdea.likeUsers.length}
            </span>
          </button>
          <button className="text-xl text-orange-400">
            <FontAwesomeIcon
              icon={viewIdea.bookmark ? fasBookmark : farBookmark}
            />
          </button>
          <button className="text-xl text-sky-400">
            <FontAwesomeIcon icon={viewIdea.public ? fasCompass : farCompass} />
          </button>
        </div>
      </div>
      <div className="p-3 mt-2 flex-col text-base bg-white">
        <div className="py-2 flex justify-between gap-4">
          <Avatar
            alt="avatar"
            src={user.photoURL}
            sx={{
              display: "flex",
              width: "35px",
              height: "35px",
            }}
          />
          <input className="px-2 w-full" placeholder="댓글 추가..." />
          <button className="w-16 text-green-600">
            <FontAwesomeIcon icon={faPaperPlane} size="lg" />
          </button>
        </div>
        <hr />
        <div className="py-2">댓글 10개</div>
        <div className="py-2">댓글 목록</div>
      </div>
    </div>
  );
};

export default ViewIdea;
