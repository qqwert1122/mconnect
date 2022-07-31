import { useState } from "react";
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faQuoteLeft,
  faQuoteRight,
  faAngleDown,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";

const SuggestedIdeas = ({
  userIdeas,
  ideaPrmtr,
  tagsPrmtr,
  itemChange,
  whatEdit,
  formConnectedIdeas,
  setFormConnectedIdeas,
  onIdeaClick,
  selectedIdeas,
  setSelectedIdeas,
  thumbsUp,
}) => {
  const [tagChangeProps, setTagChangeProps] = useState(
    tagsPrmtr.length > 0 && tagsPrmtr[0]
  );

  const onSuggestedTagClick = (e, tag) => {
    e.preventDefault();
    setTagChangeProps(tag);
  };

  const onIdeaSelect = (e, idea) => {
    e.preventDefault();
    if (whatEdit === undefined) {
      if (selectedIdeas.includes(idea)) {
        setSelectedIdeas(selectedIdeas.filter((idea) => idea != idea));
      } else {
        setSelectedIdeas([idea, ...selectedIdeas]);
      }
    } else {
      if (formConnectedIdeas.includes(idea)) {
        setFormConnectedIdeas(
          formConnectedIdeas.filter((_idea) => _idea != idea)
        );
      } else {
        setFormConnectedIdeas([idea, ...formConnectedIdeas]);
      }
    }
  };

  const filteredIdeas = userIdeas.filter(
    (idea) => idea.tags.includes(tagChangeProps) && idea.text !== ideaPrmtr.text
  );

  const sugtdSettings = {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToScroll: 1,
    centerMode: true,
    focusOnSelect: false,
    initialSlide: filteredIdeas[0],
  };

  return (
    <>
      <div className="flex justify-center pt-5 mb-2 z-10">
        {thumbsUp ? (
          <div className="text-base font-black">
            추천 &nbsp;
            <FontAwesomeIcon icon={faThumbsUp} />
          </div>
        ) : (
          <button
            className="text-base font-black"
            onClick={() => itemChange(1)}
          >
            추천 아이디어 &nbsp;
            <FontAwesomeIcon icon={faAngleDown} />
          </button>
        )}
      </div>
      <div className="p-5 flex flex-nowrap overflow-x-scroll">
        {tagsPrmtr.map((tag, index) => (
          <button
            key={index}
            className={`flex-grow-0 flex-shrink-0 border-box rounded-3xl border-2 mr-1 mb-1 px-3 py-1 text-xs shadow-sm duration-500 break-words ${
              tag === tagChangeProps ? "bg-stone-600 text-white" : "bg-white"
            }`}
            style={{ flexBasis: "auto" }}
            onClick={(e) => onSuggestedTagClick(e, tag)}
          >
            {tag}
          </button>
        ))}
      </div>
      <div className="relative pb-10">
        {filteredIdeas.length === 0 ? (
          <div
            className="flex justify-center items-center text-xl font-black "
            style={{ height: "248px" }}
          >
            <FontAwesomeIcon icon={faQuoteLeft} />
            &nbsp; 텅 &nbsp;
            <FontAwesomeIcon icon={faQuoteRight} />
          </div>
        ) : (
          <>
            <Slider {...sugtdSettings}>
              {filteredIdeas.map((idea, index) => (
                <div key={index}>
                  <div className="relative h-60 p-5 m-1 bg-white shadow rounded-3xl break-all">
                    <button
                      className={`absolute top-0 right-0 rounded-full ${
                        (whatEdit === undefined &&
                          selectedIdeas.includes(idea)) ||
                        (whatEdit !== undefined &&
                          formConnectedIdeas.includes(idea))
                          ? "bg-red-400 text-white"
                          : "border-2 border-stone-400"
                      } w-6 h-6`}
                      onClick={(e) => {
                        onIdeaSelect(e, idea);
                      }}
                    >
                      {whatEdit === undefined
                        ? selectedIdeas.includes(idea) && (
                            <FontAwesomeIcon icon={faCheck} />
                          )
                        : formConnectedIdeas.includes(idea) && (
                            <FontAwesomeIcon icon={faCheck} />
                          )}
                    </button>
                    <div
                      onClick={(e) => {
                        onIdeaClick(e, idea);
                      }}
                    >
                      {idea.title === "" ? (
                        idea.text.length < 180 ? (
                          idea.text
                        ) : (
                          <>
                            {idea.text.substr(0, 180)}
                            <span>...</span>
                            <span className="font-black underline">더보기</span>
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
                              <span className="font-black underline">
                                더보기
                              </span>
                            </>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </>
        )}
      </div>
    </>
  );
};

export default SuggestedIdeas;
