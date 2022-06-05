import "css/Animation.css";
import SearchPageTopBar from "./SearchPageTopBar";
import SearchCriteria from "./SearchCriteria";
import CriteriaSource from "./CriteriaSource";
import CriteriaTag from "./CriteriaTag";
import CriteriaUser from "./CriteriaUser";
import CriteriaAll from "./CriteriaAll";
import { useEffect, useState } from "react";
import ShowingSearchIdeas from "./ShowingSearchIdeas";
import FloatingUpButton from "../FloatingUpButton";

const SearchPage = ({ customHooks }) => {
  const dbIdeas = customHooks.dbIdeas;
  const setNavValue = customHooks.setNavValue;
  const setViewIdea = customHooks.setViewIdea;
  const setUserContext = customHooks.setUserContext;
  const tagList = customHooks.tagList;
  const sourceList = customHooks.sourceList;
  const selectedIdeas = customHooks.selectedIdeas;
  const setSelectedIdeas = customHooks.setSelectedIdeas;
  const scrollY = customHooks.scrollY;
  const setScrollY = customHooks.setScrollY;

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
    setTimeout(() => {
      window.scrollTo(0, scrollY);
    }, 100);
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

      <ShowingSearchIdeas
        setNavValue={setNavValue}
        setViewIdea={setViewIdea}
        setUserContext={setUserContext}
        showingSearchIdeas={showingSearchIdeas}
        searchTerm={searchTerm}
        selectedIdeas={selectedIdeas}
        setSelectedIdeas={setSelectedIdeas}
      />
      <FloatingUpButton scrollY={scrollY} setScrollY={setScrollY} />

      {selectedIdeas.length > 0 && (
        <div className="heightStrech w-full p-4 fixed bottom-0 shadow-inner bg-red-400 text-white font-black text-center text-base ">
          {selectedIdeas.length}개 선택됨
        </div>
      )}
    </div>
  );
};

export default SearchPage;
