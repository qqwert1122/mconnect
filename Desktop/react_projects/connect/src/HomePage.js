import "./HomePage.css";
import "./SideBar.css";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import {
  faHeart as fasHeart,
  faBookmark as fasBookmark,
} from "@fortawesome/free-regular-svg-icons";
import {
  faAngleDown,
  faAngleUp,
  faCircle,
  faHeart as farHeart,
  faBookmark as farBookmark,
  faMinus,
  faSquare,
  faPlus,
  faDiceD6,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useRef, useEffect } from "react";
import { Tag } from "@mui/icons-material";
import { maxWidth } from "@mui/system";
import zIndex from "@mui/material/styles/zIndex";

const form_1 = {
  title: "Word Break",
  content:
    "텍스트가 자신의 콘텐츠 박스 밖으로 오버플로 할 때 줄을 바꿀 지 지정한다.",
  source: "https://developer.mozilla.org/ko/docs/Web/CSS/word-break",
  tags: ["코딩", "CSS"],
  like: true,
  bookmark: true,
  time: "2022-02-17T13:24:00",
  large: true,
};

const form_2 = {
  title: "form 2",
  content:
    "텍스트가 자신의 콘텐츠 박스 밖으로 오버플로 할 때 줄을 바꿀 지 지정한다.",
  source: "https://developer.mozilla.org/ko/docs/Web/CSS/word-break",
  tags: ["코딩", "CSS"],
  like: true,
  bookmark: true,
  time: "2022-02-17T13:24:00",
  large: false,
};

const form_3 = {
  title: "form 3",
  content:
    "텍스트가 자신의 콘텐츠 박스 밖으로 오버플로 할 때 줄을 바꿀 지 지정한다.",
  source: "zz",
  tags: ["경영", "경제"],
  like: true,
  bookmark: false,
  time: "2022-02-23T15:21:13",
  large: false,
};

const form_4 = {
  title: "form 4",
  content:
    "텍스트가 자신의 콘텐츠 박스 밖으로 오버플로 할 때 줄을 바꿀 지 지정한다.",
  source: "https://developer.mozilla.org/ko/docs/Web/CSS/word-break",
  tags: ["코딩", "CSS"],
  like: true,
  bookmark: true,
  time: "2022-02-17T13:24:00",
  large: false,
};

const imgList = [
  {
    class: "disappearing4 boxshadow absolute flex rounded-3xl",
    src: "img/lecture.jpg",
    alt: "lecture",
    text: "Lecture",
  },
  {
    class: "disappearing3 boxshadow absolute flex rounded-3xl",
    src: "img/work.jpg",
    alt: "work",
    text: "Work",
  },
  {
    class: "disappearing2 boxshadow absolute flex rounded-3xl",
    src: "img/video.png",
    alt: "video",
    text: "Video",
  },
  {
    class: "disappearing1 boxshadow absolute flex rounded-3xl",
    src: "img/newspaper.png",
    alt: "newspaper",
    text: "Newspaper",
  },
];

const HomePage = ({ customHooks }) => {
  const page1 = useRef();
  const page2 = useRef();
  const page3 = useRef();
  const [viewPage, setViewPage] = useState(1);

  useEffect(() => {
    if (viewPage === 4) {
      setViewPage(1);
    }

    switch (viewPage) {
      case 1:
        page1.current?.scrollIntoView({
          behavior: "smooth",
        });
        break;
      case 2:
        page2.current?.scrollIntoView({
          behavior: "smooth",
        });
        break;
      case 3:
        page3.current?.scrollIntoView({
          behavior: "smooth",
        });
        break;
    }
  }, [viewPage]);

  const form = (props) => {
    return (
      <div
        class="flex-col"
        style={{
          width: "500px",
          fontSize: "1.5rem",
        }}
      >
        <div
          class="item__hover main__post borderShadow flex p-2 "
          style={{
            borderRadius: "3rem",
            color: "#2C272E",
            backgroundColor: "#FAFAFA",
          }}
        >
          <div class="relative flex w-full items-center ">
            {/* category */}
            <button
              class="flex justify-center items-center h-full"
              style={{
                width: "5%",
              }}
            >
              <FontAwesomeIcon icon={faCircle} />
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
              >
                <div
                  style={{
                    fontSize: "1.5rem",
                    marginBottom: "2rem",
                  }}
                >
                  <b>{props.title}</b>
                </div>
                <div
                  style={{
                    fontSize: "1.2rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  {props.content}
                </div>
              </button>
              {/* source */}
              <div
                class="flex-wrap mt-3 "
                style={{
                  fontSize: "1rem",
                  marginBottom: "0.5rem",
                }}
              >
                <a target="_blank" href={props.source}>
                  {props.source}
                </a>
              </div>
              {/* tag */}{" "}
              <div class="flex flex-wrap justify-start ">
                {props.tags.map((mTag) => (
                  <button
                    class="mr-2 p-1 rounded-2xl"
                    style={{
                      fontSize: "0.9rem",
                      color: "#EEEEEE",
                      backgroundColor: "#2C272E",
                    }}
                  >
                    {mTag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 하단 like, bookmark, timestamp */}
        {props.large ? (
          <div
            class="relative flex w-full pt-2"
            style={{
              color: "#2C272E",
            }}
          >
            &nbsp;
            <button
              class="absolute"
              style={{
                color: "red",
                left: "20px",
                bottom: 0,
                fontSize: "1.2rem",
              }}
            >
              <p class="like__hover">
                {props.like ? (
                  <FontAwesomeIcon icon={farHeart} />
                ) : (
                  <FontAwesomeIcon icon={fasHeart} />
                )}
              </p>
            </button>
            <button
              class="absolute"
              style={{
                color: "orange",
                left: "45px",
                bottom: 0,
                fontSize: "1.2rem",
              }}
            >
              <p class="bookmark__hover">
                {props.bookmark ? (
                  <FontAwesomeIcon icon={farBookmark} />
                ) : (
                  <FontAwesomeIcon icon={fasBookmark} />
                )}
              </p>
            </button>
            <span
              class="absolute"
              style={{
                bottom: 0,
                right: "20px",
                fontSize: "1.2rem",
              }}
            >
              {dayjs(props.time).format("YYYY. MM. DD. HH:mm:ss")}
            </span>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  };

  const imgForm = (props) => {
    return (
      <div
        class={props.class}
        style={{
          width: "100%",
        }}
      >
        <div
          class="relative text-5xl"
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <img
            class="rounded-3xl"
            src={props.src}
            alt={props.alt}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          <div
            class="box-border absolute p-2 text-2xl rounded-full bg-white text-gray-800"
            style={{
              top: "30px",
              right: "30px",
            }}
          >
            {props.text}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      class="w-screen relative"
      style={{
        height: "300vh",
        background: "linear-gradient(45deg, #BFFF00, #FFF44F)",
      }}
    >
      {/* page 1 */}
      <div ref={page1}></div>
      <div
        class="relative w-full flex justify-center items-center  font-bold"
        style={{
          height: "100vh",
          paddingTop: "80px",
        }}
      >
        <div class="relative h-full w-1/2 flex justify-center items-center">
          <div
            class="relative flex justify-center items-center "
            style={{ width: "500px", maxWidth: "100%", height: "500px" }}
          >
            {imgForm(imgList[0])}
            {imgForm(imgList[1])}
            {imgForm(imgList[2])}
            {imgForm(imgList[3])}
          </div>
        </div>

        {/* right*/}
        <div
          class="text-5xl w-1/2 my-auto"
          style={{
            wordBreak: "break-word",
          }}
        >
          {/* message */}
          <div class="home__highlight mb-5">
            <p class="relative " style={{ zIndex: "1" }}>
              <b>Find</b>&nbsp;one-line ideas
            </p>
          </div>
          <p class="pb-3 text-3xl">in news, videos, books, blogs,</p>
          <p class="pb-10 text-3xl">
            and anywhere in work, school, or project.
          </p>
          {form(form_1)}
        </div>
      </div>

      {/* page 2 */}
      <div ref={page2}></div>
      <div
        class="box-border w-full flex justify-center items-center text-5xl font-bold"
        style={{
          height: "100vh",
          paddingTop: "80px",
        }}
      >
        <div
          id="page2_left"
          class="thread__line relative flex items-center w-1/2 h-full "
        >
          <div class="flex-col justify-between content-between w-full h-full ">
            <div class="relative flex items-end w-full h-1/3">
              <div class="form__2 absolute">{form(form_2)}</div>
            </div>
            <div class="relative flex items-center w-full h-1/3">
              <div class="form__3 absolute">{form(form_3)}</div>
            </div>
            <div class="relative flex items-start w-full h-1/3 ">
              <div class="form__4 absolute">{form(form_4)}</div>
            </div>
          </div>
        </div>
        {/* right*/}

        <div
          class="text-5xl w-1/2 my-auto"
          style={{
            wordBreak: "break-word",
          }}
        >
          {/* message */}
          <div class=" home__highlight mb-5">
            <p class="relative" style={{ zIndex: "1" }}>
              <b>Connect</b>&nbsp;one line ideas
            </p>
          </div>
          <p class="pb-3 text-3xl">to come up with creative ideas</p>
          <p class="pb-10 text-3xl">
            and these ideas will be another line of ideas
          </p>

          <div
            class="text-2xl rounded-3xl border-white border-4 p-10 m-2"
            style={{ width: "450px" }}
          >
            <p class="mb-2">
              Connect &nbsp;
              <FontAwesomeIcon icon={faCircle} size="2xs" />
              &nbsp; and &nbsp;
              <FontAwesomeIcon icon={faCircle} size="2xs" />
              &nbsp; to form &nbsp;
              <FontAwesomeIcon icon={faMinus} size="" />
            </p>
            <p class="mb-2">
              Connect &nbsp;
              <FontAwesomeIcon icon={faMinus} size="" />
              &nbsp; and &nbsp;
              <FontAwesomeIcon icon={faMinus} size="" />
              &nbsp; to form &nbsp;
              <FontAwesomeIcon icon={faSquare} size="xs" />
            </p>
            <p>
              Connect &nbsp;
              <FontAwesomeIcon icon={faSquare} size="xs" />
              &nbsp; and &nbsp;
              <FontAwesomeIcon icon={faSquare} size="xs" />
              &nbsp; to form &nbsp;
              <FontAwesomeIcon icon={faDiceD6} size="" />
            </p>
          </div>
        </div>
      </div>

      {/* page 3 */}
      <div ref={page3}></div>
      <div
        class="w-full flex justify-center items-center text-5xl font-bold"
        style={{
          height: "100vh",
        }}
      >
        page3
      </div>
      <button
        class="fixed flex justify-center items-center bottom-0 w-full"
        style={{ height: "5rem" }}
        onClick={() => {
          setViewPage(viewPage + 1);

          console.log(viewPage);
        }}
      >
        {viewPage === 3 ? (
          <FontAwesomeIcon icon={faAngleUp} size="2xl" />
        ) : (
          <FontAwesomeIcon icon={faAngleDown} size="2xl" />
        )}
      </button>
    </div>
  );
};

export default HomePage;
