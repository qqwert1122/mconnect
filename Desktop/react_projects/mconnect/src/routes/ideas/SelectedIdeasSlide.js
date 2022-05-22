import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronUp,
  faChevronDown,
  faXmark,
  faArrowRotateLeft,
  faRotateBack,
} from "@fortawesome/free-solid-svg-icons";

const SelectedIdeasSlide = ({
  selectedIdeas,
  setSelectedIdeas,
  setViewIdea,
}) => {
  let navigate = useNavigate();
  // event handler
  const [isConnectToggleClicked, setIsConnectToggleClicked] = useState(false);

  const onIdeaClick = (idea) => {
    setViewIdea(idea);
    navigate("/ideas/viewidea", { replace: true });
  };
  const onConnectToggle = (e) => {
    e.preventDefault();
    setIsConnectToggleClicked(!isConnectToggleClicked);
  };
  const onXmarkClick = (e, index) => {
    e.preventDefault();
    setSelectedIdeas(selectedIdeas.filter((fIdea, fIndex) => fIndex != index));
  };

  const settings = {
    dots: true,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToScroll: 1,
    centerMode: true,
    focusOnSelect: true,
    initialSlide: 0,
  };
  return (
    <>
      <div
        className={`${
          isConnectToggleClicked ? "h-96" : "h-20"
        } shadow-lg bg-white duration-100`}
      >
        {!isConnectToggleClicked ? (
          <>
            <div className="mx-16 pt-5 mb-2 text-center font-black z-10">
              {selectedIdeas.length}개 선택됨
            </div>
            <button
              className="flex justify-center w-full mt-2"
              onClick={onConnectToggle}
            >
              <FontAwesomeIcon icon={faChevronDown} />
            </button>
          </>
        ) : (
          <>
            <div className="mx-16 pt-5 mb-2 text-center font-black z-10">
              선택된 아이디어
            </div>
            <div className="relative pb-10 ">
              <Slider {...settings}>
                {selectedIdeas.map((idea, index) => (
                  <div key={index}>
                    <div className="relative h-60 p-5 m-1 bg-stone-100 shadow-sm rounded-3xl break-all text-sm">
                      <button
                        className="absolute w-6 h-6 rounded-full border-2 border-stone-200 bg-white shadow right-0 top-0"
                        onClick={(e) => {
                          onXmarkClick(e, index);
                        }}
                      >
                        <FontAwesomeIcon icon={faXmark} />
                      </button>
                      {idea.title === "" ? (
                        idea.text.length < 180 ? (
                          idea.text
                        ) : (
                          <>
                            {idea.text.substr(0, 180)}
                            <span>...</span>
                            <span
                              className="font-black underline"
                              onClick={() => {
                                onIdeaClick(idea);
                              }}
                            >
                              더보기
                            </span>
                          </>
                        )
                      ) : (
                        <>
                          <div className="mb-2 font-black text-base">
                            {idea.title}
                          </div>
                          {idea.text.length < 140 ? (
                            idea.text
                          ) : (
                            <>
                              {idea.text.substr(0, 140)}
                              <span>...</span>
                              <span
                                className="font-black underline"
                                onClick={() => {
                                  onIdeaClick(idea);
                                }}
                              >
                                더보기
                              </span>
                            </>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
            <div>
              <button
                className="flex justify-center w-full py-2"
                onClick={onConnectToggle}
              >
                <FontAwesomeIcon icon={faChevronUp} />
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SelectedIdeasSlide;
