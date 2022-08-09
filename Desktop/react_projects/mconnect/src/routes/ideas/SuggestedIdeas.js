import { useEffect, useState } from "react";
import { dbService } from "fbase";
import {
  collection,
  collectionGroup,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import Slider from "react-slick";
import Avatar from "@mui/material/Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faQuoteLeft,
  faQuoteRight,
  faAngleDown,
  faCheck,
  faHashtag,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";

const SuggestedIdeas = ({
  tagsPrmtr,
  itemChange,
  formConnectedIdeas,
  setFormConnectedIdeas,
  onIdeaClick,
  selectedIdeas,
  setSelectedIdeas,
  thumbsUp,
}) => {
  const [tagChangeProps, setTagChangeProps] = useState(
    tagsPrmtr.length > 0 && tagsPrmtr[0]
  );

  const onSuggestedTagClick = (e, tag) => {
    e.preventDefault();
    setTagChangeProps(tag);
  };

  const isChecked = (idea) => {
    if (formConnectedIdeas === undefined) {
      //viewIdea
      return selectedIdeas.includes(idea);
    } else {
      // writingIdea
      return formConnectedIdeas.includes(idea);
    }
  };

  const onIdeaSelect = (e, idea) => {
    e.preventDefault();
    if (formConnectedIdeas === undefined) {
      // viewIdea
      if (selectedIdeas.includes(idea)) {
        setSelectedIdeas(selectedIdeas.filter((idea) => idea != idea));
      } else {
        setSelectedIdeas([idea, ...selectedIdeas]);
      }
    } else {
      //writingIdea
      if (formConnectedIdeas.includes(idea)) {
        setFormConnectedIdeas(
          formConnectedIdeas.filter((_idea) => _idea != idea)
        );
      } else {
        setFormConnectedIdeas([idea, ...formConnectedIdeas]);
      }
    }
  };

  const [filteredIdeas, setFilteredIdeas] = useState([]);

  const getFilteredIdeas = async (query) => {
    const ideaRef = await getDocs(query);
    const newData = ideaRef.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setFilteredIdeas(newData);
  };

  useEffect(() => {
    const q1 = query(
      collectionGroup(dbService, "userIdeas"),
      where("isPublic", "==", true),
      where("tags", "array-contains", tagChangeProps),
      orderBy("createdAt", "desc")
    );
    getFilteredIdeas(q1);
  }, [tagChangeProps]);

  const sugtdSettings = {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToScroll: 1,
    centerMode: true,
    focusOnSelect: false,
    initialSlide: filteredIdeas[0],
  };

  return (
    <>
      <div className="flex justify-center pt-5 mb-2 z-10">
        {thumbsUp ? (
          <div className="text-base font-black">
            추천 &nbsp;
            <FontAwesomeIcon icon={faThumbsUp} />
          </div>
        ) : (
          <button
            className="text-base font-black"
            onClick={() => itemChange(1)}
          >
            추천 아이디어 &nbsp;
            <FontAwesomeIcon icon={faAngleDown} />
          </button>
        )}
      </div>
      <div className="p-5 flex flex-nowrap overflow-x-scroll">
        {tagsPrmtr.map((tag, index) => (
          <button
            key={index}
            className={`relative flex-grow-0 flex-shrink-0 border-box rounded-3xl border-2 mr-1 mb-1 px-3 py-1 text-xs duration-500 break-words ${
              tag === tagChangeProps
                ? "shadow-lg bg-stone-600 text-white -top-1"
                : "shadow bg-white top-0"
            }`}
            style={{ flexBasis: "auto" }}
            onClick={(e) => onSuggestedTagClick(e, tag)}
          >
            {tag}
          </button>
        ))}
      </div>
      <div className="relative pb-10">
        {filteredIdeas.length === 0 ? (
          <div
            className="flex justify-center items-center text-xl font-black "
            style={{ height: "248px" }}
          >
            <FontAwesomeIcon icon={faQuoteLeft} />
            &nbsp; 텅 &nbsp;
            <FontAwesomeIcon icon={faQuoteRight} />
          </div>
        ) : (
          <>
            <Slider {...sugtdSettings}>
              {filteredIdeas.map((idea, index) => (
                <div key={index}>
                  <div
                    className="relative h-60 p-4 m-1 bg-white shadow rounded-3xl text-xs break-all"
                    onClick={() => onIdeaClick(idea)}
                  >
                    <button
                      className={`absolute top-0 right-0 rounded-full ${
                        isChecked(idea)
                          ? "bg-red-400 text-white"
                          : "border-2 border-stone-400"
                      } w-6 h-6 shadow-xl`}
                      onClick={(e) => {
                        onIdeaSelect(e, idea);
                      }}
                    >
                      {isChecked(idea) && <FontAwesomeIcon icon={faCheck} />}
                    </button>
                    {idea.title === "" ? (
                      <>
                        {idea.text.length <
                        (idea.source.length > 0 ? 140 : 180) ? (
                          <div className="mb-3">{idea.text}</div>
                        ) : (
                          <div className="mb-3">
                            {idea.text.substr(
                              0,
                              idea.source.length > 0 ? 140 : 180
                            )}
                            <span>...</span>
                            <span className="font-black underline">더보기</span>
                          </div>
                        )}
                        {idea.source.length > 0 && (
                          <div className="ml-2 mb-1 flex gap-1 text-stone-400">
                            <FontAwesomeIcon icon={faQuoteLeft} />
                            <span>{idea.source}</span>
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        {idea.title.length <
                        (idea.source.length > 0 ? 15 : 30) ? (
                          <div className="mb-2 font-black break-all text-sm">
                            {idea.title}
                          </div>
                        ) : (
                          <div className="mb-2 font-black text-sm">
                            {idea.title.substr(
                              0,
                              idea.source.length > 0 ? 15 : 30
                            )}
                            <span>...</span>
                          </div>
                        )}
                        {idea.text.length < 140 ? (
                          <div className="mb-3">idea.text</div>
                        ) : (
                          <div className="mb-3">
                            {idea.text.substr(0, 140)}
                            <span>...</span>
                            <span className="font-black underline">더보기</span>
                          </div>
                        )}
                        {idea.source.length > 0 && (
                          <div className="ml-2 mb-1 flex gap-1 text-stone-400">
                            <FontAwesomeIcon icon={faQuoteLeft} />
                            <span>{idea.source}</span>
                          </div>
                        )}
                      </>
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
                    <div className="absolute bottom-4 right-4 text-xl text-orange-400">
                      <FontAwesomeIcon icon={faBookmark} />
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </>
        )}
      </div>
    </>
  );
};

export default SuggestedIdeas;
