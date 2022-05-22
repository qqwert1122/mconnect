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
  formTag,
  setFormTag,
  formTags,
  setFormTags,
  setCategory,
  formCategory,
  selectedIdeas,
  setSelectedIdeas,
  tagList,
  formPublic,
  setFormPublic,
  sourceList,
  colorList,
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
    if (e.target.value === " ") {
      setFormSource("");
    } else {
      setFormSource(e.target.value);
    }
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
  const onSourceClick = (e, source) => {
    e.preventDefault();
    setFormSource(source);
  };
  const onPublicClick = (e) => {
    e.preventDefault();
    setFormPublic((prev) => !prev);
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
        <div className="opacity flex justify-end gap-2 p-3 ">
          {selectedIdeas.map((idea, index) => (
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
        <div className="opacity overflow-y-scroll flex-col border-box shadow-inner bg-stone-50">
          <div className="pt-4 px-4 text-stone-400">
            검색 <FontAwesomeIcon icon={faMagnifyingGlass} />
          </div>
          {sourceList.length === 0 ? (
            <div className="p-4 pt-2 text-sm">기존 태그가 없습니다</div>
          ) : (
            <div className="p-4 pt-2 flex flex-nowrap overflow-x-auto">
              {sourceList
                .filter((source) => source.includes(formSource))
                .map((source, index) => (
                  <button
                    key={index}
                    className={`flex-shrink-0 flex-grow-0 rounded-3xl border-2 mr-1 mb-1 px-3 py-1 text-xs shadow-sm duration-500 ${
                      source === formSource
                        ? "bg-stone-600 text-white"
                        : "bg-white"
                    }`}
                    style={{ flexBasis: "auto" }}
                    onClick={(e) => onSourceClick(e, source)}
                  >
                    {source}
                  </button>
                ))}
            </div>
          )}
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
        </div>
      )}

      {itemChangeProps === 2 && (
        <>
          <div className="opacity overflow-y-scroll flex-col border-box shadow-inner bg-stone-50">
            {formTags.length > 0 && (
              <div className="p-4 flex flex-nowrap overflow-x-scroll">
                {formTags.map((tag, index) => (
                  <button
                    key={index}
                    className="flex-grow-0 flex-shrink-0 border-box rounded-3xl border-2 mr-1 mb-1 px-3 py-1 text-xs shadow-sm duration-500 break-words bg-stone-600 text-white"
                    style={{ flexBasis: "auto" }}
                    onClick={(e) => onTagClick(e, tag)}
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
                    formTags.includes(tag) ? "bg-stone-300 " : "bg-white"
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
            {tagList.length === 0 ? (
              <div className="p-4 pt-2 text-sm">기존 태그가 없습니다</div>
            ) : (
              <div className="p-4 pt-2 flex flex-nowrap overflow-x-auto">
                {tagList
                  .filter((tag) => tag.includes(formTag))
                  .map((tag, index) => (
                    <button
                      key={index}
                      className={`flex-shrink-0 flex-grow-0  rounded-3xl border-2 mr-1 mb-1 px-3 py-1 text-xs shadow-sm duration-500 ${
                        formTags.includes(tag) ? "bg-stone-300 " : "bg-white"
                      }`}
                      style={{ flexBasis: "auto" }}
                      onClick={(e) => onTagClick(e, tag)}
                    >
                      {tag}
                    </button>
                  ))}
              </div>
            )}

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
        <div className="opacity bg-stone-50 shadow-inner">
          <div className="mx-16 pt-5 mb-2 text-center text-base font-black z-10">
            {selectedIdeas.length}개 선택됨
          </div>
          <div className="relative pb-10 ">
            <Slider {...settings}>
              {selectedIdeas.map((idea, index) => (
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
      <div className="flex justify-between items-center p-2 shadow-inner">
        <div className="flex gap-2 text-lg">
          <span className="border-box rounded-3xl border-2 mb-1 px-3 py-1 font-black text-sm shadow-sm duration-500">
            {setCategory(formCategory).icon}&nbsp;
            {setCategory(formCategory).label}
          </span>
          <button
            className={`${formSource.length === 0 && "text-stone-400"} px-2`}
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
          <button
            className={`relative ${
              formPublic === false && "text-stone-400"
            } px-2`}
            onClick={onPublicClick}
          >
            <FontAwesomeIcon icon={farCompass} />
            {formPublic && (
              <div
                className="absolute bottom-0 -right-2 text-xs px-1 bg-stone-600 text-white rounded-3xl"
                style={{ minWidth: "20px" }}
              >
                공개
              </div>
            )}
          </button>
        </div>
        {selectedIdeas.length > 0 && (
          <div
            className={`flex justify-end items-center gap-2 ${
              selectedIdeas.length < 2 && "text-red-400"
            }`}
          >
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
