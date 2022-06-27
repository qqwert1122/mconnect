const CriteriaTag = ({
  tagList,
  searchTerm,
  listSearchCriteriaTag,
  onTagCriteriaClick,
}) => {
  return (
    <div className="px-4 pb-4 flex flex-nowrap overflow-x-scroll bg-white">
      {tagList
        .filter((tag) => tag.includes(searchTerm))
        .map((tag, index) => (
          <button
            key={index}
            className={`mr-1 mb-1 px-3 py-1 flex-grow-0 flex-shrink-0 border-box rounded-3xl border-2  break-words text-xs shadow-sm duration-500 ${
              listSearchCriteriaTag.includes(tag) && "bg-stone-300"
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
