import { useEffect } from "react";

const ToggleButton = ({
  selectedIdeas,
  isConnectToggleClicked,
  categories,
  categoryPrmtr,
  setCategoryPrmtr,
  filters,
  filterPrmtr,
  setFilterPrmtr,
  showingIdeas,
  setShowingIdeas,
  dbIdeas,
}) => {
  useEffect(() => {
    if (categoryPrmtr === "") {
      setFilterPrmtr("");
      setShowingIdeas(dbIdeas);
    } else {
      setFilterPrmtr("");
      setShowingIdeas(
        dbIdeas.filter((idea) => idea.category === categoryPrmtr.value)
      );
    }
  }, [categoryPrmtr, dbIdeas]);
  useEffect(() => {
    if (categoryPrmtr === "") {
      if (filterPrmtr === "") {
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
      if (filterPrmtr === "") {
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
      setCategoryPrmtr("");
    } else {
      setCategoryPrmtr(item);
    }
  };
  const onFilterPrmtrClick = (item) => {
    if (filterPrmtr === item) {
      setFilterPrmtr("");
    } else {
      setFilterPrmtr(item);
    }
  };

  return (
    <div className="bg-white px-5 pb-10 mb-2 ">
      <div
        className="font-black text-xl duration-100 pb-5"
        style={{
          paddingTop: `${
            selectedIdeas.length > 0
              ? isConnectToggleClicked
                ? "440px"
                : "160px"
              : "80px"
          }`,
        }}
      >
        카테고리
      </div>
      <div className="flex flex-wrap justify-start gap-3">
        {categories.map((item, index) => (
          <button
            key={index}
            className={`border-box rounded-3xl ${
              item.value === categoryPrmtr.value ? item.bgColor : ""
            } ${item.color} ${
              item.borderColor
            } border-2 px-4 py-1 text-sm font-black shadow-md duration-500`}
            onClick={() => {
              onCategoryPrmtrClick(item);
            }}
          >
            <span className="text-base">{item.icon}</span>
            &nbsp;{item.label}
          </button>
        ))}
        {filters.map((item, index) => (
          <button
            key={index}
            className={`border-box rounded-3xl ${
              item.value === filterPrmtr.value ? item.bgColor : ""
            } ${item.color} ${
              item.borderColor
            } border-2 px-4 py-1 text-base font-black shadow-md duration-500`}
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

export default ToggleButton;
