import { useState } from "react";
import { authService, dbService } from "fbase";
import { doc, updateDoc, increment } from "firebase/firestore";
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

const ViewIdeaContent = ({
  user,
  isOwner,
  isDeleted,
  whatView,
  setWhatView,
  countInfo,
  setCountInfo,
  timeDisplay,
  onBackClick,
}) => {
  const countRef = doc(dbService, "counts", whatView.id);
  const userIdeaRef = doc(
    dbService,
    "users",
    user.userId,
    "userIdeas",
    whatView.id
  );
  const userRef = doc(dbService, "users", user.userId);

  const onLikeClick = async () => {
    if (whatView.isLiked) {
      if (isDeleted) {
        await updateDoc(userIdeaRef, {
          isLiked: false,
        });
      } else {
        const newCountInfo = {
          ...countInfo,
          like_count: countInfo.like_count - 1,
        };
        delete newCountInfo.like_users[user.userId];
        setCountInfo(newCountInfo);
        await updateDoc(countRef, {
          like_count: increment(-1),
          like_users: countInfo.like_users,
        });
        await updateDoc(userIdeaRef, {
          isLiked: false,
        });
      }
      setWhatView({ ...whatView, isLiked: false });
    } else {
      if (isDeleted) {
        await updateDoc(userIdeaRef, {
          isLiked: true,
        });
      } else {
        await updateDoc(countRef, {
          like_count: increment(1),
          like_users: { ...countInfo.like_users, [user.userId]: user.userName },
        });
        await updateDoc(userIdeaRef, {
          isLiked: true,
        });
        const newCountInfo = {
          ...countInfo,
          like_count: countInfo.like_count + 1,
        };
        setCountInfo(newCountInfo);
      }
      setWhatView({ ...whatView, isLiked: true });
    }
  };

  const onBookmarkClick = async () => {
    if (isOwner) {
      if (whatView.isBookmarked) {
        delete countInfo.bookmark_users[user.userId];
        await updateDoc(countRef, {
          bookmark_count: increment(-1),
          bookmark_users: countInfo.bookmark_users,
        });
        await updateDoc(userIdeaRef, {
          isBookmarked: false,
        });
        const newCountInfo = {
          ...countInfo,
          bookmark_count: countInfo.bookmark_count - 1,
        };
        setCountInfo(newCountInfo);
        setWhatView({ ...whatView, isBookmarked: false });
      } else {
        await updateDoc(countRef, {
          bookmark_count: increment(1),
          bookmark_users: {
            ...countInfo.bookmark_users,
            [user.userId]: user.userName,
          },
        });
        await updateDoc(userIdeaRef, {
          isBookmarked: true,
        });
        const newCountInfo = {
          ...countInfo,
          bookmark_count: countInfo.bookmark_count + 1,
        };
        setCountInfo(newCountInfo);
        setWhatView({ ...whatView, isBookmarked: true });
      }
    } else {
      onBackClick();
      delete countInfo.bookmark_users[user.userId];
      await updateDoc(countRef, {
        bookmark_count: increment(-1),
        bookmark_users: countInfo.bookmark_users,
      });
      await updateDoc(userRef, {
        idea_count: increment(-1),
      });
      await updateDoc(userIdeaRef, {
        isDeleted: true,
      });
    }
  };

  const onPublicClick = async () => {
    if (isOwner) {
      const ideaRef = doc(
        dbService,
        "users",
        user.userId,
        "userIdeas",
        whatView.id
      );
      await updateDoc(ideaRef, { isPublic: !whatView.isPublic });
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
      <div>
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

        {isDeleted ? (
          <div className="flex items-center p-5 pt-1 pb-4 gap-1 text-stone-300 text-xs">
            <FontAwesomeIcon icon={faCircleInfo} />원 작성자가 비공개하거나
            삭제한 아이디어입니다.
          </div>
        ) : (
          <div className="flex items-start p-5 pt-1 pb-4 gap-2 text-stone-400 text-xs">
            <span>
              조회&nbsp;
              {countInfo.view_count}
            </span>
            {countInfo.like_count != 0 && (
              <button
                aria-controls={open ? "demo-positioned-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleEllipsisClick}
              >
                좋아요&nbsp;
                {countInfo.like_count}
              </button>
            )}
            {countInfo.bookmark_count != 0 && (
              <span>저장됨&nbsp;{countInfo.bookmark_count}</span>
            )}
          </div>
        )}
      </div>

      <hr />
      <div className="flex items-center px-5 py-4 mb-56 gap-4">
        <button className="text-red-400 px-2" onClick={onLikeClick}>
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
      {isDeleted === false && (
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
          {Object.values(countInfo.like_users).map((user, index) => (
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
