import BottomNavigationBar from "routes/BottomNavigationBar";
import StormingTopBar from "./StormingTopBar";
import StormingToggleButton from "./StormingToggleButton";
import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import {
  doc,
  updateDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
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
import StormingTagBar from "./StormingTagBar";

const Storming = ({ customHooks }) => {
  const timeDisplay = customHooks.timeDisplay;
  const getCategory = customHooks.getCategory;
  const loggedInUser = customHooks.loggedInUser;

  const [anchorEl, setAnchorEl] = useState(null);
  const [ideasPublic, setIdeasPublic] = useState([]);

  const [isTagsDialogOpen, setIsTagsDialogOpen] = useState(false);
  const [DialogTags, setDialogTags] = useState([]);

  const onTagsDialogClick = (idea) => {
    setIsTagsDialogOpen((prev) => !prev);
    setDialogTags(idea.tags);
  };

  useEffect(() => {
    if (customHooks.isLoggedIn) {
      const q1 = query(
        collection(dbService, "ideas"),
        where("public", "==", true),
        orderBy("createdAt", "desc")
      );
      onSnapshot(q1, (snapshot) => {
        const ideas = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setIdeasPublic(ideas);
      });
    }
  }, []);

  const open = Boolean(anchorEl);

  // handle ellipsis menu
  const handleEllipsisClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleEllipsisClose = () => {
    setAnchorEl(null);
  };

  const onLikeClick = async (idea) => {
    const ideaRef = doc(dbService, "ideas", `${idea.id}`);
    if (idea.likeUsers.includes(loggedInUser.userId)) {
      await updateDoc(ideaRef, {
        likeUsers: idea.likeUsers.filter(
          (fUser) => fUser != loggedInUser.userId
        ),
      });
    } else {
      await updateDoc(ideaRef, {
        likeUsers: [...idea.likeUsers, loggedInUser.userId],
      });
    }
  };

  const onBookmarkClick = async (idea) => {
    const ideaRef = doc(dbService, "ideas", `${idea.id}`);
    await updateDoc(ideaRef, { bookmark: !idea.bookmark });
  };

  return (
    <>
      <BottomNavigationBar customHooks={customHooks} />
      <StormingTopBar />
      <div className="bg-stone-100 pb-14 text-sm">
        {/* <StormingToggleButton /> */}
        <StormingTagBar />

        <div className="pt-2 min-h-screen bg-white">
          {ideasPublic.map((idea, index) => (
            <div key={index} className="bg-white">
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
                  <span className="border-box rounded-3xl border-2 mr-1 mb-1 px-3 py-1 shadow-sm duration-500">
                    {getCategory(idea).icon}&nbsp;{getCategory(idea).label}
                  </span>
                  {idea.tags.length > 4 ? (
                    <>
                      {idea.tags
                        .filter((tag, index) => index < 4)
                        .map((tag, index) => (
                          <button
                            key={index}
                            className="mr-1 mb-1 border-box rounded-3xl border-2 px-3 py-1 shadow-sm duration-500"
                            onClick={() =>
                              index === 3 && onTagsDialogClick(idea)
                            }
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
                    idea.likeUsers.includes(loggedInUser.userId) &&
                    "text-red-400"
                  }`}
                  onClick={() => onLikeClick(idea)}
                >
                  <FontAwesomeIcon
                    icon={
                      idea.likeUsers.includes(loggedInUser.userId)
                        ? fasHeart
                        : farHeart
                    }
                    size="lg"
                  />
                </button>
                <button
                  className={`${idea.bookmark && "text-orange-400"}`}
                  onClick={() => onBookmarkClick(idea)}
                >
                  <FontAwesomeIcon
                    icon={idea.bookmark ? fasBookmark : farBookmark}
                    size="lg"
                  />
                </button>
              </div>
              <hr />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Storming;
