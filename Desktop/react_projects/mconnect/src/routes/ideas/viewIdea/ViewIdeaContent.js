import { useEffect, useState } from "react";
import { dbService } from "fbase";
import {
  doc,
  updateDoc,
  increment,
  getDoc,
  deleteDoc,
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
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";
import {
  faCompass as farCompass,
  faHeart as farHeart,
  faBookmark as farBookmark,
} from "@fortawesome/free-regular-svg-icons";
import { whatViewState, countState } from "atom";
import { useRecoilState } from "recoil";

const ViewIdeaContent = ({
  user,
  itemChangeProps,
  isOwner,
  timeDisplay,
  onBackClick,
  getCount,
  countUpdate,
  onLikeUpdate,
  onBookmarkUpdate,
  onPublicUpdate,
}) => {
  const [whatView, setWhatView] = useRecoilState(whatViewState);
  const [count, setCount] = useState({});

  const [init, setInit] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  // get Data from promise
  getCount(whatView).then((data) => {
    if (data === undefined || null) {
      setIsDeleted(true);
    } else {
      setIsDeleted(false);
    }
    setCount(data);
    // initialize the state of deletion
    setInit(true);
  });

  // click event with firestore
  const onLikeClick = () => {
    onLikeUpdate(whatView);
    countUpdate(whatView, "like");
    setWhatView({ ...whatView, isLiked: !whatView.isLiked });
  };

  const ideaRef = doc(
    dbService,
    "users",
    user.userId,
    "userIdeas",
    whatView.id
  );
  const onBookmarkClick = () => {
    onBookmarkUpdate(whatView);
    countUpdate(whatView, "bookmark");
    setWhatView({ ...whatView, isBookmarked: !whatView.isBookmarked });
    if (isOwner === false) {
      onBackClick();
      deleteDoc(ideaRef);
    }
  };

  const onPublicClick = () => {
    if (isOwner) {
      onPublicUpdate(whatView);
      setWhatView({ ...whatView, isPublic: !whatView.isPublic });
    }
  };

  // Ellipsis Menu
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
      <div className={`${itemChangeProps != 0 && "blur-sm"} duration-100`}>
        {whatView.title !== "" && (
          <div className="flex px-5 pt-5 font-black text-lg break-all">
            {whatView.title}
          </div>
        )}
        <div
          className={`${
            whatView.title === "" ? "p-5" : "px-5 py-3 pb-5"
          } flex items-center gap-2`}
        >
          <Avatar
            className="border-2"
            alt="avatar"
            src={isOwner ? user.userPhotoURL : whatView.userPhotoURL}
            sx={{
              display: "flex",
              width: "30px",
              height: "30px",
            }}
          />
          <div className="flex-col text-xs">
            <span className="font-black flex">
              {isOwner ? user.userName : whatView.userName}
            </span>
            <span className="flex">{whatView.createdAt}</span>
          </div>
        </div>

        <div className="flex p-5 text-base break-all whitespace-pre-line">
          <span>{whatView.text}</span>
        </div>
        {whatView.source.length != 0 && (
          <div className="flex flex-wrap items-center p-5 py-2 gap-2 text-stone-400 text-xs break-all">
            <span className="text-stone-300">
              <FontAwesomeIcon icon={faQuoteLeft} />
            </span>
            <span>{whatView.source}</span>
          </div>
        )}
        {whatView.tags.length != 0 && (
          <div className="flex flex-wrap items-center p-5 pt-1 pb-4 gap-2 text-stone-400 text-xs word-breaks">
            <span className="pt-1 text-stone-300">
              <FontAwesomeIcon icon={faHashtag} />
            </span>
            {whatView.tags.map((tag, index) => (
              <span key={index}>
                {index === whatView.tags.length - 1 ? tag : `${tag},`}
              </span>
            ))}
          </div>
        )}
        {isOwner === false && (
          <div className="flex items-start p-5 pt-1 pb-4 text-stone-400 text-xs">
            {timeDisplay(whatView.updatedAt)}에 저장됨
          </div>
        )}

        {init ? (
          <>
            {isDeleted ? (
              <div className="flex items-center p-5 pt-1 pb-4 gap-1 text-stone-300 text-xs">
                <FontAwesomeIcon icon={faCircleInfo} />원 작성자가 비공개하거나
                삭제한 아이디어입니다.
              </div>
            ) : (
              <div className="flex items-start p-5 pt-1 pb-4 gap-2 text-stone-400 text-xs">
                <span>
                  조회&nbsp;
                  {count.view_count}
                </span>
                {count.like_count != 0 && (
                  <button
                    aria-controls={open ? "demo-positioned-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleEllipsisClick}
                  >
                    좋아요&nbsp;
                    {count.like_count}
                  </button>
                )}
                {count.bookmark_count != 0 && (
                  <span>저장됨&nbsp;{count.bookmark_count}</span>
                )}
              </div>
            )}
          </>
        ) : (
          <></>
        )}
      </div>

      <hr />
      <div
        className={`flex items-center px-5 py-4 gap-4 duration-100 ${
          itemChangeProps != 0 && "blur-sm"
        }`}
      >
        <button
          className="text-red-400 px-2"
          onClick={() => onLikeClick(whatView)}
        >
          <FontAwesomeIcon
            icon={whatView.isLiked ? fasHeart : farHeart}
            size="lg"
          />
        </button>
        <button className="text-orange-400 px-2" onClick={onBookmarkClick}>
          <FontAwesomeIcon
            icon={whatView.isBookmarked ? fasBookmark : farBookmark}
            size="lg"
          />
        </button>
        {isOwner && (
          <button className="text-sky-400 px-2" onClick={onPublicClick}>
            <FontAwesomeIcon
              icon={whatView.isPublic ? fasCompass : farCompass}
              size="lg"
            />
          </button>
        )}
      </div>

      {init && (
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
          {Object.values(count.like_users).map((user, index) => (
            <MenuItem key={index}>
              <div className="text-xs">{user}</div>
            </MenuItem>
          ))}
        </Menu>
      )}
    </>
  );
};

export default ViewIdeaContent;
