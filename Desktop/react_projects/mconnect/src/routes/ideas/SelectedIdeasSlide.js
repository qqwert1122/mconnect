import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";

const SelectedIdeasSlide = ({
  selectedIdeas,
  isConnectToggleClicked,
  onConnectToggle,
}) => {
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
            className="py-2 flex-col text-xl font-black shadow-xl"
            style={{
              background: "linear-gradient(45deg, #fef9c3, #d9f99d , #fde047)",
            }}
          >
            <div className="flex justify-center">
              선택된 아이디어 ♾️ : &nbsp;&nbsp;&nbsp;{selectedIdeas.length}개
            </div>
            <button
              className="flex justify-center w-full mt-2 text-lime-600"
              onClick={onConnectToggle}
            >
              <FontAwesomeIcon icon={faChevronDown} />
            </button>
          </div>
        ) : (
          <div className="shadow-xl" style={{ backgroundColor: "#eeeeee" }}>
            <div className="highlight mx-16 mt-5 mb-2 flex justify-center text-xl font-black z-10">
              선택된 아이디어 ♾️
            </div>
            <div className="relative pb-10 ">
              <Slider {...settings}>
                {selectedIdeas.map((idea, index) => (
                  <div key={index}>
                    <div className="relative h-52 p-5 m-1 bg-white rounded-3xl shadow-lg break-all">
                      {idea.title === "" ? (
                        idea.text.length < 130 ? (
                          idea.text
                        ) : (
                          <>
                            {idea.text.substr(0, 130)}
                            <span>...</span>
                            <span className="font-black underline">더보기</span>
                          </>
                        )
                      ) : (
                        <>
                          <div className="mb-2 font-black text-lg">
                            {idea.title}
                          </div>
                          {idea.text.length < 100 ? (
                            idea.text
                          ) : (
                            <>
                              {idea.text.substr(0, 100)}
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
