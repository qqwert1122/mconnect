const CriteriaSource = ({
  sourceList,
  searchTerm,
  listSearchCriteriaSource,
  onSourceCriteriaClick,
}) => {
  return (
    <div className="px-4 pb-4 flex flex-nowrap overflow-x-scroll bg-white">
      {sourceList
        .filter((source) => source.includes(searchTerm))
        .map((source, index) => (
          <button
            key={index}
            className={`mr-1 mb-1 px-3 py-1 flex-grow-0 flex-shrink-0 border-box rounded-3xl border-2  break-words text-xs shadow-sm duration-500 ${
              listSearchCriteriaSource.includes(source) && "bg-stone-300"
            }`}
            style={{ flexBasis: "auto" }}
            onClick={() => onSourceCriteriaClick(source)}
          >
            {source}
          </button>
        ))}
    </div>
  );
};

export default CriteriaSource;
