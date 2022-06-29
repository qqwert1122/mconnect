import { useState } from "react";
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faXmark } from "@fortawesome/free-solid-svg-icons";

const SelectedIdeasSlide = ({
  setNavValue,
  selectedIdeas,
  setSelectedIdeas,
  setViewIdea,
  isViewDetailsClicked,
  setIsViewDetailsClicked,
}) => {
  // event handler

  const onIdeaClick = (idea) => {
    setViewIdea(idea);
    setNavValue("/ideas/viewidea");
  };

  const onViewDetailsClick = (e) => {
    e.preventDefault();
    setIsViewDetailsClicked((prev) => !prev);
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
          isViewDetailsClicked ? "h-96" : "h-20"
        } shadow-lg bg-white duration-100`}
      >
        {isViewDetailsClicked === false ? (
          <>
            <div className="mx-16 pt-5 mb-2 text-center font-black z-10">
              {selectedIdeas.length}개 선택됨
            </div>
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
                    <div className="relative h-60 p-5 m-1 mx-2 bg-stone-100 shadow-md rounded-3xl break-all text-sm">
                      <button
                        className="absolute w-6 h-6 rounded-full border-2 border-stone-200 bg-white shadow right-0 top-0"
                        onClick={(e) => {
                          onXmarkClick(e, index);
                        }}
                      >
                        <FontAwesomeIcon icon={faXmark} />
                      </button>
                      <div onClick={() => onIdeaClick(idea)}>
                        {idea.title === "" ? (
                          idea.text.length < 180 ? (
                            idea.text
                          ) : (
                            <>{idea.text.substr(0, 180)}...</>
                          )
                        ) : (
                          <>
                            <div className="mb-2 font-black text-sm">
                              {idea.title}
                            </div>
                            {idea.text.length < 140 ? (
                              idea.text
                            ) : (
                              <>{idea.text.substr(0, 140)}...</>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </>
        )}
        <button
          className={`flex mx-auto p-2 px-10 mt-2 ${
            isViewDetailsClicked && "rotate-180"
          }`}
          onClick={onViewDetailsClick}
        >
          <FontAwesomeIcon icon={faChevronDown} />
        </button>
      </div>
    </>
  );
};

export default SelectedIdeasSlide;
