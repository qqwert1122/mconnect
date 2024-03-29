import "css/Animation.css";
import { useState, useCallback } from "react";
import { useLongPress } from "use-long-press";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Ripples from "react-ripples";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faHashtag,
  faQuoteLeft,
} from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/free-regular-svg-icons";

const IdeaMiddle = ({
  isOwner,
  idea,
  onIdeaClick,
  onSelectIdea,
  timeDisplay,
}) => {
  const [dialogTags, setDialogTags] = useState([]);
  const [anchorEl, setAnchorEl] = useState(false);

  // callback functions when long pressed
  const callback = useCallback((event) => {
    onSelectIdea(idea);
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

  // const handleEllipsisClick = (event, idea) => {
  //   setDialogTags(idea.tags);
  //   setAnchorEl(event.currentTarget);
  // };

  const handleEllipsisClose = () => {
    setAnchorEl(false);
  };

  return (
    <Ripples className="w-full">
      <div
        className="w-full box-border px-4 mt-4 mb-4 "
        {...bind()}
        onClick={() => {
          onIdeaClick(idea);
        }}
      >
        {/* title */}
        {idea.title !== "" && (
          <div className="flex items-center mb-2 w-full break-all font-black truncate">
            {idea.title}
          </div>
        )}
        {/* text */}
        <div className="w-full mb-5 flex items-center break-all whitespace-pre-line line-clamp-6">
          {idea.text}
        </div>
        {/* source */}
        {idea.source !== "" && (
          <div className="flex items-center ml-2 pb-2 gap-2 text-xs">
            <span className="text-stone-300">
              <FontAwesomeIcon icon={faQuoteLeft} />
            </span>
            <div className="w-full truncate text-stone-400">{idea.source}</div>
          </div>
        )}
        {/* category, tags */}
        {idea.tags.length > 0 && (
          <span className="flex flex-wrap ml-2 pb-2 gap-1 text-xs">
            <span className="text-stone-300">
              <FontAwesomeIcon icon={faHashtag} />
            </span>
            {idea.tags.length > 6 ? (
              <>
                {idea.tags
                  .filter((tag, index) => index < 6)
                  .map((tag, index) => (
                    <button
                      key={index}
                      id="demo-positioned-button"
                      aria-controls={open ? "demo-positioned-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      // onClick={(e) =>
                      //   index === 5 && handleEllipsisClick(e, idea)
                      // }
                      className="border-box text-stone-400"
                      sx={{
                        color: "inherit",
                      }}
                    >
                      {index === 5 ? `...` : `${tag},`}
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
        {isOwner === false && (
          <span className="flex items-center pt-5 pb-2 text-xs text-stone-400">
            {timeDisplay(idea.updatedAt)}에 저장됨
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
    </Ripples>
  );
};

export default IdeaMiddle;
