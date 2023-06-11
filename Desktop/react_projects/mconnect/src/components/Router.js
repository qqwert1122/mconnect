import "css/Animation.css";
import Ideas from "routes/ideas/Ideas";
import SearchPage from "routes/ideas/searchpage/SearchPage";
import ViewIdea from "routes/ideas/viewIdea/ViewIdea";
import WritingIdea from "routes/ideas/writingIdea/WritingIdea";
import Error from "routes/Error";
import Storming from "routes/storming/Storming";
import Setting from "routes/setting/Setting";
import OpenSource from "routes/setting/OpenSource";
import Auth from "routes/auth/Auth";
import SignUp from "routes/auth/SignUp";
import AlarmPage from "routes/ideas/alarm/AlarmPage";
import Eval from "routes/setting/Eval";
import DeveloperApp from "routes/setting/DeveloperApp";
import Offer from "routes/setting/offer/Offer";
import OfferChat from "routes/setting/offer/OfferChat";
import { Route, Routes } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { pagesState } from "atom";
import Tutorial from "routes/auth/Tutorial";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import CreateNewAccount from "routes/auth/CreateNewAccount";

const AppRouter = ({ ...props }) => {
  return (
    <>
      <Routes>
        {props.isLoggedIn ? (
          <>
            <Route path="/contents" element={<Ideas {...props} />} />
            <Route
              path={`/contents/:docId`}
              element={<ViewIdea {...props} />}
            />

            <Route path="/searchpage" element={<SearchPage {...props} />} />
            <Route path="/writingidea" element={<WritingIdea {...props} />} />

            <Route path="/alarm" element={<AlarmPage {...props} />} />
            <Route path="/storming" element={<Storming {...props} />} />
            <Route path="/setting">
              <Route path="" element={<Setting {...props} />} />
              <Route path="offer" element={<Offer {...props} />} />
              <Route
                path="offer/offerChat"
                element={<OfferChat {...props} />}
              />
              <Route path="eval" element={<Eval {...props} />} />
              <Route
                path="developerApp"
                element={<DeveloperApp {...props} />}
              />
              <Route path="opensource" element={<OpenSource {...props} />} />
            </Route>
            <Route path="/error" element={<Error {...props} />} />
            <Route path="/tutorial" element={<Tutorial {...props} />} />
            <Route path="*" element={<Ideas {...props} />} />
          </>
        ) : (
          <>
            <Route exact path="/auth" element={<Auth {...props} />} />
            <Route exact path="/signup" element={<SignUp {...props} />} />
            <Route
              exact
              path="/createnewaccount"
              element={<CreateNewAccount {...props} />}
            />
          </>
        )}
      </Routes>
    </>
  );
};

export default AppRouter;
