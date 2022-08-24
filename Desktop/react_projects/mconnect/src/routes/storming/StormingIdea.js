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
import { useRecoilValue } from "recoil";
import { userState } from "atom";

const StormingIdea = ({ idea, timeDisplay }) => {
  const loggedInUser = useRecoilValue(userState);

  // user Information and Idea's like, bookmark, view count Information
  const [ideaInfo, setIdeaInfo] = useState();

  const getCountInfo = async () => {
    const countDoc = (await getDoc(doc(dbService, "counts", idea.id))).data();
    setIdeaInfo(countDoc);
  };

  const [isOwner, setIsOwner] = useState(loggedInUser.userId === idea.userId);

  useEffect(() => {
    setTimeout(() => {
      getCountInfo();
    }, 1000);
  }, []);

  const onLikeClick = async (idea) => {
    const countRef = doc(dbService, "counts", `${idea.id}`);
    const userIdeaRef = doc(
      dbService,
      "users",
      loggedInUser.userId,
      "userIdeas",
      idea.id
    );
    if (ideaInfo.like_users.hasOwnProperty(loggedInUser.userId)) {
      const newIdeaInfo = { ...ideaInfo };
      delete newIdeaInfo.like_users[loggedInUser.userId];
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
        like_users: {
          ...ideaInfo.like_users,
          [loggedInUser.userId]: loggedInUser.userName,
        },
      });
      if ((await getDoc(userIdeaRef)).data()) {
        await updateDoc(userIdeaRef, {
          isLiked: true,
        });
      }
      const newIdeaInfo = { ...ideaInfo };
      newIdeaInfo.like_users[loggedInUser.userId] = true;
      setIdeaInfo(newIdeaInfo);
    }
  };

  const onBookmarkClick = async (idea) => {
    const countRef = doc(dbService, "counts", idea.id);
    const userIdeaRef = doc(
      dbService,
      "users",
      loggedInUser.userId,
      "userIdeas",
      idea.id
    );
    const userRef = doc(dbService, "users", loggedInUser.userId);
    if (ideaInfo.bookmark_users.hasOwnProperty(loggedInUser.userId)) {
      const newIdeaInfo = { ...ideaInfo };
      delete newIdeaInfo.bookmark_users[loggedInUser.userId];
      setIdeaInfo(newIdeaInfo);
      await updateDoc(countRef, {
        bookmark_count: increment(-1),
        bookmark_users: ideaInfo.bookmark_users,
      });
      if (isOwner === false) {
        await updateDoc(userIdeaRef, { isDeleted: true });
        await updateDoc(userRef, {
          idea_count: increment(-1),
        });
      }
    } else {
      await updateDoc(countRef, {
        bookmark_count: increment(1),
        bookmark_users: {
          ...ideaInfo.bookmark_users,
          [loggedInUser.userId]: loggedInUser.userName,
        },
      });
      const newIdeaInfo = { ...ideaInfo };
      newIdeaInfo.bookmark_users[loggedInUser.userId] = loggedInUser.userName;
      setIdeaInfo(newIdeaInfo);
      if (isOwner === false) {
        await setDoc(userIdeaRef, {
          userId: idea.userId,
          userName: idea.userName,
          userPhotoURL: idea.userPhotoURL,
          title: idea.title,
          text: idea.text,
          source: idea.source,
          tags: idea.tags,
          connectedIDs: idea.connectedIdeas,
          createdAt: idea.createdAt,
          updatedAt: dayjs().format("YYYY. MM. DD. HH:mm:ss"),
          isPublic: false,
          isLiked: ideaInfo.like_users.hasOwnProperty(loggedInUser.userId),
          isBookmarked: true,
          isViewed: ideaInfo.view_users.hasOwnProperty(loggedInUser.userId),
          isOriginal: false,
        });
      }
      await updateDoc(userRef, {
        idea_count: increment(1),
      });
    }
  };

  // handle ellipsis menu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleEllipsisClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleEllipsisClose = () => {
    setAnchorEl(null);
  };

  // handle tag dialog
  const [isTagsDialogOpen, setIsTagsDialogOpen] = useState(false);
  const [DialogTags, setDialogTags] = useState([]);

  const onTagsDialogClick = (idea) => {
    setIsTagsDialogOpen((prev) => !prev);
    setDialogTags(idea.tags);
  };

  return (
    <>
      {ideaInfo ? (
        <>
          <div className="flex justify-between items-center pt-2 ml-4">
            {/* avatar, name, time */}
            <div className="flex items-center gap-2">
              <Avatar
                className="border-2"
                alt="avatar"
                src={idea.userPhotoURL}
                sx={{
                  display: "flex",
                  width: "30px",
                  height: "30px",
                }}
              />
              <div className="flex-col text-xs">
                <div className="flex gap-1">
                  <b>{idea.userName}</b>
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
              <div className="flex items-center mb-2 w-full font-black truncate">
                {idea.title}
              </div>
            )}
            {/* text */}
            <div
              className="w-full mb-5 flex items-center break-all whitespace-pre-line line-clamp-6"
              // onClick={() => {
              //   onViewIdeaClick(dbIdea);
              // }}
            >
              {idea.text}
            </div>
            {/* source */}
            {idea.source !== "" && (
              <div className="flex items-center ml-2 mb-2 text-xs">
                <span className="text-stone-300">
                  <FontAwesomeIcon icon={faQuoteLeft} />
                </span>
                <div className="mx-2 w-full text-stone-400">{idea.source}</div>
              </div>
            )}
            {/* category, tags */}
            {idea.tags.length > 0 && (
              <span className="flex flex-wrap ml-2 pb-2 gap-2 text-xs">
                <span className="text-stone-300">
                  <FontAwesomeIcon icon={faHashtag} />
                </span>
                {idea.tags.length > 4 ? (
                  <>
                    {idea.tags
                      .filter((tag, index) => index < 4)
                      .map((tag, index) => (
                        <button
                          key={index}
                          className="border-box text-stone-400"
                          onClick={() => index === 3 && onTagsDialogClick(idea)}
                        >
                          {index === 3
                            ? `+ ${idea.tags.length - 3}`
                            : `${tag},`}
                        </button>
                      ))}
                  </>
                ) : (
                  <>
                    {idea.tags.map((tag, index) => (
                      <span key={index} className="border-box text-stone-400">
                        {index === idea.tags.length - 1 ? tag : `${tag},`}
                      </span>
                    ))}
                  </>
                )}
              </span>
            )}
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
                ideaInfo.like_users.hasOwnProperty(loggedInUser.userId) &&
                "text-red-400"
              }`}
              onClick={() => onLikeClick(idea)}
            >
              <FontAwesomeIcon
                icon={
                  ideaInfo.like_users.hasOwnProperty(loggedInUser.userId)
                    ? fasHeart
                    : farHeart
                }
                size="lg"
              />
            </button>
            <button
              className={`${
                ideaInfo.bookmark_users.hasOwnProperty(loggedInUser.userId) &&
                "text-orange-400"
              }`}
              onClick={() => onBookmarkClick(idea)}
            >
              <FontAwesomeIcon
                icon={
                  ideaInfo.bookmark_users.hasOwnProperty(loggedInUser.userId)
                    ? fasBookmark
                    : farBookmark
                }
                size="lg"
              />
            </button>
          </div>
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
