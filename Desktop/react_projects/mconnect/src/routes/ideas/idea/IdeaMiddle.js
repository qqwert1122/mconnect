import "css/Animation.css";
import { useState, useCallback } from "react";
import { useLongPress } from "use-long-press";
import Dialog from "@mui/material/Dialog";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/free-regular-svg-icons";

const IdeaMiddle = ({ dbIdea, onViewIdeaClick, onSelectIdea, getCategory }) => {
  const [isTagsDialogOpen, setIsTagsDialogOpen] = useState(false);
  const [DialogTags, setDialogTags] = useState([]);

  const onTagsDialogClick = (idea) => {
    setIsTagsDialogOpen((prev) => !prev);
    setDialogTags(idea.tags);
  };

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

  return (
    <div
      className="btn w-full box-border px-4 mt-4 mb-4 duration-200"
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
        {/* <span className="border-box rounded-3xl border-2 mr-1 mb-1 px-3 py-1 shadow-sm duration-500">
          {getCategory(dbIdea).icon}&nbsp;{getCategory(dbIdea).label}
        </span> */}
        {dbIdea.tags.length > 4 ? (
          <>
            {dbIdea.tags
              .filter((tag, index) => index < 4)
              .map((tag, index) => (
                <button
                  key={index}
                  className="mr-1 mb-1 border-box rounded-3xl border-2 px-3 py-1 shadow-sm duration-500 text-stone-500"
                  onClick={() => index === 3 && onTagsDialogClick(dbIdea)}
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
  );
};

export default IdeaMiddle;
