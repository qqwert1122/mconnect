import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import {
  doc,
  increment,
  updateDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
  arrayUnion,
  collectionGroup,
  getDocs,
  getDoc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import dayjs from "dayjs";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Dialog from "@mui/material/Dialog";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCopy,
  faCompass as farCompass,
  faHeart as farHeart,
  faBookmark as farBookmark,
  faThumbsUp,
} from "@fortawesome/free-regular-svg-icons";
import {
  faEllipsis,
  faHashtag,
  faFireFlameCurved,
  faDice,
  faBolt,
  faQuoteLeft,
  faCompass as fasCompass,
  faHeart as fasHeart,
  faBookmark as fasBookmark,
} from "@fortawesome/free-solid-svg-icons";
import { Skeleton } from "@mui/material";

const StormingIdea = ({ user, idea, timeDisplay }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  // handle ellipsis menu
  const handleEllipsisClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleEllipsisClose = () => {
    setAnchorEl(null);
  };

  const [isTagsDialogOpen, setIsTagsDialogOpen] = useState(false);
  const [DialogTags, setDialogTags] = useState([]);

  const onTagsDialogClick = (idea) => {
    setIsTagsDialogOpen((prev) => !prev);
    setDialogTags(idea.tags);
  };

  const [userInfo, setUserInfo] = useState();
  const [ideaInfo, setIdeaInfo] = useState();

  const getUserInfo = async () => {
    const userDoc = (await getDoc(doc(dbService, "users", idea.userId))).data();
    setUserInfo(userDoc);
  };

  const getCountInfo = async () => {
    const countDoc = (await getDoc(doc(dbService, "counts", idea.id))).data();
    setIdeaInfo(countDoc);
  };

  const [isOwner, setIsOwner] = useState(user.userId === idea.userId);

  useEffect(() => {
    setTimeout(() => {
      // const countDoc = doc(dbService, "counts", idea.id);
      // onSnapshot(countDoc, (snapshot) => {
      //   const data = snapshot.data();
      //   setIdeaInfo(data);
      // });
      getCountInfo();
      if (isOwner) {
        setUserInfo(user);
      } else {
        getUserInfo();
      }
    }, 1000);
  }, []);

  const onLikeClick = async (idea) => {
    const countRef = doc(dbService, "counts", `${idea.id}`);
    const userIdeaRef = doc(
      dbService,
      "users",
      user.userId,
      "userIdeas",
      idea.id
    );
    if (ideaInfo.like_users.hasOwnProperty(user.userId)) {
      const newIdeaInfo = { ...ideaInfo };
      delete newIdeaInfo.like_users[user.userId];
      setIdeaInfo(newIdeaInfo);
      await updateDoc(countRef, {
        like_count: increment(-1),
        like_users: ideaInfo.like_users,
      });
      if ((await getDoc(userIdeaRef)).data()) {
        await updateDoc(userIdeaRef, {
          isLiked: false,
        });
      }
    } else {
      await updateDoc(countRef, {
        like_count: increment(1),
        like_users: { ...ideaInfo.like_users, [user.userId]: user.userName },
      });
      if ((await getDoc(userIdeaRef)).data()) {
        await updateDoc(userIdeaRef, {
          isLiked: true,
        });
      }
      const newIdeaInfo = { ...ideaInfo };
      newIdeaInfo.like_users[user.userId] = true;
      setIdeaInfo(newIdeaInfo);
    }
  };

  const onBookmarkClick = async (idea) => {
    const countRef = doc(dbService, "counts", idea.id);
    const ideaRef = doc(dbService, "users", user.userId, "userIdeas", idea.id);
    if (ideaInfo.bookmark_users.hasOwnProperty(user.userId)) {
      const newIdeaInfo = { ...ideaInfo };
      delete newIdeaInfo.bookmark_users[user.userId];
      setIdeaInfo(newIdeaInfo);
      await updateDoc(countRef, {
        bookmark_count: increment(-1),
        bookmark_users: ideaInfo.bookmark_users,
      });
      if (isOwner === false) {
        deleteDoc(ideaRef);
      }
    } else {
      await updateDoc(countRef, {
        bookmark_count: increment(1),
        bookmark_users: {
          ...ideaInfo.bookmark_users,
          [user.userId]: user.userName,
        },
      });
      const newIdeaInfo = { ...ideaInfo };
      newIdeaInfo.bookmark_users[user.userId] = user.userName;
      setIdeaInfo(newIdeaInfo);
      if (isOwner === false) {
        await setDoc(ideaRef, {
          userId: idea.userId,
          userName: userInfo.userName,
          userPhotoURL: userInfo.userPhotoURL,
          title: idea.title,
          text: idea.text,
          source: idea.source,
          tags: idea.tags,
          connectedIdeas: idea.connectedIdeas,
          createdAt: idea.createdAt,
          updatedAt: dayjs().format("YYYY. MM. DD. HH:mm:ss"),
          isPublic: false,
          isLiked: ideaInfo.like_users.hasOwnProperty(user.userId),
          isBookmarked: true,
          isViewed: ideaInfo.view_users.hasOwnProperty(user.userId),
        });
      }
    }
  };

  return (
    <>
      {userInfo && ideaInfo ? (
        <>
          <div className="flex justify-between items-center pt-2 ml-4">
            {/* avatar, name, time */}
            <div className="flex items-center gap-2">
              <Avatar
                className="border-2"
                alt="avatar"
                src={userInfo.userPhotoURL}
                sx={{
                  display: "flex",
                  width: "30px",
                  height: "30px",
                }}
              />
              <div className="flex-col text-xs">
                <div className="flex gap-1">
                  <b>{userInfo.userName}</b>
                </div>
                {timeDisplay(idea.createdAt)}
              </div>
            </div>
            {/* ellipsis */}
            <Button
              id="demo-positioned-button"
              aria-controls={open ? "demo-positioned-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleEllipsisClick}
              sx={{
                color: "inherit",
              }}
            >
              <FontAwesomeIcon icon={faEllipsis} size="lg" />
            </Button>
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
              <MenuItem onClick={handleEllipsisClose}>
                <FontAwesomeIcon icon={faCopy} />
                &nbsp; 복사
              </MenuItem>
            </Menu>
          </div>
          <div className="w-full box-border px-4 mt-4 mb-4 duration-200">
            {/* title */}
            {idea.title !== "" && (
              <div className="flex items-center pb-2 w-full font-black">
                {idea.title}
              </div>
            )}
            {/* text */}
            <div
              className="w-full pb-5 flex items-center break-all whitespace-pre-line"
              // onClick={() => {
              //   onViewIdeaClick(dbIdea);
              // }}
            >
              {idea.text.length > 200 ? (
                <>
                  {idea.text.substr(0, 200)}
                  ...
                </>
              ) : (
                idea.text
              )}
            </div>
            {/* source */}
            {idea.source !== "" && (
              <div className="flex items-center ml-2 pb-2 text-xs text-stone-500">
                <FontAwesomeIcon icon={faQuoteLeft} />
                <div className="mx-2 w-full">{idea.source}</div>
              </div>
            )}
            {/* category, tags */}
            <span className="flex flex-wrap text-xs">
              {idea.tags.length > 4 ? (
                <>
                  {idea.tags
                    .filter((tag, index) => index < 4)
                    .map((tag, index) => (
                      <button
                        key={index}
                        className="mr-1 mb-1 border-box rounded-3xl border-2 px-3 py-1 shadow-sm duration-500"
                        onClick={() => index === 3 && onTagsDialogClick(idea)}
                      >
                        {index === 3 ? `+ ${idea.tags.length - 3}` : tag}
                      </button>
                    ))}
                </>
              ) : (
                <>
                  {idea.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="mr-1 mb-1 border-box rounded-3xl border-2 px-3 py-1 shadow-sm duration-500"
                    >
                      {tag}
                    </span>
                  ))}
                </>
              )}
            </span>
            <Dialog
              open={isTagsDialogOpen}
              onClose={() => {
                setIsTagsDialogOpen(false);
              }}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              sx={{}}
            >
              <List sx={{ pt: 0 }}>
                {DialogTags.map((tag, index) => (
                  <ListItem button key={index}>
                    <ListItemText primary={tag} />
                  </ListItem>
                ))}
              </List>
            </Dialog>
          </div>
          <div className="flex px-5 pb-5 gap-5 text-stone-500">
            <button
              className={`${
                ideaInfo.like_users.hasOwnProperty(user.userId) &&
                "text-red-400"
              }`}
              onClick={() => onLikeClick(idea)}
            >
              <FontAwesomeIcon
                icon={
                  ideaInfo.like_users.hasOwnProperty(user.userId)
                    ? fasHeart
                    : farHeart
                }
                size="lg"
              />
            </button>
            <button
              className={`${
                ideaInfo.bookmark_users.hasOwnProperty(user.userId) &&
                "text-orange-400"
              }`}
              onClick={() => onBookmarkClick(idea)}
            >
              <FontAwesomeIcon
                icon={
                  ideaInfo.bookmark_users.hasOwnProperty(user.userId)
                    ? fasBookmark
                    : farBookmark
                }
                size="lg"
              />
            </button>
          </div>
          <hr />
        </>
      ) : (
        <div className="ml-4 pt-2">
          <div className="flex items-center gap-2">
            <Skeleton variant="circular" width={30} height={30} />
            <Skeleton variant="text" width={100} height={30} />
          </div>
          <Skeleton variant="text" width={320} height={160} />
        </div>
      )}
    </>
  );
};

export default StormingIdea;
