import "css/Idea.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import {
  faAngleDown,
  faAngleUp,
  faChevronUp,
  faHashtag,
  faPlus,
  faQuoteLeft,
  faRotateBack,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SelectedIdeasSlide from "./SelectedIdeasSlide";

const commonTags = [
  "경영",
  "경제",
  "국제",
  "정치",
  "사회",
  "과학",
  "기술",
  "IT",
  "환경",
  "역사",
  "주식",
  "부동산",
  "사업",
];

const BottomBar = ({
  formSource,
  setFormSource,
  setCategory,
  formCategory,
  selectedIdeas,
  setSelectedIdeas,
}) => {
  const [itemChangeProps, setItemChangeProps] = useState(0);
  const [viewIdea, setViewIdea] = useState();
  const sourceInput = useRef();
  const tagInput = useRef();
  let navigate = useNavigate();

  useEffect(() => {
    switch (itemChangeProps) {
      case 1:
        sourceInput.current.focus();
        break;
      case 2:
        tagInput.current.focus();
        break;
    }
  }, [itemChangeProps]);

  const itemChange = (e, props) => {
    e.preventDefault();
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
  const onSourceChange = (e) => {
    setFormSource(e.target.value);
  };

  const onIdeaClick = (idea) => {
    setViewIdea(idea);
    navigate("/ideas/viewidea", { replace: true });
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
    <div className="w-screen fixed bottom-0 bg-white z-30">
      {itemChangeProps === 1 && (
        <input
          className="opacity flex p-4 w-full shadow-inner"
          type="text"
          name="formSource"
          placeholder="출처..."
          autoComplete="off"
          value={formSource}
          onChange={onSourceChange}
          ref={sourceInput}
        />
      )}

      {itemChangeProps === 2 && (
        <div className="opacity flex-col border-box shadow-inner">
          <div className="p-4 flex flex-wrap">
            {commonTags.map((tag, index) => (
              <span
                key={index}
                className="border-box rounded-3xl border-2 mr-1 mb-1 px-3 py-1 text-xs shadow-sm duration-500 break-words"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex justify-between ">
            <input
              className="w-full p-4 shadow-inner"
              placeholder="태그..."
              ref={tagInput}
            />
            <button className="p-4 rounded bg-green-600 text-white">
              <FontAwesomeIcon icon={faPlus} size="xl" />
            </button>
          </div>
        </div>
      )}

      {itemChangeProps === 3 && selectedIdeas.length > 0 && (
        <div className="opacity bg-white shadow-inner">
          <div className="mx-16 pt-5 mb-2 text-center text-lg font-black z-10">
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
                      idea.text.length < 200 ? (
                        idea.text
                      ) : (
                        <>
                          {idea.text.substr(0, 200)}
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
                        {idea.text.length < 180 ? (
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
                        )}
                      </>
                    )}
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      )}

      {/* bottomBar */}
      <div className="flex justify-between items-center p-4 shadow-inner">
        <div className="flex gap-2 text-lg">
          <span className="border-box rounded-3xl border-2 mb-1 px-3 py-1 font-black text-sm shadow-sm duration-500">
            {setCategory(formCategory).icon}&nbsp;
            {setCategory(formCategory).label}
          </span>
          <button
            className={`${formSource.length > 0 ? "" : "text-stone-400"} px-4`}
            onClick={(e) => itemChange(e, 1)}
          >
            <FontAwesomeIcon icon={faQuoteLeft} />
          </button>
          <button
            className="text-stone-400 px-4"
            onClick={(e) => itemChange(e, 2)}
          >
            <FontAwesomeIcon icon={faHashtag} />
          </button>
        </div>
        {selectedIdeas.length > 0 && (
          <div className="flex justify-end items-center gap-2 ">
            <button
              className="text-lg font-black"
              onClick={(e) => itemChange(e, 3)}
            >
              연결된 아이디어
            </button>
            <span
              className={`${
                itemChangeProps === 3 && "rotate-180"
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

export default BottomBar;
