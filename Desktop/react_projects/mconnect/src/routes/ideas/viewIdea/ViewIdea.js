import "css/Animation.css";
import ViewIdeaTopBar from "./ViewIdeaTopBar";
import ViewIdeaContent from "./ViewIdeaContent";
import ViewIdeaBottom from "./ViewIdeaBottom";
import { useNavigate } from "react-router-dom";

const ViewIdea = ({ customHooks }) => {
  const dbIdeas = customHooks.dbIdeas;
  const user = customHooks.loggedInUser;
  const navigate = customHooks.navigate;
  const userContext = customHooks.userContext;
  const setUserContext = customHooks.setUserContext;
  const colorList = customHooks.colorList;
  const viewIdea = customHooks.viewIdea;
  const setViewIdea = customHooks.setViewIdea;

  const selectedIdeas = customHooks.selectedIdeas;
  const setSelectedIdeas = customHooks.setSelectedIdeas;

  const onBackClick = () => {
    // setViewIdea(null);
    navigate(-1);
  };

  return (
    <div
      className=" text-sm min-h-screen bg-stone-100"
      style={{ paddingBottom: "52px" }}
    >
      <div className="moveRightToLeft flex-col bg-white shadow">
        <ViewIdeaTopBar
          viewIdea={viewIdea}
          setViewIdea={setViewIdea}
          userContext={userContext}
          setUserContext={setUserContext}
          navigate={navigate}
          onBackClick={onBackClick}
        />
        {/*제목, 아바타, 시간 */}
        <ViewIdeaContent viewIdea={viewIdea} user={user} />
      </div>
      <ViewIdeaBottom
        dbIdeas={dbIdeas}
        navigate={navigate}
        viewIdea={viewIdea}
        onBackClick={onBackClick}
        setViewIdea={setViewIdea}
        colorList={colorList}
        selectedIdeas={selectedIdeas}
        setSelectedIdeas={setSelectedIdeas}
      />
    </div>
  );
};

export default ViewIdea;
