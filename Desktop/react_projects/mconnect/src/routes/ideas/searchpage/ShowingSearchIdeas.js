import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/free-regular-svg-icons";

const ShowingSearchIdeas = ({
  setNavValue,
  setViewIdea,
  setUserContext,
  showingSearchIdeas,
  searchTerm,
  selectedIdeas,
  setSelectedIdeas,
}) => {
  const [isTagsDialogOpen, setIsTagsDialogOpen] = useState(false);
  const [DialogTags, setDialogTags] = useState([]);

  const onViewIdeaClick = (idea) => {
    setUserContext(3);
    setViewIdea(idea);
    setNavValue("/ideas/viewidea");
  };

  const onTagsDialogClick = (idea) => {
    setIsTagsDialogOpen((prev) => !prev);
    setDialogTags(idea.tags);
  };

  const onIdeaClick = (idea) => {
    if (selectedIdeas.includes(idea)) {
      setSelectedIdeas(selectedIdeas.filter((_idea) => _idea !== idea));
    } else {
      setSelectedIdeas([...selectedIdeas, idea]);
    }
  };

  return (
    <>
      {showingSearchIdeas
        .filter(
          (idea) =>
            idea.title.includes(searchTerm) || idea.text.includes(searchTerm)
        )
        .map((idea) => (
          <div key={idea.id}>
            <div className="m-2 text-sm">
              <div className="py-2 flex-col">
                <div className="font-black pb-1">{idea.title}</div>
                <div className="py-1" onClick={() => onViewIdeaClick(idea)}>
                  {idea.text.length > 200 ? (
                    <>
                      {idea.text.substr(0, 200)}
                      ...
                    </>
                  ) : (
                    idea.text
                  )}
                </div>
                <div className="flex items-start">
                  <div className="w-11/12 flex flex-wrap items-center gap-2 text-xs text-stone-400">
                    <span>{idea.userName}</span>
                    {idea.source && (
                      <>
                        |<span>{idea.source}</span>
                      </>
                    )}
                    {idea.tags.length > 0 && "|"}
                    {idea.tags
                      .filter((tag, index) => index < 3)
                      .map((tag, index) => (
                        <button
                          key={index}
                          className="px-1 flex-shrink-0 flex-grow-0 bg-stone-200 rounded text-center"
                          style={{ minWidth: "28px" }}
                          onClick={() => {
                            index === 2 && onTagsDialogClick(idea);
                          }}
                        >
                          {index === 2 ? `+ ${idea.tags.length - 2}` : tag}
                        </button>
                      ))}
                  </div>
                  <div className="w-1/12 flex items-center">
                    <button
                      className={`box-border opacity rounded-full ${
                        selectedIdeas.includes(idea)
                          ? "bg-red-400 text-white"
                          : "border-2 border-stone-400"
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
                </div>
              </div>
            </div>
            <hr />
          </div>
        ))}
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
    </>
  );
};

export default ShowingSearchIdeas;
