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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";

const SearchPage = ({ customHooks }) => {
  const userIdeas = customHooks.userIdeas;
  const navigate = customHooks.navigate;
  const setWhatView = customHooks.setWhatView;
  const tagList = customHooks.tagList;
  const sourceList = customHooks.sourceList;
  const selectedIdeas = customHooks.selectedIdeas;
  const setSelectedIdeas = customHooks.setSelectedIdeas;
  const scrollY = customHooks.scrollY;
  const setScrollY = customHooks.setScrollY;

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

  useEffect(() => {
    setShowingSearchIdeas(userIdeas);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, scrollY);
    }, 100);
  }, []);

  useEffect(() => {
    if (listAllCriteria.length === 0) {
      setShowingSearchIdeas(userIdeas);
    } else {
      setShowingSearchIdeas(
        userIdeas.filter(
          (idea, index) =>
            listSearchCriteriaSource.some((x) =>
              userIdeas[index].source.includes(x)
            ) ||
            listSearchCriteriaTag.some((x) =>
              userIdeas[index].tags.includes(x)
            ) ||
            listSearchCriteriaUser.some((x) =>
              userIdeas[index].userName.includes(x)
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
    <div className="min-h-screen flex-col bg-stone-100">
      <div className="moveRightToLeft">
        <SearchPageTopBar
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
        />
      </div>
      <FloatingUpButton
        floating={true}
        scrollY={scrollY}
        setScrollY={setScrollY}
      />

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
