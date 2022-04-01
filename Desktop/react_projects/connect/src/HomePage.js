import "./HomePage.css";
import "./SideBar.css";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import {
  faAngleDown,
  faAngleUp,
  faCircle,
  faHeart as farHeart,
  faBookmark as farBookmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useRef, useEffect } from "react";

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

  return (
    <div
      class="w-screen relative"
      style={{
        height: "300vh",
      }}
    >
      {/* page 1 */}
      <div ref={page1}></div>
      <div
        class="relative w-full flex justify-center items-center  font-bold"
        style={{
          height: "100vh",
        }}
      >
        {/* post 4 */}
        <div
          class="boxshadow disappearing4 absolute rounded-3xl bg-gray-800 text-white"
          style={{
            left: "13%",
            bottom: "14%",
            width: "500px",
            minHeight: "500px",
            marginTop: "80px",
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
              src="img/lecture.jpg"
              alt="lecture"
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
              Lecture
            </div>
          </div>
        </div>
        {/* post 3 */}
        <div
          class="boxshadow disappearing3 absolute rounded-3xl bg-gray-600 text-white"
          style={{
            left: "12%",
            bottom: "12%",
            width: "500px",
            minHeight: "500px",
            marginTop: "80px",
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
              src="img/work.jpg"
              alt="work"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            <div
              class="box-border absolute p-2 text-2xl rounded-full bg-gray-800 text-white"
              style={{
                top: "30px",
                right: "30px",
              }}
            >
              Work
            </div>
          </div>
        </div>
        {/* post 2 */}
        <div
          class="boxshadow disappearing2 absolute rounded-3xl"
          style={{
            left: "11%",
            bottom: "10%",
            width: "500px",
            height: "500px",
            marginTop: "80px",
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
              src="img/video.png"
              alt="video"
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
              Video
            </div>
          </div>
        </div>
        {/* post 1 */}
        <div
          class="boxshadow disappearing1 absolute rounded-3xl"
          style={{
            left: "10%",
            bottom: "8%",
            width: "500px",
            height: "500px",
            marginTop: "80px",
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
              src="img/newspaper.png"
              alt="newspaper"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            <div
              class="box-border absolute p-2 text-2xl rounded-full bg-gray-800 text-white"
              style={{
                top: "30px",
                right: "30px",
              }}
            >
              News
            </div>
          </div>
        </div>

        {/* right*/}
        <div
          class="absolute text-5xl "
          style={{
            width: "600px",
            height: "500px",
            right: "15%",
            bottom: "10%",
            wordBreak: "break-word",
          }}
        >
          {/* message */}
          <p class="highlight mb-5">
            <b>Find</b>&nbsp;one-line ideas
          </p>
          <p class="pb-3 text-3xl">in news, videos, books, blogs,</p>
          <p class="pb-3 text-3xl">and anywhere in work, school, or project.</p>

          {/* form */}
          <div
            class="flex-col my-16 "
            style={{
              width: "500px",
              fontSize: "1.5rem",
            }}
          >
            <div
              class="item__hover main__post borderShadow flex p-2 rounded-3xl"
              style={{
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
                      <b>Word Break</b>
                    </div>
                    <div
                      style={{
                        fontSize: "1.2rem",
                        marginBottom: "0.5rem",
                      }}
                    >
                      텍스트가 자신의 콘텐츠 박스 밖으로 오버플로 할 때 줄을
                      바꿀 지 지정한다.
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
                    <a
                      target="_blank"
                      href="https://developer.mozilla.org/ko/docs/Web/CSS/word-break"
                    >
                      https://developer.mozilla.org/ko/docs/Web/CSS/word-break
                    </a>
                  </div>
                  {/* tag */}
                  <div class="flex flex-wrap justify-start ">
                    <button
                      class="mr-2 p-1 rounded-2xl"
                      style={{
                        fontSize: "0.9rem",
                        color: "#EEEEEE",
                        backgroundColor: "#2C272E",
                      }}
                    >
                      코딩
                    </button>
                    <button
                      class="mr-2 p-1 rounded-2xl"
                      style={{
                        fontSize: "0.9rem",
                        color: "#EEEEEE",
                        backgroundColor: "#2C272E",
                      }}
                    >
                      CSS
                    </button>
                  </div>
                </div>

                <button
                  class="absolute"
                  style={{
                    top: 0,
                    right: 0,
                  }}
                  variant="outlined"
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
                style={{
                  color: "red",
                  left: "20px",
                  bottom: 0,
                  fontSize: "1.2rem",
                }}
              >
                <p class="like__hover">
                  <FontAwesomeIcon icon={farHeart} />
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
                  <FontAwesomeIcon icon={farBookmark} />
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
                {dayjs().format("YYYY. MM. DD. HH:mm:ss")}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* page 2 */}
      <div ref={page2}></div>
      <div
        class="w-full flex justify-center items-center text-5xl font-bold bg-yellow-200"
        style={{
          height: "100vh",
        }}
      >
        page2 😎
      </div>

      {/* page 3 */}
      <div ref={page3}></div>
      <div
        class="w-full flex justify-center items-center text-5xl font-bold bg-green-200"
        style={{
          height: "100vh",
        }}
      >
        page3 😍
      </div>
      <button
        class="fixed flex justify-center items-center bottom-0 w-full h-32"
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
