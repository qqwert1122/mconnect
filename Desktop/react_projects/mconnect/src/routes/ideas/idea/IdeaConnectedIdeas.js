const IdeaConnectedIdeas = ({ dbIdea, viewDetail }) => {
  return (
    <div
      className={`relative p-2 w-full bg-stone-50 shadow-inner duration-500 ${
        viewDetail === false && "hidden"
      }`}
    >
      {dbIdea.connectedIdeas.map((idea, index) => (
        <div
          key={index}
          className="box-border ml-10 my-4 p-2 bg-white shadow rounded-xl"
        >
          <div className="font-black mb-2">{idea.title}</div>
          <div className="mb-1">{idea.text}</div>
          <div className="w-full text-xs flex justify-between text-stone-400">
            <div>{idea.createdAt}</div>
            <div>{idea.userName}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default IdeaConnectedIdeas;
