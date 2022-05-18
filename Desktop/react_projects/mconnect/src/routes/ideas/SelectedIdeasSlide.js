import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";

const SelectedIdeasSlide = ({
  selectedIdeas,
  setSelectedIdeas,
  setViewIdea,
  isConnectToggleClicked,
  onConnectToggle,
}) => {
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
    focusOnSelect: true,
    initialSlide: 0,
  };
  return (
    <>
      {selectedIdeas.length > 0 ? (
        !isConnectToggleClicked ? (
          // Connected Ideas
          <div
            className="py-2 flex-col text-lg font-black shadow-xl bg-white "
            // style={{
            //   background: "linear-gradient(45deg, #fef9c3, #d9f99d , #fde047)",
            // }}
          >
            <div className="flex justify-center">
              {selectedIdeas.length}개 선택됨
            </div>
            <button
              className="flex justify-center w-full mt-2 text-lime-600"
              onClick={onConnectToggle}
            >
              <FontAwesomeIcon icon={faChevronDown} />
            </button>
          </div>
        ) : (
          <div className="shadow-xl bg-white">
            <div className="mx-16 pt-5 mb-2 text-center text-lg font-black z-10">
              선택된 아이디어
            </div>
            <div className="relative pb-10 ">
              <Slider {...settings}>
                {selectedIdeas.map((idea, index) => (
                  <div key={index}>
                    <div
                      className="relative h-52 p-5 m-1 bg-stone-100 shadow-sm rounded-3xl break-all text-sm"
                      onClick={() => {
                        onIdeaClick(idea);
                      }}
                    >
                      {idea.title === "" ? (
                        idea.text.length < 150 ? (
                          idea.text
                        ) : (
                          <>
                            {idea.text.substr(0, 150)}
                            <span>...</span>
                            <span className="font-black underline">더보기</span>
                          </>
                        )
                      ) : (
                        <>
                          <div className="mb-2 font-black text-base">
                            {idea.title}
                          </div>
                          {idea.text.length < 130 ? (
                            idea.text
                          ) : (
                            <>
                              {idea.text.substr(0, 130)}
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
                ))}
              </Slider>
            </div>
            <div>
              <button
                className="flex justify-center w-full py-2 text-2xl"
                onClick={onConnectToggle}
              >
                <FontAwesomeIcon icon={faChevronUp} />
              </button>
            </div>
          </div>
        )
      ) : (
        <></>
      )}
    </>
  );
};

export default SelectedIdeasSlide;
