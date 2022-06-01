import SearchPageTopBar from "./SearchPageTopBar";
import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/free-regular-svg-icons";
import Idea from "../idea/Idea";

const SearchPage = ({ customHooks }) => {
  const dbIdeas = customHooks.dbIdeas;
  const setNavValue = customHooks.setNavValue;
  const tagList = customHooks.tagList;
  const sourceList = customHooks.sourceList;

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

  const onCriteriaClick = (index) => {
    setSelectedCriteria(index);
  };

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

      <div className="mx-5 pt-20 pb-5 flex gap-4 text-base">
        {searchCriteria.map((criteria, index) => (
          <button
            key={index}
            className={`${
              index === selectedCriteria ? "underline" : "text-stone-400"
            } font-black duration-100`}
            onClick={() => onCriteriaClick(index)}
          >
            {criteria}
          </button>
        ))}
      </div>

      {selectedCriteria === 1 && (
        <div className="mx-4 mb-2 flex flex-nowrap overflow-x-scroll">
          {sourceList
            .filter((source) => source.includes(searchTerm))
            .map((source, index) => (
              <button
                key={index}
                className={`mr-1 mb-1 px-3 py-1 flex-grow-0 flex-shrink-0 border-box rounded-3xl border-2  break-words text-xs shadow-sm duration-500 ${
                  listSearchCriteriaSource.includes(source) &&
                  "bg-green-400 text-white"
                }`}
                style={{ flexBasis: "auto" }}
                onClick={() => onSourceCriteriaClick(source)}
              >
                {source}
              </button>
            ))}
        </div>
      )}

      {selectedCriteria === 2 && (
        <div className="mx-4 mb-2 flex flex-nowrap overflow-x-scroll">
          {tagList
            .filter((tag) => tag.includes(searchTerm))
            .map((tag, index) => (
              <button
                key={index}
                className={`mr-1 mb-1 px-3 py-1 flex-grow-0 flex-shrink-0 border-box rounded-3xl border-2  break-words text-xs shadow-sm duration-500 ${
                  listSearchCriteriaTag.includes(tag) &&
                  "bg-green-400 text-white"
                }`}
                style={{ flexBasis: "auto" }}
                onClick={() => onTagCriteriaClick(tag)}
              >
                {tag}
              </button>
            ))}
        </div>
      )}

      {selectedCriteria === 3 && (
        <div className="mx-4 mb-2 flex flex-nowrap overflow-x-scroll">
          {userList
            .filter((user) => user.userName.includes(searchTerm))
            .map((user, index) => (
              <button
                key={index}
                className={`mr-1 mb-1 flex-grow-0 flex-shrink-0 border-box rounded-3xl border-2  break-words  shadow-sm duration-500 ${
                  listSearchCriteriaUser.includes(user.userName) &&
                  "bg-green-400 text-white"
                }`}
                onClick={() => onUserCriteriaClick(user.userName)}
              >
                <div className="flex items-center gap-1">
                  <div className="flex">
                    <Avatar
                      alt="avatar"
                      src={user.userPhotoURL}
                      sx={{
                        display: "flex",
                        width: "30px",
                        height: "30px",
                      }}
                    />
                  </div>
                  <h2 className="mr-1 font-light text-xs">
                    <b>{user.userName}</b>
                  </h2>
                </div>
              </button>
            ))}
        </div>
      )}
      <div className="w-full h-2 bg-stone-100"></div>

      <div className="m-4 mb-2 flex flex-nowrap overflow-x-scroll">
        {listAllCriteria.map((all, index) => (
          <span
            key={index}
            className={`mr-1 mb-1 px-2 py-1 flex-grow-0 flex-shrink-0 border-box rounded-3xl border-2  break-words bg-green-400 text-white text-xs shadow-sm duration-500`}
            style={{ flexBasis: "auto" }}
          >
            {all}
            <button className="px-1" onClick={() => onXmarkClick(all)}>
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
          </span>
        ))}
      </div>

      {showingSearchIdeas
        .filter((idea) => idea.text.includes(searchTerm))
        .map((idea) => (
          <div key={idea.id} className="bg-stone-50 ">
            {idea.text}
          </div>
        ))}
    </div>
  );
};

export default SearchPage;
