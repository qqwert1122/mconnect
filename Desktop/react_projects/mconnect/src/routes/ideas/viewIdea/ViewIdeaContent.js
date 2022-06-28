import { useState } from "react";
import { authService, dbService } from "fbase";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
  addDoc,
  doc,
  getDoc,
  documentId,
  setDoc,
} from "firebase/firestore";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
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

const ViewIdeaContent = ({ viewIdea, user }) => {
  const [anchorEl, setAnchorEl] = useState(false);

  const open = Boolean(anchorEl);
  const handleEllipsisClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleEllipsisClose = () => {
    setAnchorEl(false);
  };
  return (
    <>
      <div>
        {viewIdea.title !== "" && (
          <div className="flex px-5 pt-5 font-black text-lg">
            {viewIdea.title}
          </div>
        )}
        <div
          className={`${
            viewIdea.title === "" ? "p-5" : "px-5 py-3 pb-5"
          } flex items-center gap-2`}
        >
          <Avatar
            className="border-2"
            alt="avatar"
            src={viewIdea.userPhotoURL}
            sx={{
              display: "flex",
              width: "30px",
              height: "30px",
            }}
          />
          <div className="flex-col text-xs">
            <span className="font-black flex">{viewIdea.userName}</span>
            <span className="flex">{viewIdea.createdAt}</span>
          </div>
        </div>

        <div className="flex p-5 text-base whitespace-pre-line">
          <span>{viewIdea.text}</span>
        </div>
        {viewIdea.source.length != 0 && (
          <div className="flex items-center p-5 py-2 gap-2 text-stone-500">
            <FontAwesomeIcon icon={faQuoteLeft} />
            <span>{viewIdea.source}</span>
          </div>
        )}
        {viewIdea.tags.length != 0 && (
          <div className="flex items-start p-5 pt-1 pb-4 gap-2 text-stone-500">
            <span className="pt-1">
              <FontAwesomeIcon icon={faHashtag} />
            </span>
            <span className="flex flex-wrap">
              {viewIdea.tags.map((tag, index) => (
                <button
                  key={index}
                  className="border-box rounded-3xl border-2 mr-1 mb-1 px-3 py-1 text-xs shadow-sm duration-500 break-words bg-white"
                >
                  {tag}
                </button>
              ))}
            </span>
          </div>
        )}

        <div className="flex items-start p-5 pt-1 pb-4 gap-2 text-stone-400 text-xs">
          <span>
            조회&nbsp;
            {viewIdea.viewCount}
          </span>
          {viewIdea.likeUsers.length != 0 && (
            <button
              aria-controls={open ? "demo-positioned-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleEllipsisClick}
            >
              좋아요&nbsp;
              {viewIdea.likeUsers.length}
            </button>
          )}
        </div>
      </div>

      <hr />
      <div className="flex items-center px-5 py-4 gap-4">
        <button className="text-red-400 px-2">
          <FontAwesomeIcon
            icon={
              viewIdea.likeUsers.includes(user.userId) ? fasHeart : farHeart
            }
            size="xl"
          />
        </button>
        <button className="text-orange-400 px-2">
          <FontAwesomeIcon
            icon={viewIdea.bookmark ? fasBookmark : farBookmark}
            size="xl"
          />
        </button>
        <button className="text-sky-400 px-2">
          <FontAwesomeIcon
            icon={viewIdea.public ? fasCompass : farCompass}
            size="xl"
          />
        </button>
      </div>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleEllipsisClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        {viewIdea.likeUsers.map((user, index) => (
          <MenuItem key={index}>
            <div className="text-xs">{user}</div>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default ViewIdeaContent;
