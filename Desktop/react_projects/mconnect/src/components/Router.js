import Home from "routes/home/Home";
import Ideas from "routes/ideas/Ideas";
import SearchPage from "routes/ideas/searchpage/SearchPage";
import ViewIdea from "routes/ideas/viewIdea/ViewIdea";
import WritingIdea from "routes/ideas/writingIdea/WritingIdea";
import Storming from "routes/storming/Storming";
import Setting from "routes/setting/Setting";
import OpenSource from "routes/setting/OpenSource";
import Auth from "routes/auth/Auth";
import SignUp from "routes/auth/SignUp";
import { Route, Routes } from "react-router-dom";
import AlarmPage from "routes/ideas/alarm/AlarmPage";

const AppRouter = ({ ...props }) => {
  return (
    <Routes>
      {props.isLoggedIn ? (
        <>
          {/* <Route exact path="/home" element={<Home props={props} />} /> */}
          <Route exact path="/ideas" element={<Ideas {...props} />} />
          <Route exact path="/searchpage" element={<SearchPage {...props} />} />
          <Route
            exact
            path="/writingidea"
            element={<WritingIdea {...props} />}
          />
          <Route
            exact
            path={`/${props.whatView && props.whatView.id}`}
            element={<ViewIdea {...props} />}
          />
          <Route exact path="/alarm" element={<AlarmPage {...props} />} />
          <Route exact path="/storming" element={<Storming {...props} />} />
          <Route exact path="/setting" element={<Setting {...props} />} />
          <Route
            exact
            path="/setting/opensource"
            element={<OpenSource {...props} />}
          />
          <Route exact path="*" element={<Ideas {...props} />} />
        </>
      ) : (
        <>
          <Route exact path="/signup" element={<SignUp {...props} />} />
          <Route exact path="/" element={<Auth {...props} />} />
        </>
      )}
    </Routes>
  );
};

export default AppRouter;
