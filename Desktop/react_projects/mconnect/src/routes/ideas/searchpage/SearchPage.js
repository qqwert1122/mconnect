import "instantsearch.css/themes/satellite.css";
import Hit from "./Hit";
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  SearchBox,
  InfiniteHits,
  Configure,
} from "react-instantsearch-hooks-web";
import { createInfiniteHitsSessionStorageCache } from "instantsearch.js/es/lib/infiniteHitsCache";

import BottomNavigationBar from "routes/BottomNavigationBar";
import { useRecoilValue } from "recoil";
import { userState } from "atom";

const SearchPage = ({ ...props }) => {
  const { navValue, setNavValue, getIDsFromIdeas, viewIdea } = props;
  const loggedInUser = useRecoilValue(userState);

  const searchClient = algoliasearch(
    process.env.REACT_APP_ALGOLIA_APP_ID,
    process.env.REACT_APP_ALGOLIA_SEARCH_API_KEY
  );

  const sessionStorageCache = createInfiniteHitsSessionStorageCache();

  return (
    <div className="min-h-screen flex-col">
      <BottomNavigationBar navValue={navValue} setNavValue={setNavValue} />
      <div className="relative">
        <InstantSearch searchClient={searchClient} indexName="userIdeas">
          <div>
            <SearchBox
              className="fixed top-0 w-full p-3 bg-white shadow z-10"
              placeholder="검색어를 입력하세요..."
              searchAsYouType={false}
            />
          </div>
          <div className="mt-14">
            <Configure
              filters={`isPublic:true OR userId:${loggedInUser.userId}`}
            />
            <InfiniteHits
              classNames={{
                root: "mt-18",
              }}
              hitComponent={({ hit }) => <Hit hit={hit} viewIdea={viewIdea} />}
              cache={sessionStorageCache}
              showPrevious={false}
            />
          </div>
        </InstantSearch>
      </div>
    </div>
  );
};

export default SearchPage;
