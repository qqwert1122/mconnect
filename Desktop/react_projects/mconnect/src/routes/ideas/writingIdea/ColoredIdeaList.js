const ColoredIdeaList = ({ ideas, colorList, small = false }) => {
  return (
    <div className="opacity flex justify-end gap-2 p-3 ">
      {ideas.map((idea, index) => (
        <div
          key={index}
          className={`${small === true ? "w-2 h-2" : "w-3 h-3"} rounded-full ${
            colorList[index % colorList.length]
          }`}
        ></div>
      ))}
    </div>
  );
};

export default ColoredIdeaList;
