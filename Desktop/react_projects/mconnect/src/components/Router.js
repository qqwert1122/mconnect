import { Route, Routes } from "react-router-dom";
import Home from "routes/home/Home";
import Ideas from "routes/ideas/Ideas";
import SearchPage from "routes/ideas/searchpage/SearchPage";
import ViewIdea from "routes/ideas/viewIdea/ViewIdea";
import WritingIdea from "routes/ideas/writingIdea/WritingIdea";
import Storming from "routes/Storming";
import Setting from "routes/Setting";
import Auth from "routes/Auth";

const AppRouter = ({ customHooks }) => {
  return (
    <Routes>
      {customHooks.isLoggedIn ? (
        <>
          <Route
            exact
            path="/home"
            element={<Home customHooks={customHooks} />}
          />
          <Route
            exact
            path="/ideas"
            element={<Ideas customHooks={customHooks} />}
          />
          <Route
            exact
            path="/ideas/searchpage"
            element={<SearchPage customHooks={customHooks} />}
          />
          <Route
            exact
            path="/writingidea"
            element={<WritingIdea customHooks={customHooks} />}
          />
          <Route
            exact
            path="/ideas/viewidea"
            element={<ViewIdea customHooks={customHooks} />}
          />
          <Route
            exact
            path="/storming"
            element={<Storming customHooks={customHooks} />}
          />
          <Route
            exact
            path="/setting"
            element={<Setting customHooks={customHooks} />}
          />
          <Route exact path="*" element={<Ideas customHooks={customHooks} />} />
        </>
      ) : (
        <Route exact path="/" element={<Auth customHooks={customHooks} />} />
      )}
    </Routes>
  );
};

export default AppRouter;
