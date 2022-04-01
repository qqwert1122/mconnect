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
        class="w-full flex justify-center items-center text-5xl font-bold bg-red-200"
        style={{
          height: "100vh",
        }}
      >
        page1 😚
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
