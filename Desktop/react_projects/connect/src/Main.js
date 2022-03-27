import "./Main.css";
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
  faArrowRotateLeft,
  faDiceD6,
  faCaretUp,
  faCodePullRequest,
  faCirclePlus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import {
  faHeart as farHeart,
  faBookmark as farBookmark,
  faCircleXmark,
} from "@fortawesome/free-regular-svg-icons";
import Moment from "react-moment";

const Main = ({ customHooks }) => {
  // function
  const handleFormErrorSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    customHooks.setFormErrorSnackBarOpen(false);
  };

  const displayCreatedAt = (mPost) => {
    let startTime = new Date(mPost.time);
    let nowTime = Date.now();
    console.log(startTime);
    console.log(nowTime);
    if (parseInt(startTime - nowTime) > -60000) {
      return <Moment format="방금 전">{startTime}</Moment>;
    }
    if (parseInt(startTime - nowTime) < -86400000) {
      return <Moment format="YYYY. M. D. HH:MM">{startTime}</Moment>;
    }
    if (parseInt(startTime - nowTime) > -86400000) {
      return <Moment fromNow>{startTime}</Moment>;
    }
  };

  // JSX

  const postListing = (
    <li>
      {customHooks.showingPostIds.length == 0 ? (
        // showingPosts가 비었을 경우 "텅"
        <div
          class="flex justify-center items-center"
          style={{
            width: "100%",
            marginTop: "50px",
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
        <div class="main__box flex flex-wrap">
          {customHooks.posts
            .filter((fPost) =>
              customHooks.showingPostIds.includes(fPost.postId)
            )
            .map((mPost) => (
              // total layout
              <div class="flex-col w-full mb-6 ">
                <div
                  class="main__post borderShadow flex p-2 rounded-3xl"
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
                      class="flex-col content-start items-start"
                      style={{
                        width: "90%",
                      }}
                    >
                      {/* text */}
                      <button
                        class="flex-wrap text-left "
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
                            customHooks.setFormMode(true);
                            customHooks.setInputTitle(mPost.title);
                            customHooks.setInputContent(mPost.content);
                            customHooks.setInputTagList(mPost.tags);
                            customHooks.setInputSource(mPost.source);
                            customHooks.setInputLike(mPost.like);
                            customHooks.setInputBookmark(mPost.bookmark);
                            customHooks.connectedPostIds(
                              mPost.connectedPostIds
                            );
                          }
                        }}
                      >
                        {mPost.content}
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
                      <FontAwesomeIcon icon={faCircleXmark} />
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
                      <FontAwesomeIcon icon={fasHeart} />
                    ) : (
                      <FontAwesomeIcon icon={farHeart} />
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
                      <FontAwesomeIcon icon={fasBookmark} />
                    ) : (
                      <FontAwesomeIcon icon={farBookmark} />
                    )}
                  </button>
                  <span
                    class="absolute"
                    style={{
                      bottom: 0,
                      right: "20px",
                    }}
                  >
                    {displayCreatedAt(mPost)}
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
          marginBottom: "2rem",
          marginLeft: "1rem",
        }}
      >
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
      </div>
      <ul>{postListing}</ul>
      <div class="flex justify-end">
        &nbsp;
        <button
          id="new__post__button"
          class="fixed border p-1"
          style={{
            display: `${
              customHooks.formMode || customHooks.selectedPostIds.length > 0
                ? "none"
                : "initial"
            }`,
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
            customHooks.setFormMode(true);
            customHooks.setFormState("NEW");
          }}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
    </div>
  );
};

export default Main;
