import "css/Animation.css";
import ColoredIdeaList from "./ColoredIdeaList";
import SuggestedIdeas from "routes/ideas/SuggestedIdeas";
import { useState } from "react";
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";

const RelatedIdeas = ({
  dbIdeas,
  setNavValue,
  userContext,
  formConnectedIdeas,
  setFormConnectedIdeas,
  formTags,
  colorList,
  selectedIdeas,
  setSelectedIdeas,
  setViewIdea,
}) => {
  const [tabs, setTabs] = useState(0);

  const ontabsClick = () => {
    switch (tabs) {
      case 0:
        setTabs(1);
        break;
      case 1:
        setTabs(0);
        break;
    }
  };

  const onIdeaClick = (e, idea) => {
    e.preventDefault();
    setViewIdea(idea);
    setNavValue("/ideas/viewidea");
  };

  const onXmarkClick = (e, index) => {
    e.preventDefault();
    switch (userContext) {
      case 0:
        setSelectedIdeas(
          selectedIdeas.filter((fIdea, fIndex) => fIndex != index)
        );
        break;
      case 1:
      case 2:
        setFormConnectedIdeas(
          formConnectedIdeas.filter((fIdea, fIndex) => fIndex != index)
        );
    }
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
    <div className="relative">
      {tabs === 0 && (
        <button
          className="absolute left-2 top-0 p-1 px-2 bg-green-600 text-white font-black rounded-xl z-10"
          onClick={ontabsClick}
        >
          추천 아이디어 &nbsp;
          <FontAwesomeIcon icon={faRightToBracket} />
        </button>
      )}

      {tabs === 1 && (
        <button
          className="absolute left-2 top-0 p-1 px-2 bg-green-600 text-white font-black rounded-xl z-10"
          onClick={ontabsClick}
        >
          연결된 아이디어&nbsp;
          <FontAwesomeIcon icon={faRightToBracket} />
        </button>
      )}
      <ColoredIdeaList ideas={formConnectedIdeas} colorList={colorList} />

      <div className=" bg-stone-50 shadow-inner">
        {tabs === 0 && (
          <>
            <div className=" relative pt-5 mb-2 text-center text-base font-black z-10">
              {formConnectedIdeas.length}개 선택됨
            </div>
            <div className="relative pb-10 ">
              <Slider {...settings}>
                {formConnectedIdeas.map((idea, index) => (
                  <div key={index}>
                    <div className="relative h-60 p-5 m-1 bg-white shadow rounded-3xl break-all">
                      <button
                        className="absolute w-6 h-6 rounded-full border-2 border-stone-200 bg-white shadow right-0 top-0"
                        onClick={(e) => {
                          onXmarkClick(e, index);
                        }}
                      >
                        <FontAwesomeIcon icon={faXmark} />
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
                            <>{idea.text.substr(0, 180)}...</>
                          )
                        ) : (
                          <>
                            <div className="mb-2 font-black text-base">
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
        {tabs === 1 && (
          <>
            <SuggestedIdeas
              dbIdeas={dbIdeas}
              ideaPrmtr={formConnectedIdeas}
              tagsPrmtr={formTags}
              itemChange=""
              onIdeaClick={onIdeaClick}
              selectedIdeas={selectedIdeas}
              setSelectedIdeas={setSelectedIdeas}
              thumbsUp={true}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default RelatedIdeas;
