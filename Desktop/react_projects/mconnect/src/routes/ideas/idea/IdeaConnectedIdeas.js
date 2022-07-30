const IdeaConnectedIdeas = ({ userIdea, viewDetail, colorList }) => {
  return (
    <div
      className={`z-0 relative p-2 w-full bg-stone-50 shadow-inner duration-500 ${
        viewDetail === false && "hidden"
      }`}
    >
      <div className="z-0 absolute top-0 left-6 h-full border-r-4 border-stone-200"></div>
      {userIdea.connectedIdeas.map((idea, index) => (
        <div className="relative" key={index}>
          <div
            className={`w-5 h-5 border-2 border-stone-200 ${colorList[index]} rounded-full shadow-md absolute top-6 left-2`}
          ></div>
          <div className="z-10 relative box-border ml-10 my-4 p-2 bg-white shadow-md rounded-xl">
            <div className="font-black mb-2">{idea.title}</div>
            <div className="mb-1">{idea.text}</div>
            <div className="w-full text-xs flex justify-between text-stone-400">
              <div>{idea.createdAt}</div>
              <div>{idea.userName}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default IdeaConnectedIdeas;
