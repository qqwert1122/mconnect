const CriteriaTag = ({
  tagList,
  searchTerm,
  listSearchCriteriaTag,
  onTagCriteriaClick,
}) => {
  return (
    <div className="mx-4 mb-2 flex flex-nowrap overflow-x-scroll">
      {tagList
        .filter((tag) => tag.includes(searchTerm))
        .map((tag, index) => (
          <button
            key={index}
            className={`mr-1 mb-1 px-3 py-1 flex-grow-0 flex-shrink-0 border-box rounded-3xl border-2  break-words text-xs shadow-sm duration-500 ${
              listSearchCriteriaTag.includes(tag) && "bg-green-400 text-white"
            }`}
            style={{ flexBasis: "auto" }}
            onClick={() => onTagCriteriaClick(tag)}
          >
            {tag}
          </button>
        ))}
    </div>
  );
};

export default CriteriaTag;
