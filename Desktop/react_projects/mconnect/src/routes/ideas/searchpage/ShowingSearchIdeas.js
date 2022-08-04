import { useEffect, useState } from "react";
import Highlighter from "react-highlight-words";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faHashtag,
  faQuoteLeft,
} from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";

const ShowingSearchIdeas = ({
  navigate,
  setWhatView,
  showingSearchIdeas,
  searchTerm,
  selectedIdeas,
  setSelectedIdeas,
  listAllCriteria,
}) => {
  const [DialogTags, setDialogTags] = useState([]);
  const [anchorEl, setAnchorEl] = useState(false);

  const onViewIdeaClick = (idea) => {
    setWhatView(idea);
    navigate(`/${idea.id}`);
  };

  const onIdeaClick = (idea) => {
    if (selectedIdeas.includes(idea)) {
      setSelectedIdeas(selectedIdeas.filter((_idea) => _idea !== idea));
    } else {
      setSelectedIdeas([...selectedIdeas, idea]);
    }
  };

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
      {showingSearchIdeas
        .filter(
          (idea) =>
            idea.title.includes(searchTerm) ||
            idea.text.includes(searchTerm) ||
            idea.source.includes(searchTerm) ||
            idea.tags.includes(searchTerm) ||
            idea.userName.includes(searchTerm)
        )
        .map((idea) => (
          <div key={idea.id} className="flex items-center">
            <div>
              <button
                className={`ml-3 box-border opacity rounded-full shadow ${
                  selectedIdeas.includes(idea)
                    ? "bg-red-400 text-white"
                    : "bg-white border-2 border-stone-400"
                } w-6 h-6`}
                onClick={() => {
                  onIdeaClick(idea);
                }}
              >
                {selectedIdeas.includes(idea) && (
                  <FontAwesomeIcon icon={faCheck} />
                )}
              </button>
            </div>
            <div
              className={` ${
                selectedIdeas.includes(idea)
                  ? "shadow-lg shadow-red-200"
                  : "shadow"
              } w-full ml-3 mr-2 mt-4 mb-2 p-2 text-sm bg-white rounded-xl duration-200`}
            >
              <div className="py-2 flex-col">
                <div className="font-black pb-1">
                  <Highlighter
                    highlightClassName="YourHighlightClass"
                    searchWords={[searchTerm]}
                    autoEscape={true}
                    textToHighlight={idea.title}
                  />
                </div>
                <div
                  className="pt-1 pb-3"
                  onClick={() => onViewIdeaClick(idea)}
                >
                  {idea.text.length > 200 ? (
                    <>
                      <Highlighter
                        highlightClassName="YourHighlightClass"
                        searchWords={[searchTerm]}
                        autoEscape={true}
                        textToHighlight={idea.text.substr(0, 200)}
                      />
                      ...
                    </>
                  ) : (
                    <Highlighter
                      highlightClassName="YourHighlightClass"
                      searchWords={[searchTerm]}
                      autoEscape={true}
                      textToHighlight={idea.text}
                    />
                  )}
                </div>
                <div className="w-full text-xs text-stone-400">
                  {idea.source && (
                    <div className="ml-2 flex gap-1">
                      <FontAwesomeIcon icon={faQuoteLeft} />
                      {idea.source && (
                        <>
                          <div className="pb-1">
                            <Highlighter
                              highlightClassName="YourHighlightClass"
                              searchWords={[searchTerm]}
                              autoEscape={true}
                              textToHighlight={idea.source}
                            />
                          </div>
                        </>
                      )}
                    </div>
                  )}
                  {idea.tags.length > 0 && (
                    <div className="ml-2 flex gap-1">
                      <FontAwesomeIcon icon={faHashtag} />
                      {idea.tags
                        .filter((tag, index) => index < 4)
                        .map((tag, index) => (
                          <button
                            key={index}
                            id="demo-positioned-button"
                            aria-controls={
                              open ? "demo-positioned-menu" : undefined
                            }
                            aria-haspopup="true"
                            aria-expanded={open ? "true" : undefined}
                            onClick={(e) =>
                              index === 3 && handleEllipsisClick(e, idea)
                            }
                            className="pr-1 pb-1 flex-shrink-0 flex-grow-0 rounded text-center"
                            sx={{
                              color: "inherit",
                            }}
                          >
                            <Highlighter
                              highlightClassName="YourHighlightClass"
                              searchWords={[searchTerm]}
                              autoEscape={true}
                              textToHighlight={
                                index === idea.tags.length - 1
                                  ? tag
                                  : index === 3
                                  ? `+ ${idea.tags.length - 3}`
                                  : `${tag},`
                              }
                            />
                          </button>
                        ))}
                    </div>
                  )}
                  <div className="w-full flex justify-between items-center">
                    <div className="flex">{idea.createdAt}</div>
                    <div className="flex">
                      <Highlighter
                        highlightClassName="YourHighlightClass"
                        searchWords={[searchTerm]}
                        autoEscape={true}
                        textToHighlight={idea.userName}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
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
    </>
  );
};

export default ShowingSearchIdeas;
