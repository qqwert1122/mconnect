import { Route, Routes } from "react-router-dom";
import Home from "routes/Home";
import Ideas from "routes/Ideas";
import Storming from "routes/Storming";
import Explore from "routes/Explore";
import Setting from "routes/Setting";
import Auth from "routes/Auth";
import BottomNavigationBar from "routes/BottomNavigationBar";

const AppRouter = ({ customHooks }) => {
  return (
    <>
      {customHooks.isLoggedIn && (
        <BottomNavigationBar customHooks={customHooks} />
      )}
      <Routes>
        {customHooks.isLoggedIn ? (
          <>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/ideas" element={<Ideas />} />
            <Route exact path="/storming" element={<Storming />} />
            <Route exact path="/explore" element={<Explore />} />
            <Route exact path="/setting" element={<Setting />} />
            <Route exact path="*" element={<Home />} />
          </>
        ) : (
          <Route exact path="/">
            <Route exact path="/" element={<Auth />} />
          </Route>
        )}
      </Routes>
    </>
  );
};

export default AppRouter;
