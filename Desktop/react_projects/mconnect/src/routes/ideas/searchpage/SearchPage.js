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

const SearchPage = ({ ...props }) => {
  const { navValue, setNavValue, navigate, getIDsFromIdeas, onBackClick } =
    props;

  const searchClient = algoliasearch(
    process.env.REACT_APP_ALGOLIA_APP_ID,
    process.env.REACT_APP_ALGOLIA_API_KEY
  );
  const sessionStorageCache = createInfiniteHitsSessionStorageCache();

  console.log("search Page 전체가 rerender");

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
            <Configure filters={"isPublic:true"} />
            <InfiniteHits
              classNames={{
                root: "mt-16",
              }}
              hitComponent={({ hit }) => (
                <Hit hit={hit} getIDsFromIdeas={getIDsFromIdeas} />
              )}
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
