import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import {
  doc,
  increment,
  updateDoc,
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
  faHeart as farHeart,
  faBookmark as farBookmark,
  faThumbsUp,
} from "@fortawesome/free-regular-svg-icons";
import {
  faEllipsis,
  faHashtag,
  faQuoteLeft,
  faHeart as fasHeart,
  faBookmark as fasBookmark,
} from "@fortawesome/free-solid-svg-icons";
import { Skeleton } from "@mui/material";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "atom";
import { ideasState } from "atom";
import { matchPath, matchRoutes } from "react-router-dom";

const StormingIdea = ({ idea, timeDisplay }) => {
  const loggedInUser = useRecoilValue(userState);
  const isOwner = loggedInUser.userId === idea.userId;

  const countRef = doc(dbService, "counts", idea.docId);
  const userIdeaRef = doc(
    dbService,
    "users",
    loggedInUser.userId,
    "userIdeas",
    idea.docId
  );
  const userRef = doc(dbService, "users", loggedInUser.userId);
  const [ideas, setIdeas] = useRecoilState(ideasState);
  const [count, setCount] = useState();

  const getCount = async () => {
    const countDoc = (await getDoc(countRef)).data();
    setCount(countDoc);
  };

  useEffect(() => {
    setTimeout(() => {
      getCount();
    }, 1000);
  }, []);

  const onLikeClick = async () => {
    if (count.like_users.hasOwnProperty(loggedInUser.userId)) {
      const newCount = { ...count };
      delete newCount.like_users[loggedInUser.userId];
      setCount(newCount);
      await updateDoc(countRef, {
        like_count: increment(-1),
        like_users: newCount.like_users,
      });
      if ((await getDoc(userIdeaRef)).data()) {
        await updateDoc(userIdeaRef, {
          isLiked: false,
        });
      }
    } else {
      const newCount = { ...count };
      newCount.like_users[loggedInUser.userId] = loggedInUser.userName;
      setCount(newCount);
      await updateDoc(countRef, {
        like_count: increment(1),
        like_users: {
          ...count.like_users,
          [loggedInUser.userId]: loggedInUser.userName,
        },
      });
      if ((await getDoc(userIdeaRef)).data()) {
        await updateDoc(userIdeaRef, {
          isLiked: true,
        });
      }
    }
    setIdeas(
      ideas.map((m) =>
        m.docId === idea.docId ? { ...m, isLiked: !m.isLiked } : m
      )
    );
  };

  const onBookmarkClick = async (idea) => {
    const newCount = { ...count };
    if (count.bookmark_users.hasOwnProperty(loggedInUser.userId)) {
      delete newCount.bookmark_users[loggedInUser.userId];
      setCount(newCount);
      await updateDoc(countRef, {
        bookmark_count: increment(-1),
        bookmark_users: newCount.bookmark_users,
      });
      if (isOwner) {
        await updateDoc(userIdeaRef, {
          isBookmarked: false,
        });
        setIdeas(
          ideas.map((m) =>
            m.docId === idea.docId ? { ...m, isBookmarked: false } : m
          )
        );
      } else {
        await deleteDoc(userIdeaRef);
        await updateDoc(userRef, {
          idea_count: increment(-1),
        });
        setIdeas(ideas.filter((f) => f.docId !== idea.docId));
      }
    } else {
      newCount.bookmark_users[loggedInUser.userId] = loggedInUser.userName;
      setCount(newCount);
      await updateDoc(countRef, {
        bookmark_count: increment(1),
        bookmark_users: {
          ...count.bookmark_users,
          [loggedInUser.userId]: loggedInUser.userName,
        },
      });
      if (isOwner) {
        await updateDoc(userIdeaRef, {
          isBookmarked: true,
        });
        setIdeas(
          ideas.map((m) =>
            m.docId === idea.docId ? { ...m, isBookmarked: true } : m
          )
        );
      } else {
        await setDoc(userIdeaRef, {
          docId: idea.docId,
          userId: idea.userId,
          userName: idea.userName,
          userPhotoURL: idea.userPhotoURL,
          title: idea.title,
          text: idea.text,
          source: idea.source,
          tags: idea.tags,
          connectedIDs: idea.connectedIDs,
          createdAt: idea.createdAt,
          updatedAt: dayjs().format("YYYY. MM. DD. HH:mm:ss"),
          isPublic: false,
          isLiked: count.like_users.hasOwnProperty(loggedInUser.userId),
          isBookmarked: true,
          isViewed: count.view_users.hasOwnProperty(loggedInUser.userId),
          isOriginal: false,
        });
        await updateDoc(userRef, {
          idea_count: increment(1),
        });
        setIdeas([
          {
            docId: idea.docId,
            userId: idea.userId,
            userName: idea.userName,
            userPhotoURL: idea.userPhotoURL,
            title: idea.title,
            text: idea.text,
            source: idea.source,
            tags: idea.tags,
            connectedIDs: idea.connectedIDs,
            createdAt: idea.createdAt,
            updatedAt: dayjs().format("YYYY. MM. DD. HH:mm:ss"),
            isPublic: false,
            isLiked: count.like_users.hasOwnProperty(loggedInUser.userId),
            isBookmarked: true,
            isViewed: count.view_users.hasOwnProperty(loggedInUser.userId),
            isOriginal: false,
          },
          ...ideas,
        ]);
      }
    }
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleEllipsisClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleEllipsisClose = () => {
    setAnchorEl(null);
  };

  const onRecommendationClick = async () => {
    const recommendRef = doc(dbService, "recommendation", idea.docId);
    await setDoc(recommendRef, {
      ...idea,
      isBookmarked: false,
      isLiked: false,
      isOriginal: false,
      isViewed: false,
    });
    handleEllipsisClose();
  };

  const [isTagsDialogOpen, setIsTagsDialogOpen] = useState(false);
  const [DialogTags, setDialogTags] = useState([]);

  const onTagsDialogClick = (idea) => {
    setIsTagsDialogOpen((prev) => !prev);
    setDialogTags(idea.tags);
  };

  return (
    <>
      {count ? (
        <>
          <div className="flex justify-between items-center pt-4 ml-4">
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
              {loggedInUser.isAuthority && (
                <MenuItem onClick={onRecommendationClick}>
                  <FontAwesomeIcon icon={faThumbsUp} />
                  &nbsp; 추천
                </MenuItem>
              )}
            </Menu>
          </div>
          <div className="w-full box-border px-4 mt-4 mb-4 duration-200">
            {idea.title !== "" && (
              <div className="flex items-center mb-2 w-full font-black truncate">
                {idea.title}
              </div>
            )}
            <div
              className="w-full mb-5 flex items-center break-all whitespace-pre-line line-clamp-6"
              // onClick={() => {
              //   onViewIdeaClick(dbIdea);
              // }}
            >
              {idea.text}
            </div>
            {idea.source !== "" && (
              <div className="flex items-center ml-2 mb-2 text-xs">
                <span className="text-stone-300">
                  <FontAwesomeIcon icon={faQuoteLeft} />
                </span>
                <div className="mx-2 w-full text-stone-400">{idea.source}</div>
              </div>
            )}
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
                count.like_users.hasOwnProperty(loggedInUser.userId) &&
                "text-red-400"
              }`}
              onClick={() => onLikeClick(idea)}
            >
              <FontAwesomeIcon
                icon={
                  count.like_users.hasOwnProperty(loggedInUser.userId)
                    ? fasHeart
                    : farHeart
                }
                size="lg"
              />
            </button>
            <button
              className={`${
                count.bookmark_users.hasOwnProperty(loggedInUser.userId) &&
                "text-orange-400"
              }`}
              onClick={() => onBookmarkClick(idea)}
            >
              <FontAwesomeIcon
                icon={
                  count.bookmark_users.hasOwnProperty(loggedInUser.userId)
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
