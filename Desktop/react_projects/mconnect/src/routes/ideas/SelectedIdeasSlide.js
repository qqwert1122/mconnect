import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faInfoCircle,
  faQuoteLeft,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Avatar } from "@mui/material";
import { useRecoilState, useSetRecoilState } from "recoil";
import { selectedIdeasState } from "atom";

const SelectedIdeasSlide = ({ ...props }) => {
  const { viewIdea, isViewDetailsClicked, setIsViewDetailsClicked } = props;

  const [selectedIdeas, setSelectedIdeas] = useRecoilState(selectedIdeasState);

  // event handler
  const onIdeaClick = (idea) => {
    viewIdea(idea, "my");
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
        className="shadow-lg bg-white duration-200 rounded-b-2xl text-sm"
        style={{
          height: `${isViewDetailsClicked ? "400px" : "96px"}`,
        }}
      >
        {isViewDetailsClicked === false ? (
          <>
            <div className="mx-16 pt-5 mb-2 text-center font-black z-10">
              {selectedIdeas.length}개 선택됨
              {selectedIdeas.length < 2 && (
                <p className="text-xs text-red-300 font-normal">
                  <FontAwesomeIcon icon={faInfoCircle} /> 연결하려면 2개 이상의
                  아이디어가 필요해요
                </p>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="mx-16 pt-5 mb-2 text-left z-10">
              <p className="font-black ">선택된 아이디어</p>
              {selectedIdeas.length < 2 && (
                <p className="text-xs text-red-300">
                  <FontAwesomeIcon icon={faInfoCircle} /> 연결하려면 2개 이상의
                  아이디어가 필요해요
                </p>
              )}
            </div>
            <div className="relative pb-10">
              <Slider {...settings}>
                {selectedIdeas.map((idea, index) => (
                  <div key={index} className="relative">
                    <button
                      className="absolute w-6 h-6 rounded-full border-2 border-stone-200 bg-white shadow right-0 top-0"
                      onClick={(e) => {
                        onXmarkClick(e, index);
                      }}
                    >
                      <FontAwesomeIcon icon={faXmark} />
                    </button>
                    <div
                      className="h-60 p-5 m-1 mx-2 bg-stone-100 shadow-md rounded-3xl break-all text-xs"
                      onClick={() => onIdeaClick(idea)}
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
          </>
        )}
        <button
          className={`flex mx-auto p-2 px-10 mt-2 font-black`}
          onClick={onViewDetailsClick}
        >
          {isViewDetailsClicked ? (
            <div>닫기</div>
          ) : (
            <FontAwesomeIcon icon={faChevronDown} />
          )}
        </button>
      </div>
    </>
  );
};

export default SelectedIdeasSlide;
