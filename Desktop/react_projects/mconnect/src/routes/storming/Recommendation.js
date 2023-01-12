import Avatar from "@mui/material/Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {} from "@fortawesome/free-regular-svg-icons";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";

const Recommendation = ({ idea }) => {
  return (
    <div className="relative">
      <div className="h-60 p-5 m-1 mx-2 bg-sky-50 shadow-md rounded-xl break-all text-xs">
        <div className="mb-2 truncate font-black text-sm">{idea.title}</div>
        <div className="mb-3 line-clamp-6">{idea.text}</div>
        <div className="ml-2 mb-1 flex gap-1 text-stone-400">
          <FontAwesomeIcon icon={faQuoteLeft} />
          <span>{idea.source}</span>
        </div>
        <div className="absolute bottom-4 left-6 flex items-center gap-2 text-xs">
          <Avatar
            className="border-2 border-white"
            alt="avatar"
            sx={{
              display: "flex",
              width: "25px",
              height: "25px",
            }}
            src={idea.userPhotoURL}
          />
          <div className="flex-col">
            <span className="flex">{idea.userName}</span>
            <span className="flex text-stone-400">{idea.createdAt}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recommendation;
