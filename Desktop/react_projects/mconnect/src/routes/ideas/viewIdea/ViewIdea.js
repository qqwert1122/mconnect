import ViewIdeaTopBar from "./ViewIdeaTopBar";
import ViewIdeaContent from "./ViewIdeaContent";
import ViewIdeaBottom from "./ViewIdeaBottom";

const ViewIdea = ({ customHooks }) => {
  const dbIdeas = customHooks.dbIdeas;
  const userContext = customHooks.userContext;
  const setUserContext = customHooks.setUserContext;
  const colorList = customHooks.colorList;
  const setNavValue = customHooks.setNavValue;
  const getCategory = customHooks.getCategory;
  const viewIdea = customHooks.viewIdea;
  const setViewIdea = customHooks.setViewIdea;

  const selectedIdeas = customHooks.selectedIdeas;
  const setSelectedIdeas = customHooks.setSelectedIdeas;

  return (
    <div
      className="text-sm min-h-screen bg-stone-100"
      style={{ paddingBottom: "52px" }}
    >
      <div className="flex-col  bg-white shadow">
        <ViewIdeaTopBar
          viewIdea={viewIdea}
          userContext={userContext}
          setUserContext={setUserContext}
          setNavValue={setNavValue}
        />
        {/*제목, 아바타, 시간 */}
        <ViewIdeaContent viewIdea={viewIdea} />
      </div>
      <ViewIdeaBottom
        dbIdeas={dbIdeas}
        setNavValue={setNavValue}
        viewIdea={viewIdea}
        setViewIdea={setViewIdea}
        getCategory={getCategory}
        colorList={colorList}
        selectedIdeas={selectedIdeas}
        setSelectedIdeas={setSelectedIdeas}
      />
    </div>
  );
};

export default ViewIdea;
