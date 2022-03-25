import "./Main.css";
import "./SideBar.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import MobileStepper from "@mui/material/MobileStepper";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle,
  faCircleChevronUp,
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
} from "@fortawesome/free-solid-svg-icons";
import {
  faHeart as farHeart,
  faBookmark as farBookmark,
} from "@fortawesome/free-regular-svg-icons";

const SideBar = ({ customHooks }) => {
  const onSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    form.inputText.value = form.inputText.value.trim();

    if (form.inputText.value.trim().length == 0) {
      customHooks.setFormErrorSnackBarOpen(true);
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

  return (
    <div style={{ position: "relative", height: "100vh" }}>
      <div
        class="sidebar flex-col p-1"
        style={{
          color: "#2C272E",
          backgroundColor: "#ffffff",
          // backgroundColor: `${customHooks.color}`,
        }}
      >
        {/* 메뉴 layout */}
        {customHooks.selectedPostIds.length === 0 ? (
          <div class="pt-2">
            <Card sx={{ maxWidth: 345 }}>
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
            <Card sx={{ minWidth: 242 }} style={{ marginTop: "30px" }}>
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  <FontAwesomeIcon icon={faCircleInfo} />
                  &nbsp;
                  <b>Next update - Thread</b>
                  <br />
                  Here, you can find out what kind of notes are connected to
                  create this idea.
                </Typography>
                <Typography>
                  <MobileStepper
                    style={{ marginTop: "5px" }}
                    variant="progress"
                    steps={10}
                    position="static"
                    activeStep={5}
                    sx={{ width: 240 }}
                  />
                </Typography>
              </CardContent>
            </Card>
          </div>
        ) : customHooks.selectedPostIds.length === 1 ? (
          <form class="h-full bg-red-400" onSubmit={onSubmit}>
            <div
              class="flex-col border__shadow w-full p-2 rounded-3xl"
              style={{
                color: `${customHooks.textColor}`,
                backgroundColor: `${customHooks.color}`,
                transition: "0.5s",
              }}
            >
              {/* 상단 : 뒤로가기 , 삭제, 제출 */}
              <div class="relative mb-5">
                &nbsp;
                <button
                  class="absolute top-0 left-2"
                  type="submit"
                  onClick={() => {
                    customHooks.setSelectedPostIds([]);
                  }}
                >
                  <FontAwesomeIcon icon={faCircleChevronLeft} size="xl" />
                </button>
                <button class="absolute top-0 right-12 " type="submit">
                  <FontAwesomeIcon icon={faTrash} size="lg" />
                </button>
                <button class="absolute top-0 right-2" type="submit">
                  <FontAwesomeIcon icon={faCircleCheck} size="xl" />
                </button>
              </div>
              {/* 제목 */}
              <div class="mb-4">
                <span class="mx-2">
                  <FontAwesomeIcon icon={faT} />
                </span>
                <input
                  class="rounded-xl px-2"
                  style={{
                    width: "80%",
                    color: "#2C272E",
                  }}
                  name="inputSource"
                  placeholder="제목"
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

              {/* category, textarea */}
              <div class="flex items-center mb-4">
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
                    height: "100px",
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
                  class="rounded-xl px-2"
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
                class="flex-nowrap overflow-y-auto mb-5"
                style={{ width: "90%" }}
              >
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
                          backgroundColor: `${customHooks.textColor}`,
                          color: `${customHooks.color}`,
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
                  <span class="relative bg-red-400">
                    &nbsp;
                    <span
                      class="absolute rounded-lg px-2"
                      style={{
                        width: "100px",
                        bottom: "-20px",
                        overflow: "auto",
                        transition: "0.5s",
                        fontSize: "12px",
                        color: "#2C272E",
                        backgroundColor: `${customHooks.textColor}`,
                        zIndex: "1",
                      }}
                    >
                      {customHooks.inputTag.length == 0 ? (
                        <div></div>
                      ) : (
                        <div>
                          {customHooks.tagList
                            .filter((fTag) =>
                              fTag.includes(customHooks.inputTag)
                            )
                            .map((mTag, mIndex) => (
                              <div>
                                <button
                                  id="tagListHover"
                                  class="flex w-full justify-items-start"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    if (
                                      customHooks.inputTagList.includes(mTag)
                                    ) {
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
                        color: "#2C272E ",
                        fontSize: "12px",
                      }}
                      name="inputTag"
                      placeholder="Tag (enter)"
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
                          if (
                            customHooks.inputTagList.includes(e.target.value)
                          ) {
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
                  <FontAwesomeIcon icon={fasHeart} />
                ) : (
                  <FontAwesomeIcon icon={farHeart} />
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
                2022. 3. 25. 19:09
              </span>
            </span>
          </form>
        ) : (
          // <form class="flex-col p-2" onSubmit={onSubmit}>
          //   <div class="flex items-center">
          //     {/* 카테고리 */}
          //     <span class="mx-2 ">
          //       {customHooks.inputCategory === 3 ? (
          //         <FontAwesomeIcon icon={faDiceD6} />
          //       ) : customHooks.inputCategory === 2 ? (
          //         <FontAwesomeIcon icon={faSquare} size="xs" />
          //       ) : customHooks.inputCategory === 1 ? (
          //         <FontAwesomeIcon icon={faMinus} />
          //       ) : (
          //         <FontAwesomeIcon icon={faCircle} size="2xs" />
          //       )}
          //     </span>
          //     {/* 텍스트 */}
          //     <textarea
          //       class="p-2 rounded-xl"
          //       style={{
          //         height: "100px",
          //         width: "80%",
          //         backgroundColor: `${customHooks.textColor}`,
          //         color: `${customHooks.color}`,
          //       }}
          //       name="inputText"
          //       value={customHooks.inputContent}
          //       onChange={(e) => {
          //         customHooks.setInputContent(e.target.value);
          //       }}
          //       autoComplete="off"
          //     />

          //     {/* 제출 버튼 */}
          //     <button class="mx-4" type="submit">
          //       <FontAwesomeIcon icon={faCircleChevronUp} size="xl" />
          //     </button>
          //   </div>

          //   {/* source */}
          //   <span class="mt-2" style={{ width: "80%" }}>
          //     <span class="mx-2">
          //       <FontAwesomeIcon icon={faQuoteLeft} />
          //     </span>
          //     <input
          //       class="rounded-xl px-2"
          //       style={{
          //         width: "70%",
          //         fontSize: "12px",
          //         color: `${customHooks.color}`,
          //         backgroundColor: `${customHooks.textColor}`,
          //       }}
          //       name="inputSource"
          //       placeholder="출처 입력 (type: 링크, 책, 논문 등)"
          //       value={customHooks.inputSource}
          //       onChange={(e) => {
          //         customHooks.setInputSource(e.target.value);
          //       }}
          //       onKeyDown={(e) => {
          //         if (e.key === "Enter") {
          //           e.preventDefault();
          //         }
          //       }}
          //       autoComplete="off"
          //     />
          //   </span>
          //   <span class="relative">
          //     <button
          //       class="px-2"
          //       onClick={(e) => {
          //         e.preventDefault();
          //         customHooks.setInputLike(!customHooks.inputLike);
          //       }}
          //     >
          //       {customHooks.inputLike ? (
          //         <FontAwesomeIcon icon={fasHeart} />
          //       ) : (
          //         <FontAwesomeIcon icon={farHeart} />
          //       )}
          //     </button>
          //     <button
          //       onClick={(e) => {
          //         e.preventDefault();
          //         customHooks.setInputBookmark(!customHooks.inputBookmark);
          //       }}
          //     >
          //       {customHooks.inputBookmark ? (
          //         <FontAwesomeIcon icon={fasBookmark} />
          //       ) : (
          //         <FontAwesomeIcon icon={farBookmark} />
          //       )}
          //     </button>
          //   </span>

          //   {/* 태그 */}
          //   <div class="flex-nowrap overflow-y-auto" style={{ width: "90%" }}>
          //     <span class="mx-2">
          //       <FontAwesomeIcon icon={faHashtag} />
          //     </span>
          //     <span
          //       class="mt-1"
          //       style={{
          //         bottom: "0px",
          //       }}
          //     >
          //       {/* input Tag List */}
          //       <span>
          //         {customHooks.inputTagList.map((mTag, mIndex) => (
          //           <button
          //             class="mr-2 pr-1 rounded-xl border"
          //             style={{
          //               fontSize: "12px",
          //               backgroundColor: `${customHooks.color}`,
          //               color: `${customHooks.textColor}`,
          //               borderColor: `${customHooks.textColor}`,
          //               transition: "0.5s",
          //             }}
          //             onClick={(e) => {
          //               e.preventDefault();
          //               customHooks.setInputTagList(
          //                 customHooks.inputTagList.filter(
          //                   (fTag, fIndex) => fTag != mTag
          //                 )
          //               );
          //             }}
          //           >
          //             {mTag}
          //           </button>
          //         ))}
          //       </span>
          //       {/* tag 입력 시 입력 내용이 포함된 tag List 보여줌 */}
          //       <span class="relative">
          //         <span
          //           class="absolute rounded-lg px-2"
          //           style={{
          //             maxHeight: "90px",
          //             width: "100px",
          //             overflow: "auto",
          //             bottom: "20px",
          //             transition: "0.5s",
          //             fontSize: "12px",
          //             color: "black",
          //             backgroundColor: "#EEEEEE",
          //           }}
          //         >
          //           {customHooks.inputTag.length == 0 ? (
          //             <div></div>
          //           ) : (
          //             <div>
          //               {customHooks.tagList
          //                 .filter((fTag) => fTag.includes(customHooks.inputTag))
          //                 .map((mTag, mIndex) => (
          //                   <div>
          //                     <button
          //                       id="tagListHover"
          //                       class="flex w-full justify-items-start"
          //                       onClick={(e) => {
          //                         e.preventDefault();
          //                         if (customHooks.inputTagList.includes(mTag)) {
          //                           customHooks.setInputTag("");
          //                         } else {
          //                           customHooks.setInputTagList([
          //                             ...customHooks.inputTagList,
          //                             mTag,
          //                           ]);
          //                           customHooks.setInputTag("");
          //                         }
          //                       }}
          //                     >
          //                       {mTag}
          //                     </button>
          //                   </div>
          //                 ))}
          //             </div>
          //           )}
          //         </span>

          //         {/* tag 입력 input */}
          //         <input
          //           class="absolute rounded-xl px-2"
          //           style={{
          //             width: "100px",
          //             bottom: "0px",
          //             fontSize: "12px",
          //             color: `${customHooks.color}`,
          //             backgroundColor: `${customHooks.textColor}`,
          //           }}
          //           name="inputTag"
          //           placeholder="tag 입력 (Enter)"
          //           value={customHooks.inputTag}
          //           onChange={(e) => {
          //             customHooks.setInputTag(e.target.value);
          //           }}
          //           onKeyDown={(e) => {
          //             if (e.key === "Process") {
          //               return;
          //             }

          //             if (e.code === "Enter") {
          //               if (e.target.value.trim().length == 0) {
          //                 e.preventDefault();
          //                 return;
          //               }

          //               e.preventDefault();
          //               if (customHooks.inputTagList.includes(e.target.value)) {
          //                 customHooks.setInputTag("");
          //               } else {
          //                 customHooks.setInputTagList([
          //                   ...customHooks.inputTagList,
          //                   e.target.value,
          //                 ]);
          //                 customHooks.setInputTag("");
          //               }
          //             }
          //           }}
          //           autoComplete="off"
          //         />
          //       </span>
          //     </span>
          //   </div>
          // </form>
          <div class="selectedposts__box border-box flex-col flex-wrap justify-items-center items-center p-1 ">
            {customHooks.posts
              .filter((fPost) =>
                customHooks.selectedPostIds.includes(fPost.postId)
              )
              .map((mPost) => (
                <div>
                  <button
                    class="selectedposts border-box flex-col justify-center text-left mt-2  mx-2 p-2 px-4 rounded-3xl"
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
                      {mPost.text}
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
        )}
      </div>
    </div>
  );
};

export default SideBar;
