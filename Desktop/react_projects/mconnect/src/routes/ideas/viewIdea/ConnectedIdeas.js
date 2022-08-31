import "css/Animation.css";
import Slider from "react-slick";
import { Avatar } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import { useRecoilValue } from "recoil";
import { whatViewState, cnctedIdeasState } from "atom";
import { useEffect } from "react";

const ConnectedIdeas = ({ onIdeaClick, getIdeasFromIDs }) => {
  const whatView = useRecoilValue(whatViewState);
  const cnctedIdeas = useRecoilValue(cnctedIdeasState);

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

  useEffect(() => {
    if (whatView.connectedIDs.length > 0) {
      getIdeasFromIDs(whatView.connectedIDs);
    }
  }, []);

  return (
    <div className="moveRightToLeft bg-stone-50 shadow-inner">
      <div className="mx-16 pt-5 mb-2 text-center text-base font-black z-10">
        {whatView.connectedIDs.length}개 연결됨
      </div>
      <div className="relative pb-10 text-xs">
        <Slider {...settings}>
          {cnctedIdeas.map((idea, index) => (
            <div key={index}>
              {idea.id === -1 ? (
                <div className="flex gap-2 items-center justify-center relative h-60 p-5 m-1 bg-white text-stone-300 shadow rounded-3xl text-xs break-all">
                  <FontAwesomeIcon icon={faCircleInfo} /> 삭제되었습니다
                </div>
              ) : (
                <div
                  className="relative h-60 p-5 m-1 bg-white shadow rounded-3xl text-xs break-all"
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
              )}
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ConnectedIdeas;
