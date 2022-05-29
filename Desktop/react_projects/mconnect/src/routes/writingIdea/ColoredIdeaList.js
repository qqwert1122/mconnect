const ColoredIdeaList = ({ formConnectedIdeas, colorList }) => {
  return (
    <div className="opacity flex justify-end gap-2 p-3 ">
      {formConnectedIdeas.map((idea, index) => (
        <div
          key={index}
          className={`w-3 h-3 rounded-full ${
            colorList[index % colorList.length]
          }`}
        ></div>
      ))}
    </div>
  );
};

export default ColoredIdeaList;
