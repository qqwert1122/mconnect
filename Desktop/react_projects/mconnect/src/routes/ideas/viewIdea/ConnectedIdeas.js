import "css/Animation.css";
import Slider from "react-slick";

const ConnectedIdeas = ({ whatView, onIdeaClick }) => {
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
    <div className="moveRightToLeft bg-stone-50 shadow-inner">
      <div className="mx-16 pt-5 mb-2 text-center text-base font-black z-10">
        {whatView.connectedIdeas.length}개 연결됨
      </div>
      <div className="relative pb-10 ">
        <Slider {...settings}>
          {whatView.connectedIdeas.map((idea, index) => (
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
                          <span className="font-black underline">더보기</span>
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
  );
};

export default ConnectedIdeas;
