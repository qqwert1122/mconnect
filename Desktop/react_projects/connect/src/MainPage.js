import CategoryBar from "./CategoryBar";
import TagBar from "./TagBar";
import Main from "./Main";
import SideBar from "./SideBar";

const MainPage = ({ customHooks }) => {
  return (
    <div class="flex justify-center">
      <CategoryBar customHooks={customHooks} />
      <TagBar customHooks={customHooks} />
      <Main customHooks={customHooks} />
      <SideBar customHooks={customHooks} />
    </div>
  );
};

export default MainPage;
