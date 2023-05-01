import "css/Animation.css";
import ColoredIdeaList from "./ColoredIdeaList";
import SuggestedIdeas from "routes/ideas/SuggestedIdeas";
import { useState } from "react";
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightArrowLeft,
  faCircleInfo,
  faInfoCircle,
  faQuoteLeft,
  faRightToBracket,
  faRotate,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { Avatar } from "@mui/material";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { whatEditState, formCnctedIdeasState, formTagsState } from "atom";

const RelatedIdeas = ({ handleTabClose, onIdeaClick }) => {
  const [formCnctedIdeas, setFormCnctedIdeas] =
    useRecoilState(formCnctedIdeasState);

  const onXmarkClick = (e, index) => {
    e.preventDefault();
    setFormCnctedIdeas(
      formCnctedIdeas.filter((fIdea, fIndex) => fIndex != index)
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
        className="flex items-center justify-end"
        style={{
          minHeight: "36px",
        }}
      >
        <ColoredIdeaList ideas={formCnctedIdeas} />
      </div>

      <div className="border rounded-t-2xl">
        <div className="p-4 flex justify-between font-black text-base">
          <p>연결된 아이디어</p>

          <button
            onClick={(e) => {
              handleTabClose(e);
            }}
          >
            닫기
          </button>
        </div>
        <hr />
        <div className="pt-8 mx-16 mb-2 text-left text-sm font-black">
          {formCnctedIdeas.length}개 선택됨
          {formCnctedIdeas.length < 2 && (
            <p className="text-xs text-red-300 font-normal">
              <FontAwesomeIcon icon={faInfoCircle} /> 연결하려면 2개 이상의
              아이디어가 필요해요
            </p>
          )}
        </div>

        {formCnctedIdeas.length > 0 ? (
          <div className="relative pb-10 ">
            <Slider {...settings}>
              {formCnctedIdeas.map((idea, index) => (
                <div key={index}>
                  {idea.docId === -1 ? (
                    <div className="flex gap-1 justify-center items-center relative h-60 p-5 m-1 bg-white text-stone-300 shadow rounded-3xl text-xs break-all">
                      <FontAwesomeIcon icon={faCircleInfo} /> 삭제되었습니다
                      <button
                        className="absolute w-6 h-6 rounded-full border-2 border-stone-200 bg-white text-black shadow right-0 top-0"
                        onClick={(e) => {
                          onXmarkClick(e, index);
                        }}
                      >
                        <FontAwesomeIcon icon={faXmark} />
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div className="relative h-60 p-5 m-1 bg-white border shadow rounded-3xl text-xs break-all">
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
                          {idea.title.length > 0 && (
                            <div className="mb-2 truncate font-black text-sm">
                              {idea.title}
                            </div>
                          )}
                          <div className="mb-3 line-clamp-6">{idea.text}</div>
                          {idea.source.length > 0 && (
                            <div className="ml-2 mb-1 flex gap-1 text-stone-400">
                              <FontAwesomeIcon icon={faQuoteLeft} />
                              <span>{idea.source}</span>
                            </div>
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
                  )}
                </div>
              ))}
            </Slider>
          </div>
        ) : (
          <div className="py-10 flex justify-center">
            <div className="flex-col text-center">
              <img
                className="mx-auto pb-5"
                width={150}
                src="../img/empty_box.png"
              />
              <p className="text-base font-black text-stone-400 ">
                아이디어가 비어있어요
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RelatedIdeas;
