import "css/Animation.css";
import "instantsearch.css/themes/satellite.css";
import SearchPageTopBar from "./SearchPageTopBar";
import SearchCriteria from "./SearchCriteria";
import CriteriaSource from "./CriteriaSource";
import CriteriaTag from "./CriteriaTag";
import CriteriaUser from "./CriteriaUser";
import CriteriaAll from "./CriteriaAll";
import { useEffect, useState } from "react";
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  SearchBox,
  Hits,
  InfiniteHits,
  Highlight,
  RefinementList,
  Index,
  Configure,
} from "react-instantsearch-hooks-web";
import ShowingSearchIdeas from "./ShowingSearchIdeas";
import FloatingUpButton from "../FloatingUpButton";
import { Avatar } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faChevronLeft,
  faHashtag,
  faQuoteLeft,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";

const SearchPage = ({ ...props }) => {
  const { navigate } = customHooks;

  const userList = userIdeas.filter(
    (idea, index, callback) =>
      index === callback.findIndex((t) => t.userId === idea.userId)
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCriteria, setSelectedCriteria] = useState(0);
  const [listSearchCriteriaSource, setListSearchCriteriaSource] = useState([]);
  const [listSearchCriteriaTag, setListSearchCriteriaTag] = useState([]);
  const [listSearchCriteriaUser, setListSearchCriteriaUser] = useState([]);
  const [listAllCriteria, setListAllCriteria] = useState([]);
  const [showingSearchIdeas, setShowingSearchIdeas] = useState([]);

  const searchCriteria = ["전체", "출처", "태그", "유저"];

  // useEffect(() => {
  //   setShowingSearchIdeas(userIdeas);
  // }, []);

  // useEffect(() => {
  //   setTimeout(() => {
  //     window.scrollTo(0, scrollY);
  //   }, 100);
  // }, []);

  const onBackClick = () => {
    navigate(-1);
  };

  // useEffect(() => {
  //   if (listAllCriteria.length === 0) {
  //     setShowingSearchIdeas(userIdeas);
  //   } else {
  //     setShowingSearchIdeas(
  //       userIdeas.filter(
  //         (idea, index) =>
  //           listSearchCriteriaSource.some((x) =>
  //             userIdeas[index].source.includes(x)
  //           ) ||
  //           listSearchCriteriaTag.some((x) =>
  //             userIdeas[index].tags.includes(x)
  //           ) ||
  //           listSearchCriteriaUser.some((x) =>
  //             userIdeas[index].userName.includes(x)
  //           )
  //       )
  //     );
  //   }
  // }, [listSearchCriteriaSource, listSearchCriteriaTag, listSearchCriteriaUser]);

  const onSourceCriteriaClick = (source) => {
    if (listSearchCriteriaSource.includes(source)) {
      setListSearchCriteriaSource(
        listSearchCriteriaSource.filter((_source) => _source !== source)
      );
      setListAllCriteria(listAllCriteria.filter((all) => all !== source));
    } else {
      setListSearchCriteriaSource([...listSearchCriteriaSource, source]);
      setListAllCriteria([source, ...listAllCriteria]);
    }
  };

  const onTagCriteriaClick = (tag) => {
    if (listSearchCriteriaTag.includes(tag)) {
      setListSearchCriteriaTag(
        listSearchCriteriaTag.filter((_tag) => _tag !== tag)
      );
      setListAllCriteria(listAllCriteria.filter((all) => all !== tag));
    } else {
      setListSearchCriteriaTag([...listSearchCriteriaTag, tag]);
      setListAllCriteria([tag, ...listAllCriteria]);
    }
  };

  const onUserCriteriaClick = (user) => {
    if (listSearchCriteriaUser.includes(user)) {
      setListSearchCriteriaUser(
        listSearchCriteriaUser.filter((_user) => _user !== user)
      );
      setListAllCriteria(listAllCriteria.filter((all) => all !== user));
    } else {
      setListSearchCriteriaUser([...listSearchCriteriaUser, user]);
      setListAllCriteria([user, ...listAllCriteria]);
    }
  };

  const onXmarkClick = (all) => {
    if (listSearchCriteriaSource.includes(all)) {
      onSourceCriteriaClick(all);
    } else if (listSearchCriteriaTag.includes(all)) {
      onTagCriteriaClick(all);
    } else {
      onUserCriteriaClick(all);
    }
  };

  const searchClient = algoliasearch(
    process.env.REACT_APP_ALGOLIA_APP_ID,
    process.env.REACT_APP_ALGOLIA_API_KEY
  );

  const onBookmarkClick = (hit) => {
    console.log(hit.objectID);
  };

  const Hit = ({ hit }) => {
    return (
      <div key={hit.objectID} className="w-full break-all overflow-hidden">
        {hit.title.length > 0 && (
          <div className="mb-2 font-black text-base">
            <Highlight className="truncate" attribute="title" hit={hit} />
          </div>
        )}
        <div className="w-full mb-4">
          <Highlight
            attribute="text"
            hit={hit}
            classNames={{
              root: "line-clamp-5",
              highlighted: "font-black",
            }}
          />
        </div>
        <div className="mb-4 text-xs">
          {hit.source.length > 0 && (
            <div className="flex items-center gap-2 pl-2 text-stone-400 truncate">
              <FontAwesomeIcon icon={faQuoteLeft} />
              <Highlight attribute="source" hit={hit} />
            </div>
          )}
          {hit.tags.length > 0 && (
            <div className="flex items-center gap-2 pl-2 text-stone-400 truncate">
              <FontAwesomeIcon icon={faHashtag} />
              <Highlight attribute="tags" hit={hit} />
            </div>
          )}
        </div>
        <div className="flex justify-between items-center ">
          <span className="flex gap-2 items-center text-xs">
            <Avatar
              className="border-2"
              alt="avatar"
              src={hit.userPhotoURL}
              sx={{
                display: "flex",
                width: "25px",
                height: "25px",
              }}
            />
            <div className="flex-col">
              <span className="flex">
                <Highlight attribute="userName" hit={hit} />
              </span>
              <span className="flex">{hit.createdAt}</span>
            </div>
          </span>
          <button
            className="text-orange-400"
            onClick={() => {
              onBookmarkClick(hit);
            }}
          >
            <FontAwesomeIcon icon={faBookmark} size="xl" />
          </button>
        </div>
      </div>
    );
  };

  const myIdea = true;

  return (
    <div className="min-h-screen flex-col">
      <div className="relative">
        {/* <InstantSearch searchClient={searchClient} indexName="userIdeas">
          <div className="fixed top-0 w-full p-3 flex gap-4 justify-between items-center bg-white shadow z-10">
            <button onClick={onBackClick}>
              <FontAwesomeIcon icon={faChevronLeft} size="lg" />
            </button>
            <SearchBox
              className="w-full"
              placeholder="검색어를 입력하세요..."
              searchAsYouType={false}
            />
          </div>
          <div className="mt-14">
            <Configure
              filters={
                myIdea ? `userId:${loggedInUser.userId}` : "isPublic:true"
              }
            />
            <InfiniteHits hitComponent={Hit} showPrevious={false} />
          </div>
        </InstantSearch> */}

        {/* <SearchPageTopBar
          navigate={navigate}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <div className="shadow">
          <SearchCriteria
            searchCriteria={searchCriteria}
            selectedCriteria={selectedCriteria}
            setSelectedCriteria={setSelectedCriteria}
            setListSearchCriteriaSource={setListSearchCriteriaSource}
            setListSearchCriteriaTag={setListSearchCriteriaTag}
            setListSearchCriteriaUser={setListSearchCriteriaUser}
            setListAllCriteria={setListAllCriteria}
          />

          {selectedCriteria === 1 && (
            <CriteriaSource
              sourceList={sourceList}
              searchTerm={searchTerm}
              listSearchCriteriaSource={listSearchCriteriaSource}
              onSourceCriteriaClick={onSourceCriteriaClick}
            />
          )}

          {selectedCriteria === 2 && (
            <CriteriaTag
              tagList={tagList}
              searchTerm={searchTerm}
              listSearchCriteriaTag={listSearchCriteriaTag}
              onTagCriteriaClick={onTagCriteriaClick}
            />
          )}

          {selectedCriteria === 3 && (
            <CriteriaUser
              userList={userList}
              searchTerm={searchTerm}
              listSearchCriteriaUser={listSearchCriteriaUser}
              onUserCriteriaClick={onUserCriteriaClick}
            />
          )}

          {listAllCriteria.length > 0 && (
            <CriteriaAll
              listAllCriteria={listAllCriteria}
              onXmarkClick={onXmarkClick}
            />
          )}
        </div>
        <ShowingSearchIdeas
          navigate={navigate}
          setWhatView={setWhatView}
          showingSearchIdeas={showingSearchIdeas}
          searchTerm={searchTerm}
          selectedIdeas={selectedIdeas}
          setSelectedIdeas={setSelectedIdeas}
          listAllCriteria={listAllCriteria}
        /> */}
      </div>

      <div
        className={` ${
          selectedIdeas.length > 0 ? "bottom-0" : "-bottom-16"
        } w-full p-4 fixed  shadow-inner bg-red-400 text-white font-black text-center text-base duration-100`}
      >
        {selectedIdeas.length}개 선택됨
      </div>
    </div>
  );
};

export default SearchPage;
