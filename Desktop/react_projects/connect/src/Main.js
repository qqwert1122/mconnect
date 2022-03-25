import "./Main.css";
import { Fragment } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
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
} from "@fortawesome/free-solid-svg-icons";
import {
  faHeart as farHeart,
  faBookmark as farBookmark,
  faCircleXmark,
} from "@fortawesome/free-regular-svg-icons";

const Main = ({ customHooks }) => {
  // function
  const handleDeleteSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    customHooks.setDeleteSnackBarOpen(false);
  };

  const handleFormErrorSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    customHooks.setFormErrorSnackBarOpen(false);
  };

  // JSX

  const deleteSnackBarAction = (
    <Fragment>
      <Button
        color="inherit"
        size="small"
        onClick={() => {
          customHooks.setPosts([...customHooks.posts, customHooks.tempoPost]);
          handleDeleteSnackBarClose();
        }}
      >
        <FontAwesomeIcon icon={faArrowRotateLeft} />
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleDeleteSnackBarClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Fragment>
  );

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
                  class="main__post borderShadow flex p-2 rounded-3xl bg-green-200"
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
                          } else {
                            customHooks.setSelectedPostIds([
                              ...customHooks.selectedPostIds,
                              mPost.postId,
                            ]);
                            customHooks.setLastSelectedPostId(mPost.postId);
                            console.log(
                              customHooks.posts.find(
                                (x) =>
                                  x.postId === customHooks.lastSelectedPostId
                              ).connectedPostIds.length
                            );
                          }
                        }}
                      >
                        {mPost.text}
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
                    {/* posts 삭제 버튼 누르면 나오는 대화상자 */}
                    <Dialog
                      open={customHooks.deleteDialogOpen}
                      onClose={() => {
                        customHooks.setDeleteDialogOpen(false);
                      }}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogTitle id="alert-dialog-title">
                        {"삭제 알림"}
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText
                          id="alert-dialog-description"
                          style={{
                            fontSize: "12px",
                          }}
                        >
                          정말 글을 지우시겠다면 '삭제'를 눌러주세요.
                          <br />
                          삭제된 글은 한 달간 휴지통에 보관됩니다.
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button
                          onClick={() => {
                            customHooks.setDeleteDialogOpen(false);
                          }}
                          style={{
                            fontSize: "12px",
                          }}
                        >
                          취소
                        </Button>
                        <Button
                          onClick={() => {
                            customHooks.setPosts(
                              customHooks.posts.filter(
                                (fPost, fIndex) =>
                                  fPost != customHooks.tempoPost
                              )
                            );
                            customHooks.setDeleteDialogOpen(false);
                            customHooks.setDeleteSnackBarOpen(true);
                          }}
                          autoFocus
                          style={{
                            fontSize: "12px",
                          }}
                        >
                          삭제
                        </Button>
                      </DialogActions>
                    </Dialog>
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
                    2022. 3. 25. 16:39
                  </span>
                </div>
              </div>
            ))}
        </div>
      )}
      {/* 대화상자에서 삭제 누르면 나오는 스낵바 */}
      <Snackbar
        open={customHooks.deleteSnackBarOpen}
        autoHideDuration={6000}
        onClose={handleDeleteSnackBarClose}
        message="글이 삭제되었습니다"
        action={deleteSnackBarAction}
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
    <div
      ref={customHooks.mainLayout}
      class="main flex-col flex-wrap rounded-tl-3xl"
      style={{
        color: `${customHooks.color}`,
        paddingBottom: `${
          customHooks.formMode ? customHooks.formDisplay : "20px"
        }`,
      }}
    >
      <div ref={customHooks.topMain}></div>
      <ul>{postListing}</ul>

      {/* form */}
      {/* <div
        class="formBox rounded-t-3xl"
        style={{
          height: `${customHooks.formDisplay}`,
          // minHeight: `${customHooks.formDisplay}`,
          color: `${customHooks.textColor}`,
          backgroundColor: `${customHooks.color}`,
        }}
      >
        <div class="flex justify-center items-center">
          <button
            onClick={() => {
              customHooks.setFormMode(!customHooks.formMode);
            }}
          >
            {customHooks.formMode ? (
              <FontAwesomeIcon icon={faAngleDown} />
            ) : (
              <FontAwesomeIcon icon={faAngleUp} />
            )}
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default Main;
