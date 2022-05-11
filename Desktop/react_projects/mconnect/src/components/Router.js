import { Route, Routes } from "react-router-dom";
import Home from "routes/home/Home";
import Ideas from "routes/ideas/Ideas";
import SearchPage from "routes/ideas/SearchPage";
import ViewIdea from "routes/ideas/ViewIdea";
import Writing from "routes/ideas/Writing";
import Storming from "routes/Storming";
import Explore from "routes/Explore";
import Setting from "routes/Setting";
import Auth from "routes/Auth";
import BottomNavigationBar from "routes/BottomNavigationBar";

const AppRouter = ({ customHooks }) => {
  return (
    <>
      {/* {customHooks.isLoggedIn && (
        <BottomNavigationBar customHooks={customHooks} />
      )} */}
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
              path="/ideas/writing"
              element={<Writing customHooks={customHooks} />}
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
              path="/explore"
              element={<Explore customHooks={customHooks} />}
            />
            <Route
              exact
              path="/setting"
              element={<Setting customHooks={customHooks} />}
            />
            <Route
              exact
              path="*"
              element={<Ideas customHooks={customHooks} />}
            />
          </>
        ) : (
          <Route exact path="/" element={<Auth customHooks={customHooks} />} />
        )}
      </Routes>
    </>
  );
};

export default AppRouter;
