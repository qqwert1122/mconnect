import "css/App.css";

const StormingTagBar = ({ loadNewIdea, trends, itemPrmtr, setItemPrmtr }) => {
  const _trends = ["전체", ...trends];

  // tags toggle
  const onItemClick = (tag) => {
    if (tag === itemPrmtr || tag === "전체") {
      setItemPrmtr();
      loadNewIdea();
    } else {
      setItemPrmtr(tag);
      loadNewIdea(tag);
    }
  };

  return (
    <div className="relative mt-5">
      <div className="flex items-end flex-nowrap gap-4 overflow-x-scroll">
        {_trends.map((tag, index) => (
          <button
            key={index}
            className={`${
              tag === itemPrmtr || (itemPrmtr === undefined && index === 0)
                ? "highlight text-stone-600"
                : "text-stone-300"
            } flex-grow-0 flex-shrink-0 border-box text-sm duration-500 break-words font-black
            ${index === 0 && "ml-10"} ${
              index === _trends.length - 1 && "mr-10"
            }`}
            onClick={() => onItemClick(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StormingTagBar;
