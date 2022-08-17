import { colorsState } from "atom";
import { useRecoilValue } from "recoil";

const ColoredIdeaList = ({ ideas, small = false }) => {
  const colors = useRecoilValue(colorsState);

  return (
    <div className="opacity flex items-start justify-end gap-2 p-3 ">
      {ideas.map((idea, index) => (
        <div
          key={index}
          className={`${small === true ? "w-2 h-2" : "w-3 h-3"} rounded-full ${
            colors[index % colors.length]
          }`}
        ></div>
      ))}
    </div>
  );
};

export default ColoredIdeaList;
