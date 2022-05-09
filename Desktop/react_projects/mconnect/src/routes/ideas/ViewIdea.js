import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faHashtag,
  faQuoteLeft,
  faCompass as fasCompass,
  faHeart as fasHeart,
  faBookmark as fasBookmark,
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

  const onBackClick = () => {
    navigate("/ideas", { replace: true });
  };

  return (
    <div className="text-sm bg-stone-100">
      <div className="flex-col min-h-screen bg-white">
        <div className="flex justify-between items-center p-5">
          <button onClick={onBackClick}>
            <FontAwesomeIcon icon={faChevronLeft} size="xl" />
          </button>
          <span className="p-2 text-base font-black text-white bg-green-600 rounded-xl">
            수정
          </span>
        </div>
        <hr />
        <div className="p-5 flex items-center font-black gap-4">
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
        {viewIdea.title === "" ? (
          <></>
        ) : (
          <div className="flex p-5 font-black text-lg">
            <span>{viewIdea.title}</span>
          </div>
        )}
        <div className="flex p-5 ">
          <span>{viewIdea.text}</span>
        </div>
        <div className="flex items-center p-5 py-2 gap-4">
          <FontAwesomeIcon icon={faQuoteLeft} />
          <span>{viewIdea.source}</span>
        </div>
        <div className="flex items-start p-5 py-2 gap-4">
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
        <div className="flex p-5 gap-4">
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
    </div>
  );
};

export default ViewIdea;
