import "./TagBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar as fasStar,
  faDeleteLeft,
  faMagnifyingGlass,
  faCaretUp,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";

const TagBar = ({ customHooks }) => {
  const tagListItem = (mTag) => {
    return (
      <button
        class="m-1 p-1 border rounded-2xl text-sm"
        style={{
          borderColor: `${
            customHooks.filterTag.includes(mTag)
              ? customHooks.color
              : customHooks.textColor
          }`,
          backgroundColor: `${
            customHooks.filterTag.includes(mTag)
              ? customHooks.textColor
              : customHooks.color
          }`,
          fontSize: "12px",
          color: `${
            customHooks.filterTag.includes(mTag)
              ? customHooks.color
              : customHooks.textColor
          }`,
          transition: "0.5s",
        }}
      >
        <button
          onClick={() => {
            if (customHooks.filterTag.includes(mTag)) {
              customHooks.setFilterTag(
                customHooks.filterTag.filter((fTag) => fTag !== mTag)
              );
            } else {
              customHooks.setFilterTag([...customHooks.filterTag, mTag]);
            }
          }}
        >
          {mTag}
        </button>
        <button
          class="px-1"
          onClick={() => {
            if (customHooks.tagFavoriteList.includes(mTag)) {
              customHooks.setTagFavoriteList(
                customHooks.tagFavoriteList.filter((fTag) => fTag !== mTag)
              );
            } else {
              customHooks.setTagFavoriteList(
                [...customHooks.tagFavoriteList, mTag].sort()
              );
            }
          }}
        >
          {customHooks.tagFavoriteList.includes(mTag) ? (
            <FontAwesomeIcon icon={fasStar} />
          ) : (
            <FontAwesomeIcon icon={farStar} />
          )}
        </button>
      </button>
    );
  }; // tagBar에서 tagList와 searchTagList에 보여줄 값

  const showTagList = customHooks.tagList.map((mTag, mIndex) =>
    tagListItem(mTag)
  ); // posts에서 tagList 보여줌

  const showSearchTagList = customHooks.tagList
    .filter((fTag) => fTag.includes(customHooks.searchTag))
    .map((mTag, mIndex) => tagListItem(mTag));
  // search 내용에 따라 tagList 보여줌

  const showTagFavoriteList = customHooks.tagFavoriteList.map(
    (mTag, mIndex) => (
      <button
        class="m-1 p-1 border rounded-2xl text-sm"
        style={{
          borderColor: `${
            customHooks.filterTag.includes(mTag)
              ? customHooks.color
              : customHooks.textColor
          }`,
          backgroundColor: `${
            customHooks.filterTag.includes(mTag)
              ? customHooks.textColor
              : customHooks.color
          }`,
          fontSize: "12px",
          color: `${
            customHooks.filterTag.includes(mTag)
              ? customHooks.color
              : customHooks.textColor
          }`,
          transition: "0.5s",
        }}
      >
        <button
          onClick={() => {
            if (customHooks.filterTag.includes(mTag)) {
              customHooks.setFilterTag(
                customHooks.filterTag.filter((fTag) => fTag !== mTag)
              );
            } else {
              customHooks.setFilterTag([...customHooks.filterTag, mTag]);
            }
          }}
        >
          {mTag}
        </button>
        <button
          class="px-1"
          onClick={() => {
            customHooks.setTagFavoriteList(
              customHooks.tagFavoriteList.filter(
                (fTag, fIndex) => mIndex !== fIndex
              )
            );
          }}
        >
          <FontAwesomeIcon icon={faDeleteLeft} />
        </button>
      </button>
    )
  );

  return (
    <div
      class="tagbar p-1 flex-wrap"
      style={{
        backgroundColor: `${customHooks.color}`,
        color: `${customHooks.textColor}`,
      }}
    >
      <div ref={customHooks.topTagBar}></div>
      <div class="m-2">
        <FontAwesomeIcon icon={fasStar} />
        <span>
          <b> Favorites</b>
        </span>
      </div>
      <div class="mb-2">{showTagFavoriteList}</div>
      <hr />
      <input
        class="m-2 px-2 rounded-2xl text-gray-600"
        style={{
          width: "80%",
        }}
        type="text"
        value={customHooks.searchTag}
        onChange={(e) => {
          customHooks.setSearchTag(e.target.value);
        }}
      />
      <span style={{ width: "20%" }}>
        <FontAwesomeIcon icon={faMagnifyingGlass} size="xs" />
      </span>
      {customHooks.searchTag.length === 0 ? (
        <div>
          {customHooks.tagList.length === 0 ? (
            <div></div>
          ) : (
            <div>
              <button
                class="m-1 p-1 border rounded-2xl text-sm"
                style={{
                  width: "40px",
                  borderColor: `${customHooks.textColor}`,
                  backgroundColor: `${customHooks.color}`,
                  fontSize: "12px",
                  color: `${customHooks.textColor}`,
                  transition: "0.5s",
                }}
                onClick={() => {
                  customHooks.setFilterTag([]);
                }}
              >
                All
              </button>
              {showTagList}
            </div>
          )}
        </div>
      ) : (
        <div>{showSearchTagList}</div>
      )}

      <button
        class="fixed border p-1"
        style={{
          width: "35px",
          height: "35px",
          bottom: "10px",
          left: "200px",
          borderRadius: "100%",
          boxShadow: "0 0 5px grey",
          backgroundColor: `${customHooks.color}`,
          color: `${customHooks.textColor}`,
          transition: "0.5s",
        }}
        onClick={() => {
          customHooks.topTagBar.current?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <FontAwesomeIcon icon={faCaretUp} />
      </button>
    </div>
  );
};

export default TagBar;
