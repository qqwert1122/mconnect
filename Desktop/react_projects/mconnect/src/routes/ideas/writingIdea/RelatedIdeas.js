import "css/Animation.css";
import ColoredIdeaList from "./ColoredIdeaList";
import SuggestedIdeas from "routes/ideas/SuggestedIdeas";
import { useState } from "react";
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faQuoteLeft,
  faRightToBracket,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { Avatar } from "@mui/material";

const RelatedIdeas = ({
  userIdeas,
  whatEdit,
  navigate,
  formConnectedIdeas,
  setFormConnectedIdeas,
  formTags,
  colorList,
  selectedIdeas,
  setSelectedIdeas,
  setWhatView,
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
    setWhatView(idea);
    navigate(`/${idea.id}`);
  };

  const onXmarkClick = (e, index) => {
    e.preventDefault();
    setFormConnectedIdeas(
      formConnectedIdeas.filter((fIdea, fIndex) => fIndex != index)
    );
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
    <div className="moveRightToLeft relative">
      <div
        className="flex items-center justify-between"
        style={{
          minHeight: "36px",
        }}
      >
        {tabs === 0 && (
          <button
            className={` ${
              formConnectedIdeas.length < 2 && "animate-bounce"
            } m-2 p-1 px-2 bg-green-600 text-white font-black rounded-xl z-10`}
            onClick={ontabsClick}
          >
            추천 아이디어 &nbsp;
            <FontAwesomeIcon icon={faRightToBracket} />
          </button>
        )}

        {tabs === 1 && (
          <button
            className="m-2 p-1 px-2 bg-green-600 text-white font-black rounded-xl z-10"
            onClick={ontabsClick}
          >
            연결된 아이디어&nbsp;
            <FontAwesomeIcon icon={faRightToBracket} />
          </button>
        )}
        <ColoredIdeaList ideas={formConnectedIdeas} colorList={colorList} />
      </div>

      <div className=" bg-stone-50 shadow-inner">
        {tabs === 0 && (
          <>
            <div className=" relative pt-5 mb-2 text-center text-base font-black z-10">
              {formConnectedIdeas.length}개 선택됨
            </div>
            {formConnectedIdeas.length > 0 ? (
              <div className="relative pb-10 ">
                <Slider {...settings}>
                  {formConnectedIdeas.map((idea, index) => (
                    <div key={index}>
                      <div className="relative h-60 p-5 m-1 bg-white shadow rounded-3xl text-xs break-all">
                        <button
                          className="absolute w-6 h-6 rounded-full border-2 border-stone-200 bg-white shadow right-0 top-0"
                          onClick={(e) => {
                            onXmarkClick(e, index);
                          }}
                        >
                          <FontAwesomeIcon icon={faXmark} />
                        </button>
                        <div
                          className="text-xs"
                          onClick={(e) => {
                            onIdeaClick(e, idea);
                          }}
                        >
                          {idea.title === "" ? (
                            <>
                              {idea.text.length <
                              (idea.source.length > 0 ? 140 : 180) ? (
                                <div className="mb-3">{idea.text}</div>
                              ) : (
                                <div className="mb-3">
                                  {idea.text.substr(
                                    0,
                                    idea.source.length > 0 ? 140 : 180
                                  )}
                                  <span>...</span>
                                  <span className="font-black underline">
                                    더보기
                                  </span>
                                </div>
                              )}
                              {idea.source.length > 0 && (
                                <div className="ml-2 mb-1 flex gap-1 text-stone-400">
                                  <FontAwesomeIcon icon={faQuoteLeft} />
                                  <span>{idea.source}</span>
                                </div>
                              )}
                            </>
                          ) : (
                            <>
                              {idea.title.length <
                              (idea.source.length > 0 ? 15 : 30) ? (
                                <div className="mb-2 font-black break-all text-sm">
                                  {idea.title}
                                </div>
                              ) : (
                                <div className="mb-2 font-black text-sm">
                                  {idea.title.substr(
                                    0,
                                    idea.source.length > 0 ? 15 : 30
                                  )}
                                  <span>...</span>
                                </div>
                              )}
                              {idea.text.length < 140 ? (
                                <div className="mb-3">idea.text</div>
                              ) : (
                                <div className="mb-3">
                                  {idea.text.substr(0, 140)}
                                  <span>...</span>
                                  <span className="font-black underline">
                                    더보기
                                  </span>
                                </div>
                              )}
                              {idea.source.length > 0 && (
                                <div className="ml-2 mb-1 flex gap-1 text-stone-400">
                                  <FontAwesomeIcon icon={faQuoteLeft} />
                                  <span>{idea.source}</span>
                                </div>
                              )}
                            </>
                          )}
                        </div>
                        <div className="absolute bottom-4 left-4 flex items-center gap-2 text-xs">
                          <Avatar
                            className="border-2"
                            alt="avatar"
                            src={idea.userPhotoURL}
                            sx={{
                              display: "flex",
                              width: "25px",
                              height: "25px",
                            }}
                          />
                          <div className="flex-col">
                            <span className="flex">{idea.userName}</span>
                            <span className="flex text-stone-400">
                              {idea.createdAt}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            ) : (
              <div className="py-10 flex justify-center text-base font-black text-gray-400 ">
                새 아이디어를 추가하세요✏️
              </div>
            )}
          </>
        )}
        {tabs === 1 && (
          <>
            <SuggestedIdeas
              userIdeas={userIdeas}
              ideaPrmtr={formConnectedIdeas}
              tagsPrmtr={formTags}
              itemChange=""
              whatEdit={whatEdit}
              formConnectedIdeas={formConnectedIdeas}
              setFormConnectedIdeas={setFormConnectedIdeas}
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
