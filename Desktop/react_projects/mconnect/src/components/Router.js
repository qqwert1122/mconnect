import Ideas from "routes/ideas/Ideas";
import SearchPage from "routes/ideas/searchpage/SearchPage";
import ViewIdea from "routes/ideas/viewIdea/ViewIdea";
import WritingIdea from "routes/ideas/writingIdea/WritingIdea";
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
import { useRecoilValue } from "recoil";
import { whatViewState } from "atom";
import Tutorial from "routes/auth/Tutorial";

const AppRouter = ({ ...props }) => {
  const whatView = useRecoilValue(whatViewState);

  return (
    <Routes>
      {props.isLoggedIn ? (
        <>
          <Route exact path="/ideas" element={<Ideas {...props} />} />
          <Route exact path="/searchpage" element={<SearchPage {...props} />} />
          <Route
            exact
            path="/writingidea"
            element={<WritingIdea {...props} />}
          />
          <Route
            exact
            path={`/${whatView && whatView.docId}`}
            element={<ViewIdea {...props} />}
          />
          <Route exact path="/alarm" element={<AlarmPage {...props} />} />
          <Route exact path="/storming" element={<Storming {...props} />} />
          <Route exact path="/setting" element={<Setting {...props} />} />
          <Route exact path="/setting/offer" element={<Offer {...props} />} />
          <Route
            exact
            path="/setting/offer/offerChat"
            element={<OfferChat {...props} />}
          />
          <Route exact path="/setting/eval" element={<Eval {...props} />} />
          <Route
            exact
            path="/setting/developerApp"
            element={<DeveloperApp {...props} />}
          />
          <Route
            exact
            path="/setting/opensource"
            element={<OpenSource {...props} />}
          />
          <Route exact path="/tutorial" element={<Tutorial {...props} />} />
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
