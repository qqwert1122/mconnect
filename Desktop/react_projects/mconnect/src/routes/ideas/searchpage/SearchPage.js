import SearchPageTopBar from "./SearchPageTopBar";
import SearchCriteria from "./SearchCriteria";
import CriteriaSource from "./CriteriaSource";
import CriteriaTag from "./CriteriaTag";
import CriteriaUser from "./CriteriaUser";
import CriteriaAll from "./CriteriaAll";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faCircle,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/free-regular-svg-icons";

const SearchPage = ({ customHooks }) => {
  const dbIdeas = customHooks.dbIdeas;
  const setNavValue = customHooks.setNavValue;
  const tagList = customHooks.tagList;
  const sourceList = customHooks.sourceList;
  const selectedIdeas = customHooks.selectedIdeas;
  const setSelectedIdeas = customHooks.setSelectedIdeas;

  const userList = dbIdeas.filter(
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

  useEffect(() => {
    setShowingSearchIdeas(dbIdeas);
  }, []);

  useEffect(() => {
    if (listAllCriteria.length === 0) {
      setShowingSearchIdeas(dbIdeas);
    } else {
      setShowingSearchIdeas(
        dbIdeas.filter(
          (idea, index) =>
            listSearchCriteriaSource.some((x) =>
              dbIdeas[index].source.includes(x)
            ) ||
            listSearchCriteriaTag.some((x) =>
              dbIdeas[index].tags.includes(x)
            ) ||
            listSearchCriteriaUser.some((x) =>
              dbIdeas[index].userName.includes(x)
            )
        )
      );
    }
  }, [listSearchCriteriaSource, listSearchCriteriaTag, listSearchCriteriaUser]);

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

  const onIdeaClick = (idea) => {
    if (selectedIdeas.includes(idea)) {
      setSelectedIdeas(selectedIdeas.filter((_idea) => _idea !== idea));
    } else {
      setSelectedIdeas([...selectedIdeas, idea]);
    }
  };

  return (
    <div className="min-h-screen flex-col bg-white">
      <SearchPageTopBar
        setNavValue={setNavValue}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

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
      <div className="w-full h-2 bg-stone-100"></div>

      <CriteriaAll
        listAllCriteria={listAllCriteria}
        onXmarkClick={onXmarkClick}
      />

      {showingSearchIdeas
        .filter(
          (idea) =>
            idea.title.includes(searchTerm) || idea.text.includes(searchTerm)
        )
        .map((idea) => (
          <>
            <div key={idea.id} className="m-2">
              <div className="py-2 flex-col">
                <div className="font-black pb-1">{idea.title}</div>
                <div className="py-1">
                  {idea.text.length > 200 ? (
                    <>
                      {idea.text.substr(0, 200)}
                      ...
                    </>
                  ) : (
                    idea.text
                  )}
                </div>
                <div className="flex items-start">
                  <div className="w-11/12 flex flex-wrap items-center gap-2 text-xs text-stone-400">
                    <span>{idea.userName}</span>|<span>{idea.source}</span>|
                    {idea.tags
                      .filter((tag, index) => index < 2)
                      .map((tag, index) => (
                        <span
                          key={index}
                          className="flex-shrink-0 flex-grow-0 bg-stone-200 rounded-lg p-1"
                        >
                          {tag}
                        </span>
                      ))}
                    {idea.tags.length > 1 && (
                      <span className="flex-shrink-0 flex-grow-0 bg-stone-200 rounded-lg p-1">
                        ...
                      </span>
                    )}
                  </div>
                  <div className="w-1/12 flex items-center">
                    <button
                      className={`box-border opacity rounded-full ${
                        selectedIdeas.includes(idea)
                          ? "bg-red-400 text-white"
                          : "border-2 border-stone-400"
                      } w-6 h-6`}
                      onClick={() => {
                        onIdeaClick(idea);
                      }}
                    >
                      {selectedIdeas.includes(idea) ? (
                        <FontAwesomeIcon icon={faCheck} />
                      ) : (
                        <></>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <hr />
          </>
        ))}
    </div>
  );
};

export default SearchPage;
