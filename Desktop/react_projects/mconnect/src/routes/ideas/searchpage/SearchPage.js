import "css/Animation.css";
import "instantsearch.css/themes/satellite.css";
// import "instantsearch.css/themes/reset.css";
import { useEffect, useState } from "react";
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  SearchBox,
  InfiniteHits,
  Highlight,
  Configure,
  RefinementList,
} from "react-instantsearch-hooks-web";
import { createInfiniteHitsSessionStorageCache } from "instantsearch.js/es/lib/infiniteHitsCache";
import ShowingSearchIdeas from "./ShowingSearchIdeas";
import FloatingUpButton from "../FloatingUpButton";
import { toast } from "react-toastify";
import { Avatar } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faCheck,
  faChevronLeft,
  faHashtag,
  faPlusCircle,
  faQuoteLeft,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useRecoilState, useRecoilValue } from "recoil";
import { selectedIdeasState } from "atom";
import { userState } from "atom";

const SearchPage = ({ ...props }) => {
  const { navigate, getIDsFromIdeas } = props;
  const loggedInUser = useRecoilValue(userState);
  const [selectedIdeas, setSelectedIdeas] = useRecoilState(selectedIdeasState);

  const onBackClick = () => {
    navigate(-1);
  };

  const onIdeaSelect = (hit) => {
    const newHit = {
      id: hit.objectID,
      ...hit,
    };
    if (getIDsFromIdeas(selectedIdeas).includes(newHit.id)) {
      setSelectedIdeas(selectedIdeas.filter((_idea) => _idea.id != newHit.id));
    } else {
      if (selectedIdeas.length > 4) {
        toast.error("최대 5개까지 연결 가능합니다.", {
          theme: "colored",
        });
      } else {
        setSelectedIdeas([newHit, ...selectedIdeas]);
      }
    }
  };

  const searchClient = algoliasearch(
    process.env.REACT_APP_ALGOLIA_APP_ID,
    process.env.REACT_APP_ALGOLIA_API_KEY
  );

  const Hit = ({ hit }) => {
    return (
      <div
        key={hit.objectID}
        className="relative w-full px-4 py-2 break-all overflow-hidden bg-stone-100 rounded-xl shadow-lg"
      >
        {hit.title.length > 0 && (
          <div className="mb-2 font-black">
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
        </div>
        <button
          className={`absolute top-2 right-2 w-5 h-5 ${
            getIDsFromIdeas(selectedIdeas).includes(hit.objectID)
              ? "bg-red-400 text-white"
              : "border-2 border-stone-400"
          } border-2 rounded-full shadow-inner duration-100`}
          onClick={() => {
            onIdeaSelect(hit);
          }}
        >
          {getIDsFromIdeas(selectedIdeas).includes(hit.objectID) && (
            <FontAwesomeIcon icon={faCheck} />
          )}
        </button>
        <button
          className="absolute bottom-2 right-2 text-orange-400"
          onClick={() => {
            onBookmarkClick(hit);
          }}
        >
          <FontAwesomeIcon icon={faBookmark} size="xl" />
        </button>
      </div>
    );
  };

  const myIdea = true;

  const onBookmarkClick = (hit) => {
    console.log(hit.objectID);
  };

  const sessionStorageCache = createInfiniteHitsSessionStorageCache();

  return (
    <div className="min-h-screen flex-col">
      <div className="relative">
        <InstantSearch searchClient={searchClient} indexName="userIdeas">
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
              hitsPerPage={5}
              filters={
                myIdea ? `userId:${loggedInUser.userId}` : "isPublic:true"
              }
            />
            <InfiniteHits
              hitComponent={Hit}
              showPrevious={true}
              cache={sessionStorageCache}
            />
          </div>
        </InstantSearch>
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
