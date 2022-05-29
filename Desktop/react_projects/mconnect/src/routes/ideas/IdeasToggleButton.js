import { useEffect } from "react";

const IdeasToggleButton = ({
  dbIdeas,
  setShowingIdeas,
  categories,
  categoryPrmtr,
  setCategoryPrmtr,
  filters,
  filterPrmtr,
  setFilterPrmtr,
  isSelectMode,
}) => {
  useEffect(() => {
    if (categoryPrmtr === null) {
      setFilterPrmtr(null);
      setShowingIdeas(dbIdeas);
    } else {
      setFilterPrmtr(null);
      setShowingIdeas(
        dbIdeas.filter((idea) => idea.category === categoryPrmtr.value)
      );
    }
  }, [categoryPrmtr, dbIdeas]);

  useEffect(() => {
    if (categoryPrmtr === null) {
      if (filterPrmtr === null) {
        setShowingIdeas(dbIdeas);
        return;
      } else {
        switch (filterPrmtr.value) {
          case "like":
            setShowingIdeas(dbIdeas.filter((idea) => idea.like === true));
            break;
          case "bookmark":
            setShowingIdeas(dbIdeas.filter((idea) => idea.bookmark === true));
            break;
          case "public":
            setShowingIdeas(dbIdeas.filter((idea) => idea.public === true));
            break;
        }
        return;
      }
    } else {
      if (filterPrmtr === null) {
        setShowingIdeas(
          dbIdeas.filter((idea) => idea.category === categoryPrmtr.value)
        );
        return;
      } else {
        switch (filterPrmtr.value) {
          case "like":
            setShowingIdeas(
              dbIdeas
                .filter((idea) => idea.category === categoryPrmtr.value)
                .filter((idea) => idea.like === true)
            );
            break;
          case "bookmark":
            setShowingIdeas(
              dbIdeas
                .filter((idea) => idea.category === categoryPrmtr.value)
                .filter((idea) => idea.bookmark === true)
            );
            break;
          case "public":
            setShowingIdeas(
              dbIdeas
                .filter((idea) => idea.category === categoryPrmtr.value)
                .filter((idea) => idea.public === true)
            );
            break;
        }
        return;
      }
    }
  }, [filterPrmtr, dbIdeas]);

  const onCategoryPrmtrClick = (item) => {
    if (categoryPrmtr === item) {
      setCategoryPrmtr(null);
    } else {
      setCategoryPrmtr(item);
    }
  };

  const onFilterPrmtrClick = (item) => {
    if (filterPrmtr === item) {
      setFilterPrmtr(null);
    } else {
      setFilterPrmtr(item);
    }
  };

  return (
    <div className="bg-white px-5 pb-10 mb-2 ">
      <div
        className={`font-black duration-100 pb-5 ${
          isSelectMode ? "pt-44" : "pt-24"
        }`}
      >
        카테고리
      </div>
      <div className="flex flex-wrap justify-start gap-2">
        {categories.map((item, index) => (
          <button
            key={index}
            className={`border-box rounded-3xl ${
              item === categoryPrmtr && item.bgColor
            } ${item.color} ${
              item.borderColor
            } border-2 px-3 py-1 text-sm font-black shadow-md duration-500`}
            onClick={() => {
              onCategoryPrmtrClick(item);
            }}
          >
            <span className="text-sm">{item.icon}</span>
            &nbsp;{item.label}
          </button>
        ))}
        {filters.map((item, index) => (
          <button
            key={index}
            className={`border-box rounded-3xl ${
              item === filterPrmtr && item.bgColor
            } ${item.color} ${
              item.borderColor
            } border-2 px-3 py-1 text-sm font-black shadow-md duration-500`}
            onClick={() => {
              onFilterPrmtrClick(item);
            }}
          >
            <span className="text-base">{item.icon}</span>
            &nbsp;{item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default IdeasToggleButton;
