import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHashtag,
  faCircleUser,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

const SearchPage = ({ customHooks }) => {
  const dbIdeas = customHooks.dbIdeas;
  const tagList = customHooks.tagList;
  let navigate = useNavigate();

  const onBackClick = (e) => {
    e.preventDefault();
    navigate("/ideas", { replace: true });
  };

  return (
    <div className="w-full min-h-screen flex-col shadow-xl bg-stone-100 duration-500">
      <div className="flex justify-between items-center p-2 bg-green-600">
        <button className="text-white px-2" onClick={onBackClick}>
          <FontAwesomeIcon icon={faChevronLeft} size="xl" />
        </button>
        <input
          id="searchInput"
          className="w-full mx-2 px-2 h-8 duration-500 rounded-3xl"
          placeholder="Search"
          autoComplete="off"
        />
      </div>
      {/* 태그 검색 */}
      <div className="flex mx-5 pt-5 mb-2 text-lg font-black gap-2 text-green-600">
        태그&nbsp;
        <span className="flex items-center">
          <FontAwesomeIcon icon={faHashtag} />
        </span>
      </div>
      <div className="m-4 p-5 mb-2 rounded-3xl bg-white">
        <div className="flex text-2xl flex-wrap gap-2 max-h-48 overflow-scroll">
          {tagList.map((tag, index) => (
            <span
              key={index}
              className="border-2 rounded-3xl border-stone-200 p-1 text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      {/* 사용자 검색 */}
      <div className="flex mx-5 mt-5 mb-2 text-lg font-black gap-2 text-green-600">
        사용자&nbsp;
        <span className="flex items-center">
          <FontAwesomeIcon icon={faCircleUser} />
        </span>
      </div>
      <div className="m-4 p-5 mb-5 rounded-3xl bg-white">
        <div className="flex text-2xl flex-wrap gap-2 max-h-48 overflow-scroll">
          {dbIdeas
            .filter(
              (idea, index, callback) =>
                index === callback.findIndex((t) => t.userId === idea.userId)
            )
            .map((user, index) => (
              <span
                key={index}
                className="flex items-center justify-between border-2 rounded-3xl  border-stone-200 gap-1"
              >
                <div className="flex items-center gap-1">
                  <div className="flex">
                    <Avatar
                      alt="avatar"
                      src={user.userPhotoURL}
                      sx={{
                        display: "flex",
                        width: "35px",
                        height: "35px",
                      }}
                    />
                  </div>
                  <h2 className="mr-1 font-black text-sm">
                    <b>{user.userName}</b>
                  </h2>
                </div>
              </span>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
