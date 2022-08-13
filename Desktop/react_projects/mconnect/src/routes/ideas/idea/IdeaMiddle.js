import "css/Animation.css";
import { useState, useCallback } from "react";
import { useLongPress } from "use-long-press";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHashtag, faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/free-regular-svg-icons";

const IdeaMiddle = ({
  user,
  isOwner,
  userIdea,
  onViewIdeaClick,
  onSelectIdea,
  timeDisplay,
}) => {
  const [dialogTags, setDialogTags] = useState([]);
  const [anchorEl, setAnchorEl] = useState(false);

  // toast message when long pressed
  const callback = useCallback((event) => {
    onSelectIdea(userIdea);
  });

  const bind = useLongPress(callback, {
    filterEvents: (event) => true,
    threshold: 1000,
    captureEvent: true,
    cancelOnMovement: false,
    detect: "both",
  });

  // tag ellipsis menu
  const open = Boolean(anchorEl);
  const handleEllipsisClick = (event, idea) => {
    setDialogTags(idea.tags);
    setAnchorEl(event.currentTarget);
  };
  const handleEllipsisClose = () => {
    setAnchorEl(false);
  };

  return (
    <div className="w-full box-border px-4 mt-4 mb-4 " {...bind()}>
      {/* title */}
      {userIdea.title !== "" && (
        <div className="flex items-center mb-2 w-full break-all font-black">
          {userIdea.title}
        </div>
      )}
      {/* text */}
      <div
        className="w-full mb-5 flex items-center break-all whitespace-pre-line line-clamp-6"
        onClick={() => {
          onViewIdeaClick(userIdea);
        }}
      >
        {userIdea.text}
      </div>
      {/* source */}
      {userIdea.source !== "" && (
        <div className="flex items-center ml-2 pb-2 gap-2 text-xs">
          <span className="text-stone-300">
            <FontAwesomeIcon icon={faQuoteLeft} />
          </span>
          <div className="w-full truncate text-stone-400">
            {userIdea.source}
          </div>
        </div>
      )}
      {/* category, tags */}
      {userIdea.tags.length > 0 && (
        <span className="flex flex-wrap ml-2 pb-2 gap-2 text-xs">
          <span className="text-stone-300">
            <FontAwesomeIcon icon={faHashtag} />
          </span>
          {userIdea.tags.length > 4 ? (
            <>
              {userIdea.tags
                .filter((tag, index) => index < 4)
                .map((tag, index) => (
                  <button
                    key={index}
                    id="demo-positioned-button"
                    aria-controls={open ? "demo-positioned-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={(e) =>
                      index === 3 && handleEllipsisClick(e, userIdea)
                    }
                    className="border-box text-stone-400"
                    sx={{
                      color: "inherit",
                    }}
                  >
                    {index === 3 ? `+ ${userIdea.tags.length - 3}` : `${tag},`}
                  </button>
                ))}
            </>
          ) : (
            <>
              {userIdea.tags.map((tag, index) => (
                <span key={index} className="border-box text-stone-400">
                  {index === userIdea.tags.length - 1 ? tag : `${tag},`}
                </span>
              ))}
            </>
          )}
        </span>
      )}
      {isOwner === false && (
        <span className="flex items-center pt-5 pb-2 text-xs text-stone-400">
          {timeDisplay(userIdea.updatedAt)}에 저장됨
        </span>
      )}

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
        {dialogTags
          .filter((tag, index) => index > 2)
          .map((tag, index) => (
            <MenuItem key={index}>
              <div className="text-xs">{tag}</div>
            </MenuItem>
          ))}
      </Menu>
    </div>
  );
};

export default IdeaMiddle;
