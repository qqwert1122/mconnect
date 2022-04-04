import "./TagBar.css";
import "./SideBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar as fasStar,
  faDeleteLeft,
  faMagnifyingGlass,
  faCaretUp,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";

const TagBar = ({ customHooks }) => {
  const tagListItem = (mTag, mIndex) => {
    return (
      <button
        key={mIndex}
        class="item__hover m-1 p-1 border rounded-2xl text-sm"
        style={{
          borderColor: "#2C272E",
          backgroundColor: `${
            customHooks.filterTag.includes(mTag) ? customHooks.color : "#ffffff"
          }`,
          fontSize: "12px",
          color: `${
            customHooks.filterTag.includes(mTag)
              ? customHooks.textColor
              : "#2C272E"
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
    tagListItem(mTag, mIndex)
  ); // posts에서 tagList 보여줌

  const showSearchTagList = customHooks.tagList
    .filter((fTag) => fTag.includes(customHooks.searchTag))
    .map((mTag, mIndex) => tagListItem(mTag, mIndex));
  // search 내용에 따라 tagList 보여줌

  const showTagFavoriteList = customHooks.tagFavoriteList.map(
    (mTag, mIndex) => (
      <button
        key={mIndex}
        class="item__hover m-1 p-1 border rounded-2xl text-sm"
        style={{
          borderColor: "#2C272E",
          backgroundColor: `${
            customHooks.filterTag.includes(mTag) ? customHooks.color : "#ffffff"
          }`,
          fontSize: "12px",
          color: `${
            customHooks.filterTag.includes(mTag)
              ? customHooks.textColor
              : "#2C272E"
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
        color: "#2C272E",
      }}
    >
      <div
        ref={customHooks.topTagBar}
        style={{
          height: "100px",
        }}
      ></div>
      {customHooks.tagFavoriteList.length === 0 ? (
        <div></div>
      ) : (
        <div>
          <div class="m-2">
            <FontAwesomeIcon icon={fasStar} />
            <span>
              <b> Favorites</b>
            </span>
          </div>
          <div class="mb-2">{showTagFavoriteList}</div>
          <hr />
        </div>
      )}

      {customHooks.searchTag.length === 0 ? (
        <div>
          {customHooks.tagList.length === 0 ? (
            <div></div>
          ) : (
            <div style={{ paddingBottom: "40px" }}>
              <button
                class="item__hover m-1 p-1 border rounded-2xl text-sm"
                style={{
                  width: "40px",
                  borderColor: "#2C272E",
                  // backgroundColor: `${customHooks.textColor}`,
                  fontSize: "12px",
                  color: "#2C272E",
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
      {/* <div class="flex justify-end">
        <button
          class="fixed border p-1"
          style={{
            width: "35px",
            height: "35px",
            bottom: "10px",
            borderRadius: "100%",
            boxShadow: "0 0 2px grey",
            backgroundColor: `${customHooks.color}`,
            color: `${customHooks.textColor}`,
            transition: "0.5s",
          }}
          onClick={() => {
            customHooks.topTagBar.current?.scrollIntoView({
              behavior: "smooth",
            });
          }}
        >
          <FontAwesomeIcon icon={faCaretUp} />
        </button>
      </div> */}
    </div>
  );
};

export default TagBar;
