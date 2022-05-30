import { useCallback } from "react";
import { useLongPress } from "use-long-press";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/free-regular-svg-icons";

const IdeaMiddle = ({ dbIdea, onViewIdeaClick, onSelectIdea, getCategory }) => {
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
      className="box-border mx-4 mt-4 mb-4 duration-200"
      onClick={() => {
        onViewIdeaClick(dbIdea);
      }}
      {...bind()}
    >
      {/* title */}
      {dbIdea.title !== "" && (
        <div className="flex items-center pb-2 w-full font-black">
          {dbIdea.title}
        </div>
      )}
      {/* text */}
      <div className="w-full pb-5 flex items-center break-all whitespace-pre-line">
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
        <span className="border-box rounded-3xl border-2 mr-1 mb-1 px-3 py-1 shadow-sm duration-500">
          {getCategory(dbIdea).icon}&nbsp;{getCategory(dbIdea).label}
        </span>
        {dbIdea.tags.length > 4 ? (
          <>
            {dbIdea.tags
              .filter((tag, index) => index < 4)
              .map((tag, index) => (
                <span
                  key={index}
                  className="mr-1 mb-1 border-box rounded-3xl border-2 px-3 py-1 shadow-sm duration-500"
                >
                  {tag}
                </span>
              ))}
            <span className="mr-1 mb-1 border-box rounded-3xl border-2 px-3 py-1 shadow-sm duration-500">
              ...
            </span>
          </>
        ) : (
          <>
            {dbIdea.tags.map((tag, index) => (
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
    </div>
  );
};

export default IdeaMiddle;
