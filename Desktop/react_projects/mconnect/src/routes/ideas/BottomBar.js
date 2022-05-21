import "css/Idea.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Stack from "@mui/material/Stack";
import Slider from "react-slick";
import {
  faAngleDown,
  faAngleUp,
  faChevronUp,
  faHashtag,
  faMagnifyingGlass,
  faPlus,
  faQuoteLeft,
  faRotateBack,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SelectedIdeasSlide from "./SelectedIdeasSlide";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";

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

const colorList = [
  "bg-red-400",
  "bg-orange-400",
  "bg-amber-400",
  "bg-yellow-400",
  "bg-lime-400",
  "bg-green-400",
  "bg-emerald-400",
  "bg-teal-400",
  "bg-cyan-400",
  "bg-sky-400",
  "bg-blue-400",
  "bg-indigo-400",
  "bg-violet-400",
  "bg-purple-400",
  "bg-fuchsia-400",
  "bg-pink-400",
  "bg-rose-400",
];

const BottomBar = ({
  formSource,
  setFormSource,
  formTag,
  setFormTag,
  formTags,
  setFormTags,
  setCategory,
  formCategory,
  selectedIdeas,
  setSelectedIdeas,
  tagList,
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
  const onTagChange = (e) => {
    setFormTag(e.target.value);
  };
  const onAddTag = (e) => {
    e.preventDefault();
    if (formTag.trim().length === 0) {
      setFormTag("");
      return;
    }
    if (!formTags.includes(formTag)) {
      setFormTags([...formTags, formTag]);
    }
    setFormTag("");
  };
  const onTagClick = (e, tag) => {
    e.preventDefault();
    if (formTags.includes(tag)) {
      setFormTags(formTags.filter((_tag) => _tag != tag));
    } else {
      setFormTags([...formTags, tag]);
    }
  };
  const onTagDeleteClick = (e, tag) => {
    e.preventDefault();
    setFormTags(formTags.filter((_tag) => _tag != tag));
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
    <div className="w-screen fixed bottom-0 z-30">
      {itemChangeProps === 0 && (
        <div className="opacity flex justify-end gap-2 p-2 ">
          {selectedIdeas.map((idea, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${
                colorList[index % colorList.length]
              }`}
            ></div>
          ))}
        </div>
      )}

      {itemChangeProps === 1 && (
        <>
          <input
            className="opacity flex p-2 w-full shadow-inner bg-white"
            type="text"
            name="formSource"
            placeholder="출처..."
            autoComplete="off"
            value={formSource}
            onChange={onSourceChange}
            ref={sourceInput}
          />
          <div
            className={`absolute ${
              formSource.length > 0 ? "-top-2 left-2" : "-top-2 -left-20"
            } text-stone-400 duration-500`}
          >
            <FontAwesomeIcon icon={faQuoteLeft} /> 출처
          </div>
        </>
      )}

      {itemChangeProps === 2 && (
        <>
          <div className="opacity overflow-y-scroll flex-col border-box shadow-inner bg-white">
            {formTags.length > 0 && (
              <div className="p-4 flex flex-nowrap overflow-x-scroll">
                {formTags.map((tag, index) => (
                  <button
                    key={index}
                    className="flex-grow-0 flex-shrink-0 border-box rounded-3xl border-2 mr-1 mb-1 px-3 py-1 text-xs shadow-sm duration-500 break-words bg-stone-600 text-white"
                    style={{ flexBasis: "auto" }}
                    onClick={(e) => onTagDeleteClick(e, tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}

            <div
              className={`px-4 ${
                formTags.length === 0 && "pt-10"
              } text-stone-400`}
            >
              이런 태그는 어때요 ? <FontAwesomeIcon icon={faThumbsUp} />
            </div>
            <div className="p-4 pt-2 flex flex-wrap">
              {commonTags.map((tag, index) => (
                <button
                  key={index}
                  className={`border-box rounded-3xl border-2 mr-1 mb-1 px-3 py-1 text-xs shadow-sm duration-500 break-words ${
                    formTags.includes(tag) && "bg-stone-600 text-white"
                  }`}
                  onClick={(e) => onTagClick(e, tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
            <div className="px-4 text-stone-400">
              검색 <FontAwesomeIcon icon={faMagnifyingGlass} />
            </div>

            <div className="p-4 pt-2 flex flex-nowrap overflow-x-auto">
              {tagList
                .filter((tag) => tag.includes(formTag))
                .map((tag, index) => (
                  <div
                    key={index}
                    className={`flex-shrink-0 flex-grow-0  rounded-3xl border-2 mr-1 mb-1 px-3 py-1 text-xs shadow-sm duration-500 ${
                      formTags.includes(tag) && "bg-stone-600 text-white"
                    }`}
                    style={{ flexBasis: "auto" }}
                    onClick={(e) => onTagClick(e, tag)}
                  >
                    {tag}
                  </div>
                ))}
            </div>
            <div className="flex justify-between ">
              <input
                className="w-full p-2 shadow-inner"
                placeholder="태그..."
                value={formTag}
                onChange={onTagChange}
                ref={tagInput}
              />
              <button
                className="p-2 shadow-inner bg-stone-400 text-white"
                onClick={onAddTag}
              >
                <FontAwesomeIcon icon={faPlus} size="xl" />
              </button>
            </div>
          </div>
          <div className="absolute -top-2 left-2 text-stone-400">
            <FontAwesomeIcon icon={faHashtag} /> 태그
          </div>
        </>
      )}

      {itemChangeProps === 3 && selectedIdeas.length > 0 && (
        <div className="opacity bg-white shadow-inner">
          <div className="mx-16 pt-5 mb-2 text-center text-base font-black z-10">
            {selectedIdeas.length}개 선택됨
          </div>
          <div className="relative pb-10 ">
            <Slider {...settings}>
              {selectedIdeas.map((idea, index) => (
                <div key={index}>
                  <div className="relative h-60 p-5 m-1 bg-stone-100 shadow-sm rounded-3xl break-all">
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
                        idea.text.length < 200 ? (
                          idea.text
                        ) : (
                          <>
                            {idea.text.substr(0, 200)}
                            <span>...</span>
                            <span className="font-black underline">더보기</span>
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
      <div className="flex justify-between items-center p-2 shadow-inner">
        <div className="flex gap-2 text-lg">
          <span className="border-box rounded-3xl border-2 mb-1 px-3 py-1 font-black text-sm shadow-sm duration-500">
            {setCategory(formCategory).icon}&nbsp;
            {setCategory(formCategory).label}
          </span>
          <button
            className={`${formSource.length > 0 ? "" : "text-stone-400"} px-2`}
            onClick={(e) => itemChange(e, 1)}
          >
            <FontAwesomeIcon icon={faQuoteLeft} />
          </button>
          <button
            className={`relative ${
              formTags.length === 0 && "text-stone-400"
            } px-2`}
            onClick={(e) => itemChange(e, 2)}
          >
            <FontAwesomeIcon icon={faHashtag} />
            {formTags.length > 0 && (
              <div
                className="absolute bottom-0 -right-2 text-xs px-1 bg-red-400 text-white rounded-3xl"
                style={{ minWidth: "20px" }}
              >
                {formTags.length}
              </div>
            )}
          </button>
        </div>
        {selectedIdeas.length > 0 && (
          <div className="flex justify-end items-center gap-2 ">
            <button
              className="text-base font-black"
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
