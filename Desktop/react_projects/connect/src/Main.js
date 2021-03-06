import "./Main.css";
import "./SideBar.css";
import Snackbar from "@mui/material/Snackbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as fasHeart,
  faBookmark as fasBookmark,
  faCircle,
  faSquare,
  faMinus,
  faQuoteLeft,
  faQuoteRight,
  faDiceD6,
  faPlus,
  faCheckDouble,
} from "@fortawesome/free-solid-svg-icons";
import {
  faHeart as farHeart,
  faBookmark as farBookmark,
  faCircleXmark,
} from "@fortawesome/free-regular-svg-icons";

const Main = ({ customHooks }) => {
  // function
  const handleFormErrorSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    customHooks.setFormErrorSnackBarOpen(false);
  };
  // JSX

  const postListing = (
    <li key={customHooks.showingPostIds}>
      {customHooks.showingPostIds.length == 0 ? (
        // showingPosts가 비었을 경우 "텅"
        <div
          class="flex justify-center items-center"
          style={{
            width: "100%",
            paddingTop: "50px",
            color: "#2C272E",
            transition: "0.5s",
            fontSize: "30px",
          }}
        >
          <FontAwesomeIcon icon={faQuoteLeft} size="xs" />
          &nbsp;<b>텅</b>&nbsp;
          <FontAwesomeIcon icon={faQuoteRight} size="xs" />
        </div>
      ) : (
        // showingPosts
        <div
          class="main__box flex flex-wrap"
          style={{
            transition: "0.5s",
          }}
        >
          {customHooks.posts
            .filter((fPost) =>
              customHooks.showingPostIds.includes(fPost.postId)
            )
            .map((mPost, mIndex) => (
              // total layout
              <div key={mIndex} class="flex-col w-full mb-6 ">
                <div
                  class={
                    customHooks.selectedPostIds.some(
                      (sPostId) => sPostId === mPost.postId
                    )
                      ? "main__post borderShadow flex p-2 rounded-3xl"
                      : "item__hover main__post borderShadow flex p-2 rounded-3xl"
                  }
                  style={{
                    color: `${
                      customHooks.selectedPostIds.some(
                        (sPostId) => sPostId === mPost.postId
                      )
                        ? `${customHooks.textColor}`
                        : "#2C272E"
                    }`,
                    backgroundColor: `${
                      customHooks.selectedPostIds.some(
                        (sPostId) => sPostId === mPost.postId
                      )
                        ? `${customHooks.color}`
                        : "#FAFAFA"
                    }`,
                  }}
                >
                  <div class="relative flex w-full items-center ">
                    {/* category */}
                    <button
                      class="flex justify-center items-center h-full"
                      style={{
                        width: "5%",
                        // marginRight: "10px",
                      }}
                      onClick={() => {}}
                    >
                      {mPost.category === 3 ? (
                        <FontAwesomeIcon icon={faDiceD6} />
                      ) : mPost.category === 2 ? (
                        <FontAwesomeIcon icon={faSquare} size="xs" />
                      ) : mPost.category === 1 ? (
                        <FontAwesomeIcon icon={faMinus} />
                      ) : (
                        <FontAwesomeIcon icon={faCircle} size="2xs" />
                      )}
                    </button>
                    {/* Posts */}
                    <div
                      class="flex-col content-start items-start box-border"
                      style={{
                        width: "90%",
                        paddingLeft: "10px",
                      }}
                    >
                      {/* title / content */}
                      <button
                        class="flex-wrap text-left w-full"
                        style={{
                          wordBreak: "break-all",
                        }}
                        onClick={() => {
                          if (
                            customHooks.selectedPostIds.some(
                              (sPostId) => sPostId === mPost.postId
                            )
                          ) {
                            customHooks.setSelectedPostIds(
                              customHooks.selectedPostIds.filter(
                                (fPostId) => fPostId != mPost.postId
                              )
                            );
                            if (customHooks.selectedPostIds.length === 1) {
                              customHooks.setFormMode(false);
                            }
                          } else {
                            customHooks.setSelectedPostIds([
                              ...customHooks.selectedPostIds,
                              mPost.postId,
                            ]);
                          }
                        }}
                      >
                        {mPost.title == "" ? (
                          <div></div>
                        ) : (
                          <div
                            style={{
                              fontSize: "1.2rem",
                              marginBottom: "0.5rem",
                            }}
                          >
                            <b>{mPost.title}</b>
                          </div>
                        )}
                        <div>{mPost.content}</div>
                      </button>
                      {/* source */}
                      <div
                        class="flex-wrap mt-3 "
                        style={{
                          fontSize: "12px",
                        }}
                      >
                        <a href="`${mPost.source}">{mPost.source}</a>
                      </div>
                      {/* tag */}
                      <div class="flex flex-wrap justify-start ">
                        {mPost.tags.map((mTag, mIndex) => (
                          <button
                            key={mIndex}
                            class="mr-1 mt-1 px-1 rounded-2xl"
                            style={{
                              fontSize: "12px",
                              color: "#EEEEEE",
                              backgroundColor: "#2C272E",
                              transition: "0.5s",
                            }}
                            onClick={() => {
                              customHooks.setFilterTag([mTag]);
                            }}
                          >
                            {mTag}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      class="absolute"
                      style={{
                        top: 0,
                        right: 0,
                      }}
                      variant="outlined"
                      onClick={() => {
                        customHooks.setTempoPost(mPost);
                        customHooks.setDeleteDialogOpen(true);
                      }}
                    >
                      <p class="delete__button">
                        <FontAwesomeIcon icon={faCircleXmark} />
                      </p>
                    </button>
                  </div>
                </div>

                {/* 하단 like, bookmark, timestamp */}
                <div
                  class="relative flex w-full pt-2"
                  style={{
                    color: "#2C272E",
                  }}
                >
                  &nbsp;
                  <button
                    class="absolute"
                    style={{ color: "red", left: "20px", bottom: 0 }}
                    onClick={() => {
                      const copyPosts = [...customHooks.posts];
                      const findIndex = customHooks.posts.findIndex(
                        (e) => e.postId === mPost.postId
                      );
                      copyPosts[findIndex] = {
                        ...copyPosts[findIndex],
                        like: !mPost.like,
                      };
                      customHooks.setPosts(copyPosts);
                    }}
                  >
                    {mPost.like ? (
                      <p class="like__button">
                        <FontAwesomeIcon icon={fasHeart} />
                      </p>
                    ) : (
                      <p class="like__button">
                        <FontAwesomeIcon icon={farHeart} />
                      </p>
                    )}
                  </button>
                  <button
                    class="absolute"
                    style={{ color: "orange", left: "40px", bottom: 0 }}
                    onClick={() => {
                      const copyPosts = [...customHooks.posts];
                      const findIndex = customHooks.posts.findIndex(
                        (e) => e.postId === mPost.postId
                      );
                      copyPosts[findIndex] = {
                        ...copyPosts[findIndex],
                        bookmark: !mPost.bookmark,
                      };
                      customHooks.setPosts(copyPosts);
                    }}
                  >
                    {mPost.bookmark ? (
                      <p class="bookmark__button">
                        <FontAwesomeIcon icon={fasBookmark} />
                      </p>
                    ) : (
                      <p class="bookmark__button">
                        <FontAwesomeIcon icon={farBookmark} />
                      </p>
                    )}
                  </button>
                  <span
                    class="absolute"
                    style={{
                      bottom: 0,
                      right: "20px",
                    }}
                  >
                    {customHooks.timeDisplay(mPost)}
                  </span>
                </div>
              </div>
            ))}
        </div>
      )}
      {customHooks.deleteDialog}
      {/* 대화상자에서 삭제 누르면 나오는 스낵바 */}
      <Snackbar
        open={customHooks.deleteSnackBarOpen}
        autoHideDuration={6000}
        onClose={customHooks.handleDeleteSnackBarClose}
        message="글이 삭제되었습니다"
        action={customHooks.deleteSnackBarAction}
      />
      <Snackbar
        open={customHooks.formErrorSnackBarOpen}
        autoHideDuration={3000}
        onClose={handleFormErrorSnackBarClose}
        message="내용을 입력하세요"
        sx={{ color: "red" }}
      />
    </li>
  );

  return (
    <div class="main flex-col flex-wrap">
      <div ref={customHooks.topMain}></div>
      <div
        style={{
          fontSize: "1.8rem",
          paddingBottom: "2rem",
          paddingLeft: "1rem",
        }}
      >
        <span class="mr-3">
          <b>
            {customHooks.tabValue === 0 ? (
              "All"
            ) : customHooks.tabValue === 1 ? (
              <FontAwesomeIcon icon={faCircle} size="xs" />
            ) : customHooks.tabValue === 2 ? (
              <FontAwesomeIcon icon={faMinus} />
            ) : customHooks.tabValue === 3 ? (
              <FontAwesomeIcon icon={faSquare} size="sm" />
            ) : (
              <FontAwesomeIcon icon={faDiceD6} />
            )}
          </b>
        </span>
        <span class="w-10 flex-nowrap ">
          {customHooks.filterTag.map((mTag, mIndex) => (
            <span
              key={mIndex}
              class="m-1 p-1 border rounded-2xl text-sm"
              style={{
                width: "40px",
                borderColor: "#2C272E",
                // backgroundColor: `${customHooks.textColor}`,
                fontSize: "0.8rem",
                color: "#2C272E",
                transition: "0.5s",
              }}
            >
              {mTag}
            </span>
          ))}
        </span>
      </div>
      <ul>{postListing}</ul>
      <div class="flex justify-end">
        &nbsp;
        <button
          class="new__post__button fixed border p-1"
          style={{
            display: `${customHooks.formMode ? "none" : "initial"}`,
            width: "40px",
            height: "40px",
            bottom: "10px",
            borderRadius: "100%",
            boxShadow: "0 0 2px grey",
            backgroundColor: `${customHooks.color}`,
            color: `${customHooks.textColor}`,
            transition: "0.5s",
          }}
          onClick={() => {
            customHooks.setFormMode(true);
            customHooks.setFormState("NEW");
          }}
        >
          <FontAwesomeIcon icon={faPlus} size="xl" />
        </button>
        <button
          class="new__post__button fixed border p-1"
          style={{
            display: `${
              customHooks.selectedPostIds.length >= 1 ? "initial" : "none"
            }`,
            height: "40px",
            width: "40px",
            bottom: "10px",
            borderRadius: "100%",
            boxShadow: "0 0 2px grey",
            backgroundColor: "#fff44f",
            color: `${customHooks.textColor}`,
            transition: "0.5s",
          }}
          onClick={() => {
            customHooks.setSelectedPostIds([]);
            customHooks.setFormMode(false);
          }}
        >
          <FontAwesomeIcon icon={faCheckDouble} size="xl" />
        </button>
      </div>
    </div>
  );
};

export default Main;
