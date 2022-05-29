import "css/Idea.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleUp,
  faHashtag,
  faMagnifyingGlass,
  faPlus,
  faQuoteLeft,
  faXmark,
  faCompass as fasCompass,
} from "@fortawesome/free-solid-svg-icons";
import {
  faThumbsUp,
  faCompass as farCompass,
} from "@fortawesome/free-regular-svg-icons";
import SuggestedIdeas from "../ideas/SuggestedIdeas";
import ColoredIdeaList from "./ColoredIdeaList";
import InputSourceTab from "./InputSourceTab";
import InputTagTab from "./InputTagTab";
import WritingBottomBar from "./WritingBottomBar";

const WritingBottom = ({
  formSource,
  setFormSource,
  formTag,
  setFormTag,
  formTags,
  setFormTags,
  getCategory,
  formCategory,
  selectedIdeas,
  setSelectedIdeas,
  tagList,
  formPublic,
  setFormPublic,
  sourceList,
  colorList,
  formConnectedIdeas,
  setFormConnectedIdeas,
  userContext,
  dbIdeas,
}) => {
  const [bottomItemChangeProps, setBottomItemChangeProps] = useState(0);
  const [viewIdea, setViewIdea] = useState();
  const sourceInput = useRef();
  const tagInput = useRef();
  let navigate = useNavigate();

  useEffect(() => {
    switch (bottomItemChangeProps) {
      case 1:
        sourceInput.current.focus();
        break;
      case 2:
        tagInput.current.focus();
        break;
    }
  }, [bottomItemChangeProps]);

  useEffect(() => {
    const tempoinputTagList = [];

    for (var a in selectedIdeas) {
      for (var b in selectedIdeas[a].tags) {
        if (tempoinputTagList.includes(selectedIdeas[a].tags[b])) {
        } else {
          tempoinputTagList.push(selectedIdeas[a].tags[b]);
        }
      }
    }

    setFormTags(tempoinputTagList);
  }, []);

  const onIdeaClick = (idea) => {
    setViewIdea(idea);
    navigate("/ideas/viewidea", { replace: true });
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
    <div className="w-screen fixed bottom-0 z-30">
      {bottomItemChangeProps === 0 && (
        <ColoredIdeaList
          formConnectedIdeas={formConnectedIdeas}
          colorList={colorList}
        />
      )}

      {bottomItemChangeProps === 1 && (
        <InputSourceTab
          sourceList={sourceList}
          formSource={formSource}
          setFormSource={setFormSource}
          sourceInput={sourceInput}
        />
      )}

      {bottomItemChangeProps === 2 && (
        <InputTagTab
          tagList={tagList}
          tagInput={tagInput}
          formTag={formTag}
          setFormTag={setFormTag}
          formTags={formTags}
          setFormTags={setFormTags}
        />
      )}

      {bottomItemChangeProps === 3 && formConnectedIdeas.length > 0 && (
        <>
          <ColoredIdeaList
            formConnectedIdeas={formConnectedIdeas}
            colorList={colorList}
          />
          <div className="opacity bg-stone-50 shadow-inner">
            <div className="relative pt-5 mb-2 text-center text-base font-black z-10">
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
                              <span className="font-black underline">
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
              </Slider>
            </div>
          </div>
        </>
      )}
      <WritingBottomBar
        bottomItemChangeProps={bottomItemChangeProps}
        setBottomItemChangeProps={setBottomItemChangeProps}
        getCategory={getCategory}
        formCategory={formCategory}
        formSource={formSource}
        formTags={formTags}
        formPublic={formPublic}
        setFormPublic={setFormPublic}
        formConnectedIdeas={formConnectedIdeas}
      />
    </div>
  );
};

export default WritingBottom;
