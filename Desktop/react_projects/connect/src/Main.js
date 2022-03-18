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
  faHashtag,
  faCircleChevronUp,
  faCircle,
  faSquare,
  faMinus,
  faAngleDown,
  faFilter,
  faQuoteLeft,
  faCaretUp,
  faHeart as fasHeart,
  faBookmark as fasBookmark,
  faQuoteRight,
  faPlus,
  faArrowRotateLeft,
  faDiceD6,
} from "@fortawesome/free-solid-svg-icons";
import {
  faHeart as farHeart,
  faBookmark as farBookmark,
  faCopy,
  faCircleXmark,
} from "@fortawesome/free-regular-svg-icons";

const Main = ({ customHooks }) => {
  // function
  const onSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    form.inputText.value = form.inputText.value.trim();

    if (form.inputText.value.trim().length == 0) {
      alert("내용을 입력해주세요.");
      form.inputText.focus();
      return;
    }

    const postId = customHooks.lastPostId + 1;
    customHooks.setLastPostId(postId);

    const newPost = {
      postId: postId,
      category: customHooks.inputCategory, // category 수정해야함
      title: "", // title 수정해야함
      text: form.inputText.value,
      source: form.inputSource.value,
      tags: customHooks.inputTagList,
      like: customHooks.inputLike,
      bookmark: customHooks.inputBookmark,
      connectedPostId: [], // conncetedPostId 수정해야함
    };

    customHooks.setPosts([...customHooks.posts, newPost]); // post 등록
    customHooks.setInputCategory(0);
    // title
    customHooks.setInputContent(""); // form 초기화
    customHooks.setInputSource("");
    customHooks.setInputTag("");
    customHooks.setInputTagList([]);
    customHooks.setInputLike(false);
    customHooks.setInputBookmark(false);
    // connectedPostId
    customHooks.setSelectedPostIds([]);
    customHooks.setFormMode(!customHooks.formMode);
  };

  const handleDeleteSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    customHooks.setDeleteSnackBarOpen(false);
  };

  // JSX

  //formPressed랑 unpressed 합치기
  const sideBarFormIcon = (
    <button
      class="border p-1"
      style={{
        width: "35px",
        height: "35px",
        marginBottom: "40px",
        color: `${customHooks.textColor}`,
        background: `${customHooks.color}`,
        borderRadius: "100%",
        boxShadow: "0 0 5px grey",
        position: "fixed",
        bottom: "0px",
        right: "24%",
      }}
      onClick={() => {
        customHooks.setFormMode(!customHooks.formMode);
      }}
    >
      {customHooks.formMode ? (
        <FontAwesomeIcon icon={faAngleDown} />
      ) : (
        <FontAwesomeIcon icon={faPlus} />
      )}
    </button>
  );

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
    <li key={customHooks.showingPostIds}>
      <div class="flex-col m-5">
        {customHooks.showingPostIds.length == 0 ? (
          // showingPosts가 비었을 경우 "텅"
          <div
            class="flex justify-center items-center m-2 p-2 rounded-3xl"
            style={{
              width: "650px",
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
          <div class="flex-wrap">
            {customHooks.posts
              .filter((fPost) =>
                customHooks.showingPostIds.includes(fPost.postId)
              )
              .map((mPost) => (
                // total layout
                <div
                  class="borderShadow flex m-2 p-2 rounded-3xl"
                  style={{
                    width: "90%",
                    fontSize: "14px",
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
                        : "#EEEEEE"
                    }`,
                    transition: "0.5s",
                  }}
                >
                  <div class="flex w-full items-center">
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
                        width: "85%",
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
                              if (customHooks.filterTag.includes(mTag)) {
                                customHooks.setFilterTag(
                                  customHooks.filterTag.filter(
                                    (fTag) => fTag != mTag
                                  )
                                );
                              } else {
                                customHooks.setFilterTag([
                                  ...customHooks.filterTag,
                                  mTag,
                                ]);
                              }
                            }}
                          >
                            {mTag}
                          </button>
                        ))}
                      </div>
                    </div>
                    {/* action icons(like, bookmark, delete) */}
                    <div
                      class="flex justify-around "
                      style={{ width: "10%", height: "100%" }}
                    >
                      {/* 왼쪽 */}
                      <div class="flex-col justify-between">
                        <div
                          class="flex items-end"
                          style={{ height: "50%" }}
                        ></div>
                        <div class="flex items-end " style={{ height: "50%" }}>
                          <button>
                            <FontAwesomeIcon icon={faCopy} />
                          </button>
                        </div>
                      </div>
                      {/* 가운데 */}
                      <div class="flex-col justify-between">
                        <div
                          class="flex items-end"
                          style={{ height: "50%" }}
                        ></div>
                        <div class="flex items-end " style={{ height: "50%" }}>
                          <button
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
                        </div>
                      </div>
                      {/* 오른쪽 */}
                      <div class="flex-col justify-between ">
                        {/* 오른쪽-위 */}
                        <div class="flex items-start" style={{ height: "50%" }}>
                          <button
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
                        {/* 오른쪽-아래 */}
                        <div class="flex items-end " style={{ height: "50%" }}>
                          <button
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
                        </div>
                      </div>
                    </div>
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
      </div>
    </li>
  );

  return (
    <div
      class="borderShadow flex-col flex-wrap rounded-t-3xl "
      style={{
        width: "60%",
        height: "calc(100vh - 80px)",
        maxHeight: "calc(100vh - 80px)",
        overflow: "auto",
        color: `${customHooks.color}`,
        backgroundColor: "#EEEEEE",
        transition: "0.5s",
      }}
    >
      {/* 리스트 */}
      <div ref={customHooks.topMain}></div>
      <ul class="postListing">{postListing}</ul>

      {/* Floating Bar */}
      <button
        class="border p-1"
        style={{
          width: "35px",
          height: "35px",
          marginBottom: "240px",
          color: `${customHooks.textColor}`,
          background: `${customHooks.color}`,
          borderRadius: "100%",
          boxShadow: "0 0 5px grey",
          position: "fixed",
          bottom: "0px",
          right: "24%",
        }}
        onClick={() => {
          customHooks.topMain.current?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <FontAwesomeIcon icon={faCaretUp} />
      </button>

      <button
        class="border p-1"
        style={{
          width: "35px",
          height: "35px",
          marginBottom: "200px",
          color: `${customHooks.textColor}`,
          background: `${customHooks.color}`,
          borderRadius: "100%",
          boxShadow: "0 0 5px grey",
          position: "fixed",
          bottom: "0px",
          right: "24%",
        }}
        onClick={() => {
          if (customHooks.filteringParameter == "LIKE") {
            customHooks.setFilteringParameter("");
          } else {
            customHooks.setFilteringParameter("LIKE");
          }
        }}
      >
        {customHooks.filteringParameter == "LIKE" ? (
          <FontAwesomeIcon icon={fasHeart} size="xs" />
        ) : (
          <FontAwesomeIcon icon={farHeart} size="xs" />
        )}
      </button>
      <button
        class="border p-1"
        style={{
          width: "35px",
          height: "35px",
          marginBottom: "160px",
          color: `${customHooks.textColor}`,
          background: `${customHooks.color}`,
          borderRadius: "100%",
          boxShadow: "0 0 5px grey",
          position: "fixed",
          bottom: "0px",
          right: "24%",
        }}
        onClick={() => {
          if (customHooks.filteringParameter == "BOOKMARK") {
            customHooks.setFilteringParameter("");
          } else {
            customHooks.setFilteringParameter("BOOKMARK");
          }
        }}
      >
        {customHooks.filteringParameter == "BOOKMARK" ? (
          <FontAwesomeIcon icon={fasBookmark} size="xs" />
        ) : (
          <FontAwesomeIcon icon={farBookmark} size="xs" />
        )}
      </button>
      <button
        class="border p-1"
        style={{
          width: "35px",
          height: "35px",
          marginBottom: "120px",
          color: `${customHooks.textColor}`,
          background: `${customHooks.color}`,
          borderRadius: "100%",
          boxShadow: "0 0 5px grey",
          position: "fixed",
          bottom: "0px",
          right: "24%",
        }}
      >
        <b>?</b>
      </button>

      <button
        class="border p-1"
        style={{
          width: "35px",
          height: "35px",
          marginBottom: "80px",
          color: `${customHooks.textColor}`,
          background: `${customHooks.color}`,
          borderRadius: "100%",
          boxShadow: "0 0 5px grey",
          position: "fixed",
          bottom: "0px",
          right: "24%",
        }}
      >
        <FontAwesomeIcon icon={faFilter} size="xs" />
      </button>
      {sideBarFormIcon}

      {/* form */}
      <div
        class="formBox absolute rounded-tr-3xl"
        style={{
          width: "600px",
          height: `${customHooks.formDisplay}`,
          overflow: "auto",
          bottom: "0",
          color: `${customHooks.textColor}`,
          backgroundColor: `${customHooks.color}`,
          transition: "0.5s",
        }}
      >
        <div
          class="flex justify-center items-center"
          style={{
            height: "18px",
          }}
        >
          <button
            onClick={() => {
              customHooks.setFormMode(!customHooks.formMode);
            }}
          >
            <FontAwesomeIcon icon={faAngleDown} />
          </button>
        </div>
        <article class="flex-col p-2 ">
          <form onSubmit={onSubmit}>
            <div class="flex items-center">
              {/* 카테고리 */}
              <span class="mx-2 ">
                {customHooks.inputCategory === 3 ? (
                  <FontAwesomeIcon icon={faDiceD6} />
                ) : customHooks.inputCategory === 2 ? (
                  <FontAwesomeIcon icon={faSquare} size="xs" />
                ) : customHooks.inputCategory === 1 ? (
                  <FontAwesomeIcon icon={faMinus} />
                ) : (
                  <FontAwesomeIcon icon={faCircle} size="2xs" />
                )}
              </span>
              {/* 텍스트 */}
              <textarea
                class="p-2 rounded-xl"
                style={{
                  height: `${
                    customHooks.formDisplay == "200px" ? "83px" : "300px"
                  }`,
                  width: "500px",
                  backgroundColor: `${customHooks.textColor}`,
                  color: `${customHooks.color}`,
                }}
                name="inputText"
                value={customHooks.inputContent}
                onChange={(e) => {
                  customHooks.setInputContent(e.target.value);
                }}
                autoComplete="off"
              />

              {/* 제출 버튼 */}
              <button class="mx-4" type="submit">
                <FontAwesomeIcon icon={faCircleChevronUp} size="xl" />
              </button>
            </div>

            {/* source */}
            <span class="mt-2" style={{ width: "530px" }}>
              <span class="mx-2">
                <FontAwesomeIcon icon={faQuoteLeft} />
              </span>
              <input
                class="rounded-xl px-2"
                style={{
                  width: "500px",
                  fontSize: "12px",
                  color: `${customHooks.color}`,
                  backgroundColor: `${customHooks.textColor}`,
                }}
                name="inputSource"
                placeholder="출처 입력 (책/URL/강사 등)"
                value={customHooks.inputSource}
                onChange={(e) => {
                  customHooks.setInputSource(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                  }
                }}
                autoComplete="off"
              />
            </span>
            <span class="relative">
              <button
                class="px-2"
                onClick={(e) => {
                  e.preventDefault();
                  customHooks.setInputLike(!customHooks.inputLike);
                }}
              >
                {customHooks.inputLike ? (
                  <FontAwesomeIcon icon={fasHeart} />
                ) : (
                  <FontAwesomeIcon icon={farHeart} />
                )}
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  customHooks.setInputBookmark(!customHooks.inputBookmark);
                }}
              >
                {customHooks.inputBookmark ? (
                  <FontAwesomeIcon icon={fasBookmark} />
                ) : (
                  <FontAwesomeIcon icon={farBookmark} />
                )}
              </button>
            </span>

            {/* 태그 */}
            <div class="" style={{ width: "550px" }}>
              <span class="mx-2">
                <FontAwesomeIcon icon={faHashtag} />
              </span>
              <span
                class="mt-1"
                style={{
                  bottom: "0px",
                }}
              >
                {/* input Tag List */}
                <span>
                  {customHooks.inputTagList.map((mTag, mIndex) => (
                    <button
                      class="mr-2 pr-1 rounded-xl border"
                      style={{
                        fontSize: "12px",
                        backgroundColor: `${customHooks.color}`,
                        color: `${customHooks.textColor}`,
                        borderColor: `${customHooks.textColor}`,
                        transition: "0.5s",
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        customHooks.setInputTagList(
                          customHooks.inputTagList.filter(
                            (fTag, fIndex) => fTag != mTag
                          )
                        );
                      }}
                    >
                      {mTag}
                    </button>
                  ))}
                </span>
                {/* tag 입력 시 입력 내용이 포함된 tag List 보여줌 */}
                <span class="relative">
                  <span
                    class="absolute rounded-lg px-2"
                    style={{
                      maxHeight: "90px",
                      width: "100px",
                      overflow: "auto",
                      bottom: "20px",
                      transition: "0.5s",
                      fontSize: "12px",
                      color: "black",
                      backgroundColor: "#EEEEEE",
                    }}
                  >
                    {customHooks.inputTag.length == 0 ? (
                      <div></div>
                    ) : (
                      <div>
                        {customHooks.tagList
                          .filter((fTag) => fTag.includes(customHooks.inputTag))
                          .map((mTag, mIndex) => (
                            <div>
                              <button
                                id="tagListHover"
                                class="flex w-full justify-items-start"
                                onClick={(e) => {
                                  e.preventDefault();
                                  if (customHooks.inputTagList.includes(mTag)) {
                                    customHooks.setInputTag("");
                                  } else {
                                    customHooks.setInputTagList([
                                      ...customHooks.inputTagList,
                                      mTag,
                                    ]);
                                    customHooks.setInputTag("");
                                  }
                                }}
                              >
                                {mTag}
                              </button>
                            </div>
                          ))}
                      </div>
                    )}
                  </span>

                  {/* tag 입력 input */}
                  <input
                    class="absolute rounded-xl px-2"
                    style={{
                      width: "100px",
                      bottom: "0px",
                      fontSize: "12px",
                      color: `${customHooks.color}`,
                      backgroundColor: `${customHooks.textColor}`,
                    }}
                    name="inputTag"
                    placeholder="tag 입력 (Enter)"
                    value={customHooks.inputTag}
                    onChange={(e) => {
                      customHooks.setInputTag(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Process") {
                        return;
                      }

                      if (e.code === "Enter") {
                        if (e.target.value.trim().length == 0) {
                          e.preventDefault();
                          return;
                        }

                        e.preventDefault();
                        if (customHooks.inputTagList.includes(e.target.value)) {
                          customHooks.setInputTag("");
                        } else {
                          customHooks.setInputTagList([
                            ...customHooks.inputTagList,
                            e.target.value,
                          ]);
                          customHooks.setInputTag("");
                        }
                      }
                    }}
                    autoComplete="off"
                  />
                </span>
              </span>
            </div>
          </form>
        </article>
      </div>
    </div>
  );
};

export default Main;
