import SuggestedIdeas from "./SuggestedIdeas";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faQuoteLeft,
  faCompass as fasCompass,
  faHeart as fasHeart,
  faBookmark as fasBookmark,
  faAngleUp,
  faCircleNodes,
  faQuoteRight,
  faAngleDown,
  faXmark,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import {
  faCompass as farCompass,
  faHeart as farHeart,
  faBookmark as farBookmark,
  faThumbsUp,
} from "@fortawesome/free-regular-svg-icons";

const ViewIdeaBottomBar = ({
  dbIdeas,
  viewIdea,
  setViewIdea,
  getCategory,
  colorList,
  selectedIdeas,
  setSelectedIdeas,
}) => {
  const [itemChangeProps, setItemChangeProps] = useState(0);
  const itemChange = (props) => {
    switch (props) {
      case 1:
        if (itemChangeProps != 1) {
          setItemChangeProps(1);
        } else {
          setItemChangeProps(0);
        }
        break;
      case 2:
        if (itemChangeProps != 2) {
          setItemChangeProps(2);
        } else {
          setItemChangeProps(0);
        }
        break;
      case 3:
        if (itemChangeProps != 3) {
          setItemChangeProps(3);
        } else {
          setItemChangeProps(0);
        }
        break;
    }
  };
  let navigate = useNavigate();

  const onIdeaClick = (idea) => {
    setViewIdea(idea);
    navigate("/ideas/viewidea", { replace: true });
  };

  const settings = {
    dots: true,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToScroll: 1,
    centerMode: true,
    focusOnSelect: false,
    initialSlide: 0,
  };

  return (
    <div className="w-screen fixed bottom-0 z-30">
      {itemChangeProps === 0 && (
        <div className="opacity flex justify-end gap-2 p-3 ">
          {viewIdea.connectedIdeas.map((idea, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${
                colorList[index % colorList.length]
              }`}
            ></div>
          ))}
        </div>
      )}
      {itemChangeProps === 1 && (
        <div className="opacity bg-stone-50 shadow-inner">
          <SuggestedIdeas
            dbIdeas={dbIdeas}
            ideaPrmtr={viewIdea}
            tagsPrmtr={viewIdea.tags}
            itemChange={itemChange}
            onIdeaClick={onIdeaClick}
            selectedIdeas={selectedIdeas}
            setSelectedIdeas={setSelectedIdeas}
            thumbsUp={false}
          />
        </div>
      )}

      {itemChangeProps === 2 && viewIdea.connectedIdeas.length > 0 && (
        <div className="opacity bg-stone-50 shadow-inner">
          <div className="mx-16 pt-5 mb-2 text-center text-base font-black z-10">
            {viewIdea.connectedIdeas.length}개 연결됨
          </div>
          <div className="relative pb-10 ">
            <Slider {...settings}>
              {viewIdea.connectedIdeas.map((idea, index) => (
                <div key={index}>
                  <div className="h-60 p-5 m-1 bg-white shadow rounded-3xl break-all">
                    <div
                      onClick={() => {
                        onIdeaClick(idea);
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
          </div>
        </div>
      )}

      {/* bottomBar */}
      <div className="flex justify-between items-center p-2 shadow-inner bg-white">
        <div className="flex gap-2 text-lg">
          <span className="border-box rounded-3xl border-2 mb-1 px-3 py-1 font-black text-sm shadow-sm duration-500">
            {getCategory(viewIdea.category).icon}&nbsp;
            {getCategory(viewIdea.category).label}
          </span>
          <button
            className="px-2 text-base font-black"
            onClick={(e) => itemChange(1)}
          >
            추천 <FontAwesomeIcon icon={faThumbsUp} />
          </button>
        </div>

        {viewIdea.connectedIdeas.length > 0 && (
          <div className="flex justify-end items-center gap-2 ">
            <button
              className="text-base font-black"
              onClick={() => itemChange(2)}
            >
              연결된 아이디어
            </button>
            <span
              className={`${
                itemChangeProps === 2 && "rotate-180"
              } duration-500`}
            >
              <FontAwesomeIcon icon={faAngleUp} />
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewIdeaBottomBar;
