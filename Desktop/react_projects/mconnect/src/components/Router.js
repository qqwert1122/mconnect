import Ideas from "routes/ideas/Ideas";
import SearchPage from "routes/ideas/searchpage/SearchPage";
import ViewIdea from "routes/ideas/viewIdea/ViewIdea";
import WritingIdea from "routes/ideas/writingIdea/WritingIdea";
import New from "routes/ideas/New";
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
import { whatViewState, pagesState } from "atom";
import Tutorial from "routes/auth/Tutorial";

const AppRouter = ({ ...props }) => {
  const whatView = useRecoilValue(whatViewState);
  const pages = useRecoilValue(pagesState);
  let location = useLocation();

  return (
    <Routes>
      {props.isLoggedIn ? (
        <>
          <Route path="/contents" element={<Ideas {...props} />} />
          <Route path={`/contents/:docId`} element={<ViewIdea {...props} />} />

          <Route path="/searchpage" element={<SearchPage {...props} />} />
          <Route path="/writingidea" element={<WritingIdea {...props} />} />

          <Route path="/alarm" element={<AlarmPage {...props} />} />
          <Route path="/storming" element={<Storming {...props} />} />
          <Route path="/setting">
            <Route path="" element={<Setting {...props} />} />
            <Route path="offer" element={<Offer {...props} />} />
            <Route path="offer/offerChat" element={<OfferChat {...props} />} />
            <Route path="eval" element={<Eval {...props} />} />
            <Route path="developerApp" element={<DeveloperApp {...props} />} />
            <Route path="opensource" element={<OpenSource {...props} />} />
          </Route>

          <Route path="/tutorial" element={<Tutorial {...props} />} />
          <Route path={`/new`} element={<New {...props} />} />
          <Route path="*" element={<Ideas {...props} />} />
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
