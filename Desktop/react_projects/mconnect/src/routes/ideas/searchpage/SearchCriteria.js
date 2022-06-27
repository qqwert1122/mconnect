const SearchCriteria = ({
  searchCriteria,
  selectedCriteria,
  setSelectedCriteria,
  setListSearchCriteriaSource,
  setListSearchCriteriaTag,
  setListSearchCriteriaUser,
  setListAllCriteria,
}) => {
  const onCriteriaClick = (index) => {
    setSelectedCriteria(index);
    if (index === 0) {
      setListSearchCriteriaSource([]);
      setListSearchCriteriaTag([]);
      setListSearchCriteriaUser([]);
      setListAllCriteria([]);
    }
  };
  return (
    <div className="px-5 pt-20 pb-5 flex gap-4 text-base bg-white ">
      {searchCriteria.map((criteria, index) => (
        <button
          key={index}
          className={`${
            index === selectedCriteria ? "underline" : "text-stone-400"
          } font-black duration-100`}
          onClick={() => onCriteriaClick(index)}
        >
          {criteria}
        </button>
      ))}
    </div>
  );
};

export default SearchCriteria;
