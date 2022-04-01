import "./HomePage.css";
import {} from "@fortawesome/free-regular-svg-icons";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
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
      <div ref={page1}></div>
      <div
        class="relative w-full flex justify-center items-center  font-bold"
        style={{
          height: "100vh",
        }}
      >
        <div
          class="disappearing4 absolute rounded-3xl bg-gray-800"
          style={{
            left: "13%",
            bottom: "14%",
            width: "500px",
            minHeight: "500px",
            marginTop: "80px",
          }}
        >
          <div class="p-5 mb-10 text-5xl">
            <b>title</b>
          </div>
          <div class="p-5 text-3xl">text</div>
        </div>
        <div
          class="disappearing3 absolute rounded-3xl bg-gray-600"
          style={{
            left: "12%",
            bottom: "12%",
            width: "500px",
            minHeight: "500px",
            marginTop: "80px",
          }}
        >
          <div class="p-5 mb-10 text-5xl">
            <b>title</b>
          </div>
          <div class="p-5 text-3xl">text</div>
        </div>
        <div
          class="disappearing2 absolute rounded-3xl bg-gray-400"
          style={{
            left: "11%",
            bottom: "10%",
            width: "500px",
            minHeight: "500px",
            marginTop: "80px",
          }}
        >
          <div class="p-5 mb-10 text-5xl">
            <b>title</b>
          </div>
          <div class="p-5 text-3xl">text</div>
        </div>
        <div
          class="disappearing1 absolute rounded-3xl bg-gray-200"
          style={{
            left: "10%",
            bottom: "8%",
            width: "500px",
            minHeight: "500px",
            marginTop: "80px",
          }}
        >
          <div class="p-5 mb-10 text-5xl">
            <b>title</b>
          </div>
          <div class="p-5 text-3xl">text</div>
        </div>
      </div>
      <div ref={page2}></div>
      <div
        class="w-full flex justify-center items-center text-5xl font-bold bg-yellow-200"
        style={{
          height: "100vh",
        }}
      >
        page2 😎
      </div>
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
