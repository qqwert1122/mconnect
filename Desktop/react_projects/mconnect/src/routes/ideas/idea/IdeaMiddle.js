import "css/Animation.css";
import { useState, useCallback } from "react";
import { useLongPress } from "use-long-press";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/free-regular-svg-icons";
import { Skeleton } from "@mui/material";

const IdeaMiddle = ({ userInfo, dbIdea, onViewIdeaClick, onSelectIdea }) => {
  const [DialogTags, setDialogTags] = useState([]);
  const [anchorEl, setAnchorEl] = useState(false);

  // toast message when long pressed
  const callback = useCallback((event) => {
    onSelectIdea(dbIdea);
  }, []);

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
    <>
      {userInfo ? (
        <div
          className="w-full box-border px-4 mt-4 mb-4 duration-200"
          {...bind()}
        >
          {/* title */}
          {dbIdea.title !== "" && (
            <div className="flex items-center pb-2 w-full font-black">
              {dbIdea.title}
            </div>
          )}
          {/* text */}
          <div
            className="w-full pb-5 flex items-center break-all whitespace-pre-line"
            onClick={() => {
              onViewIdeaClick(dbIdea);
            }}
          >
            {dbIdea.text.length > 200 ? (
              <>
                {dbIdea.text.substr(0, 200)}
                ...
              </>
            ) : (
              dbIdea.text
            )}
          </div>
          {/* source */}
          {dbIdea.source !== "" && (
            <div className="flex items-center ml-2 pb-2 text-xs text-stone-500">
              <FontAwesomeIcon icon={faQuoteLeft} />
              <div className="mx-2 w-full">{dbIdea.source}</div>
            </div>
          )}
          {/* category, tags */}
          <span className="flex flex-wrap text-xs">
            {dbIdea.tags.length > 4 ? (
              <>
                {dbIdea.tags
                  .filter((tag, index) => index < 4)
                  .map((tag, index) => (
                    <button
                      key={index}
                      id="demo-positioned-button"
                      aria-controls={open ? "demo-positioned-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={(e) =>
                        index === 3 && handleEllipsisClick(e, dbIdea)
                      }
                      className="mr-1 mb-1 border-box rounded-3xl border-2 px-3 py-1 shadow-sm duration-500 text-stone-500"
                      sx={{
                        color: "inherit",
                      }}
                    >
                      {index === 3 ? `+ ${dbIdea.tags.length - 3}` : tag}
                    </button>
                  ))}
              </>
            ) : (
              <>
                {dbIdea.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="mr-1 mb-1 border-box rounded-3xl border-2 px-3 py-1 shadow-sm duration-500 text-stone-500"
                  >
                    {tag}
                  </span>
                ))}
              </>
            )}
          </span>
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
            {DialogTags.filter((tag, index) => index > 2).map((tag, index) => (
              <MenuItem key={index}>
                <div className="text-xs">{tag}</div>
              </MenuItem>
            ))}
          </Menu>
        </div>
      ) : (
        <div className="flex justify-center">
          <Skeleton variant="text" width={320} height={160} />
        </div>
      )}
    </>
  );
};

export default IdeaMiddle;
