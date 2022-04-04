import "./Main.css";
import "./SideBar.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import MobileStepper from "@mui/material/MobileStepper";
import dayjs from "dayjs";
import { CardActionArea, CardActions } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle,
  faCircleInfo,
  faDiceD6,
  faMinus,
  faQuoteLeft,
  faSquare,
  faHashtag,
  faHeart as fasHeart,
  faBookmark as fasBookmark,
  faCircleCheck,
  faCircleChevronLeft,
  faTrash,
  faT,
  faPenToSquare,
  faAngleRight,
  faAngleLeft,
  faCircleNodes,
  faQuoteRight,
} from "@fortawesome/free-solid-svg-icons";
import {
  faHeart as farHeart,
  faBookmark as farBookmark,
} from "@fortawesome/free-regular-svg-icons";

const SideBar = ({ customHooks }) => {
  const selectedPost = customHooks.selectedPostIds
    .map((mId) => customHooks.posts.findIndex((x) => x.postId === mId))
    .map((mIndex) => customHooks.posts[mIndex]);

  const onSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    if (form.inputText.value.trim().length == 0) {
      customHooks.setFormErrorSnackBarOpen(true);
      form.inputText.focus();
      return;
    }

    let postId = 0;
    if (customHooks.formState === "EDIT") {
      postId = customHooks.inputPostId;
    } else {
      postId = customHooks.lastPostId + 1;
      customHooks.setLastPostId(postId);
    }

    const newPost = {
      postId: postId,
      category: customHooks.inputCategory,
      title: customHooks.inputTitle,
      content: customHooks.inputContent,
      source: form.inputSource.value,
      tags: customHooks.inputTagList,
      like: customHooks.inputLike,
      bookmark: customHooks.inputBookmark,
      connectedPostIds: customHooks.selectedPostIds.sort(function (a, b) {
        return a - b;
      }),
      time: `${
        customHooks.formState === "EDIT" ? customHooks.inputTime : dayjs()
      }`,
    };

    if (customHooks.posts.some((x) => x.postId === postId)) {
      const copyPosts = [...customHooks.posts];
      const findIndex = customHooks.posts.findIndex(
        (e) => e.postId === newPost.postId
      );
      copyPosts[findIndex] = {
        ...copyPosts[findIndex],
        title: customHooks.inputTitle,
        content: customHooks.inputContent,
        source: form.inputSource.value,
        tags: customHooks.inputTagList,
        like: customHooks.inputLike,
        bookmark: customHooks.inputBookmark,
      };
      customHooks.setPosts(copyPosts);
    } else {
      customHooks.setPosts([...customHooks.posts, newPost]); // post 새 글 등록
    }

    customHooks.setInputCategory(0); // form 초기화
    customHooks.setInputTitle("");
    customHooks.setInputContent("");
    customHooks.setInputSource("");
    customHooks.setInputTag("");
    customHooks.setInputTagList([]);
    customHooks.setInputLike(false);
    customHooks.setInputBookmark(false);
    customHooks.setInputTime();
    customHooks.setInputConnectedPostIds([]);
    customHooks.setSelectedPostIds([]);
    customHooks.setFormMode(false);
  };

  const formOpen = (
    <div>
      {customHooks.selectedPostIds.length === 0 ? (
        <div
          class="highlight"
          style={{
            fontSize: "1.8rem",
            marginBottom: "2rem",
            marginLeft: "1rem",
          }}
        >
          <b>New Post</b>
        </div>
      ) : customHooks.selectedPostIds.length === 1 ? (
        <div class="flex items-end" style={{ height: "80px" }}>
          <button
            class={customHooks.editMode ? "underlining" : "highlight"}
            style={{
              fontSize: `${customHooks.editMode ? "1.3rem" : "1.8rem"}`,
              marginBottom: "2rem",
              marginLeft: "1rem",
              fontWeight: `${customHooks.editMode ? "normal" : "bold"}`,
              transition: "0.5s",
            }}
            onClick={() => {
              customHooks.setEditMode(false);
            }}
          >
            Connected Post
          </button>
          <button
            style={{
              fontSize: "1.3rem",
              marginBottom: "2rem",
              marginLeft: "0.5rem",
            }}
            onClick={() => {
              customHooks.setEditMode(!customHooks.editMode);
            }}
          >
            {customHooks.editMode ? (
              <FontAwesomeIcon icon={faAngleLeft} />
            ) : (
              <FontAwesomeIcon icon={faAngleRight} />
            )}
          </button>
          <button
            class={customHooks.editMode ? "highlight" : "underlining"}
            style={{
              fontSize: `${customHooks.editMode ? "1.8rem" : "1.3rem"}`,
              marginBottom: "2rem",
              marginLeft: "0.5rem",
              fontWeight: `${customHooks.editMode ? "bold" : "normal"}`,
              transition: "0.5s",
            }}
            onClick={() => {
              customHooks.setEditMode(true);
            }}
          >
            Edit Post
          </button>
        </div>
      ) : (
        <div
          class="highlight"
          style={{
            fontSize: "1.8rem",
            marginBottom: "2rem",
            marginLeft: "1rem",
          }}
        >
          <b>Connect Posts</b>
        </div>
      )}
      {customHooks.editMode ? (
        <form
          class="relative h-full"
          style={{
            maxWidth: "350px",
            zIndex: "1",
          }}
          onSubmit={onSubmit}
        >
          <div
            class="relative flex-col border__shadow w-full p-2 rounded-3xl"
            style={{
              color: `${customHooks.textColor}`,
              backgroundColor: `${customHooks.color}`,
              transition: "0.5s",
            }}
          >
            {/* 상단 : 뒤로가기 , 편집, 삭제, 제출 */}
            <div class="relative pb-5">
              &nbsp;
              <button
                class="absolute top-0 left-2"
                onClick={(e) => {
                  e.preventDefault();
                  customHooks.setSelectedPostIds([]);
                  customHooks.setFormMode(false);
                  customHooks.setFormState("NEW");
                }}
              >
                <p class="icon__hover">
                  <FontAwesomeIcon icon={faCircleChevronLeft} size="xl" />
                </p>
              </button>
              {customHooks.selectedPostIds.length != 1 ? (
                <div></div>
              ) : (
                <button
                  class="absolute top-0 right-12 "
                  onClick={(e) => {
                    // customHooks.setTempoPost(mPost);
                    e.preventDefault();
                    customHooks.setDeleteDialogOpen(true);
                  }}
                >
                  <p class="icon__hover">
                    <FontAwesomeIcon icon={faTrash} size="lg" />
                  </p>
                </button>
              )}
              {customHooks.deleteDialog}
              <button class="absolute top-0 right-2" type="submit">
                <p class="icon__hover">
                  <FontAwesomeIcon icon={faCircleCheck} size="xl" />
                </p>
              </button>
            </div>
            {/* 제목 */}
            {customHooks.inputCategory === 0 ? (
              <></>
            ) : (
              <div class="mb-4">
                <span class="box-border mx-2 w-5">
                  <FontAwesomeIcon icon={faT} size="sm" />
                </span>
                <input
                  class="rounded-xl px-2"
                  style={{
                    width: "80%",
                    color: "#2C272E",
                  }}
                  name="inputSource"
                  placeholder="제목"
                  value={customHooks.inputTitle}
                  onChange={(e) => {
                    customHooks.setInputTitle(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                    }
                  }}
                  autoComplete="off"
                />
              </div>
            )}

            {/* category, textarea */}
            <div class="flex items-center mb-4">
              {/* 카테고리 */}
              <span class="box-border mx-2 w-3">
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
                    customHooks.inputCategory === 3
                      ? "300px"
                      : customHooks.inputCategory === 2 ||
                        customHooks.inputCategory === 1
                      ? "200px"
                      : "100px"
                  }`,
                  width: "80%",
                  color: "#2C272E",
                }}
                name="inputText"
                placeholder="내용"
                value={customHooks.inputContent}
                onChange={(e) => {
                  customHooks.setInputContent(e.target.value);
                }}
                autoComplete="off"
              />
            </div>

            {/* source */}
            <div class="mb-2">
              <span class="mx-2">
                <FontAwesomeIcon icon={faQuoteLeft} />
              </span>
              <input
                class=" rounded-xl px-2"
                style={{
                  width: "80%",
                  fontSize: "12px",
                  color: "#2C272E",
                }}
                name="inputSource"
                placeholder="출처 입력 (링크, 책, 논문 등)"
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
            </div>

            {/* tag */}
            <div
              class="relative flex-nowrap overflow-y-auto pb-16"
              style={{ width: "90%", zIndex: "1" }}
            >
              <span class="mx-2">
                <FontAwesomeIcon icon={faHashtag} />
              </span>
              <span class=" mt-1">
                {/* input Tag List */}
                <span>
                  {customHooks.inputTagList.map((mTag) => (
                    <button
                      class="mr-2 pr-1 rounded-xl border"
                      style={{
                        fontSize: "12px",
                        backgroundColor: `${customHooks.textColor}`,
                        color: `${customHooks.color}`,
                        borderColor: `${customHooks.textColor}`,
                        transition: "0.5s",
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        customHooks.setInputTagList(
                          customHooks.inputTagList.filter(
                            (fTag) => fTag != mTag
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
                  {/* tag 입력 input */}
                  <input
                    class="absolute rounded-xl px-2"
                    style={{
                      width: "100px",
                      bottom: "0px",
                      color: "#2C272E ",
                      fontSize: "12px",
                    }}
                    name="inputTag"
                    placeholder="태그 (enter)"
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
                  <span
                    class="absolute rounded-lg px-2"
                    style={{
                      width: "100px",
                      top: "20px",
                      overflow: "auto",
                      maxHeight: "55px",
                      transition: "0.5s",
                      fontSize: "12px",
                      color: "#2C272E",
                      backgroundColor: "#FFFFFF",
                      zIndex: "1",
                    }}
                  >
                    {customHooks.inputTag.length == 0 ? (
                      <div></div>
                    ) : (
                      <div>
                        {customHooks.tagList
                          .filter((fTag) => fTag.includes(customHooks.inputTag))
                          .map((mTag, mIndex) => (
                            <div key={mIndex}>
                              <button
                                id="tagListHover"
                                class="flex-col w-full h-full justify-items-start"
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
                </span>
              </span>
            </div>
          </div>
          <span class="relative flex w-full pt-2">
            &nbsp;
            <button
              class="absolute"
              style={{ color: "red", left: "20px", bottom: 0 }}
              onClick={(e) => {
                e.preventDefault();
                customHooks.setInputLike(!customHooks.inputLike);
              }}
            >
              {customHooks.inputLike ? (
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
              onClick={(e) => {
                e.preventDefault();
                customHooks.setInputBookmark(!customHooks.inputBookmark);
              }}
            >
              {customHooks.inputBookmark ? (
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
              {customHooks.selectedPostIds.length === 1 ? (
                <p>
                  {dayjs(customHooks.inputTime).format(
                    "YYYY. MM. DD. HH:mm:ss"
                  )}
                </p>
              ) : (
                <p>{dayjs().format("YYYY. MM. DD. HH:mm:ss")}</p>
              )}
            </span>
          </span>
        </form>
      ) : (
        <div class="flex-col justify-center">
          {customHooks.inputConnectedPostIds.length === 0 ? (
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
            <div class="box-border pb-5 px-2">
              {customHooks.inputConnectedPostIds.map((mId, mIndex) => (
                <div class="box-border flex item__hover px-2 py-1">
                  {/* 카테고리 , line */}
                  <div class="flex-col justify-center">
                    <div class="text-gray-400">
                      {customHooks.posts.find((x) => x.postId === mId)
                        .category === 3 ? (
                        <FontAwesomeIcon icon={faDiceD6} />
                      ) : customHooks.posts.find((x) => x.postId === mId)
                          .category === 2 ? (
                        <FontAwesomeIcon icon={faSquare} size="xs" />
                      ) : customHooks.posts.find((x) => x.postId === mId)
                          .category === 1 ? (
                        <FontAwesomeIcon icon={faMinus} />
                      ) : (
                        <FontAwesomeIcon icon={faCircle} size="2xs" />
                      )}
                    </div>
                    {mIndex == customHooks.inputConnectedPostIds.length - 1 ? (
                      <div></div>
                    ) : (
                      <div class="line ml-1 border-l-2 border-gray-200"></div>
                    )}
                  </div>
                  {/* title, content */}
                  <div class="box-border flex-col w-full pl-4 ">
                    {customHooks.posts.find((x) => x.postId === mId).title ==
                    "" ? (
                      <div></div>
                    ) : (
                      <div
                        class="mb-2"
                        style={{
                          fontSize: "1.2rem",
                        }}
                      >
                        <b>
                          {
                            customHooks.posts.find((x) => x.postId === mId)
                              .title
                          }
                        </b>
                      </div>
                    )}

                    <div
                      class="mb-4"
                      style={{
                        fontSize: "1rem",
                      }}
                    >
                      {customHooks.posts.find((x) => x.postId === mId).content}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Posts to Connect */}
      {customHooks.selectedPostIds.length <= 1 ? (
        <div></div>
      ) : (
        <div>
          <div
            style={{
              fontSize: "1.5rem",
              marginTop: "3rem",
              marginLeft: "1rem",
            }}
          >
            <span>
              <FontAwesomeIcon icon={faCircleNodes} />
            </span>
            &nbsp;
            <b class="highlight">Posts to connect</b>
          </div>
          <div class="selectedposts__box border-box flex-col flex-wrap justify-items-center items-center p-1 mb-10">
            {customHooks.posts
              .filter((fPost) =>
                customHooks.selectedPostIds.includes(fPost.postId)
              )
              .map((mPost) => (
                <div>
                  <button
                    class="selectedposts item__hover border-box flex-col justify-center text-left w-full mt-2  mx-2 p-2 px-4"
                    onClick={() => {
                      customHooks.setSelectedPostIds(
                        customHooks.selectedPostIds.filter(
                          (fPostId) => fPostId != mPost.postId
                        )
                      );
                    }}
                  >
                    {/* category */}
                    <div
                      class="flex w-full text-left"
                      style={{
                        fontSize: "12px",
                        wordBreak: "break-all",
                      }}
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
                    </div>
                    {/* text */}
                    <div
                      class="flex w-full text-left"
                      style={{
                        fontSize: "12px",
                        wordBreak: "break-all",
                      }}
                    >
                      {mPost.content}
                    </div>
                    {/* tags */}
                    <div
                      class="flex flex-wrap justify-start"
                      style={{
                        wordBreak: "break-all",
                      }}
                    >
                      {mPost.tags.map((mTag, mIndex) => (
                        <div
                          class="mr-1 mt-1 px-1 rounded-2xl"
                          style={{
                            fontSize: "10px",
                            backgroundColor: "#2C272E",
                            color: "#EEEEEE",
                            transition: "0.5s",
                          }}
                        >
                          {mTag}
                        </div>
                      ))}
                    </div>
                  </button>
                  <hr />
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div style={{ position: "relative" }}>
      <div
        class="sidebar flex-col p-1"
        style={{
          color: "#2C272E",
        }}
      >
        {customHooks.formMode ? (
          formOpen
        ) : (
          <div
            class="pt-2"
            style={{
              paddingTop: "80px",
            }}
          >
            <Card sx={{ maxWidth: 250 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image="img/ukraine_flag.png"
                  alt="Ukraine"
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    You can save lives, no matter where in the world you are. A
                    simple donation. A few clicks on your keyboard. A message to
                    the right person. Everything you need to help Ukrainians in
                    their fight for peace and freedom – in one place.
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <a
                  href="https://war.ukraine.ua/"
                  target="_blank"
                  style={{
                    fontSize: "13px",
                    color: "#1C6DD0",
                    textDecoration: "underline",
                  }}
                >
                  Find out how you can help
                </a>
              </CardActions>
            </Card>
            <Card sx={{ maxWidth: 250 }} style={{ marginTop: "30px" }}>
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  <FontAwesomeIcon icon={faCircleInfo} />
                  &nbsp;
                  <b>Next update - Storming</b>
                  <br />
                  Here, you can storm your creative ideas.
                </Typography>
                <Typography>
                  <MobileStepper
                    style={{ marginTop: "5px" }}
                    variant="progress"
                    steps={10}
                    position="static"
                    activeStep={1}
                    sx={{ width: 240 }}
                  />
                </Typography>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default SideBar;
