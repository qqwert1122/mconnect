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
import { toast } from "react-toastify";
import { useRecoilState, useRecoilValue } from "recoil";
import { selectedIdeasState, formCnctedIdeasState } from "atom";
import { whatViewState } from "atom";
import { whatEditState } from "atom";

const SuggestedIdeas = ({
  writing,
  tagsPrmtr,
  tabChange,
  onIdeaClick,
  isItIn,
}) => {
  // Writing
  //  - is writing ? "from writing" : "from viewing"
  // tagsPrmtr
  //  - tagsPrmtr ? formTags : whatView.tags
  // tabChange
  //  - tab ? none : tabChange(=itemChange)
  // onIdeaClick={onIdeaClick}
  //  - navigate view page by clicking idea
  // isItIn ?
  //  - isItIn(array, item) : Check whether the item is in the array or not.

  const [selectedIdeas, setSelectedIdeas] = useRecoilState(selectedIdeasState);
  const [formCnctedIdeas, setFormCnctedIdeas] =
    useRecoilState(formCnctedIdeasState);
  const whatView = useRecoilValue(whatViewState);
  const whatEdit = useRecoilValue(whatEditState);
  const idea = writing ? whatEdit : whatView;

  // select tagPrmtr
  const [tagChangeProps, setTagChangeProps] = useState(
    tagsPrmtr.length > 0 && tagsPrmtr[0]
  );

  const onSuggestedTagClick = (e, tag) => {
    e.preventDefault();
    setTagChangeProps(tag);
  };

  const isChecked = (idea) => {
    if (writing) {
      return isItIn(formCnctedIdeas, idea);
    } else {
      return isItIn(selectedIdeas, idea);
    }
  };

  const onIdeaSelect = (e, idea) => {
    e.preventDefault();
    if (writing) {
      if (isItIn(formCnctedIdeas, idea)) {
        console.log("Yes! I'm In");
        setFormCnctedIdeas(
          formCnctedIdeas.filter((_idea) => _idea.id != idea.id)
        );
      } else {
        if (formCnctedIdeas.length > 4) {
          toast.error("최대 5개까지 연결 가능합니다.", {
            theme: "colored",
          });
        } else {
          setFormCnctedIdeas([idea, ...formCnctedIdeas]);
        }
      }
    } else {
      if (isItIn(selectedIdeas, idea)) {
        console.log("Yes, I'm in");
        setSelectedIdeas(selectedIdeas.filter((_idea) => _idea.id != idea.id));
      } else {
        if (selectedIdeas.length > 4) {
          toast.error("최대 5개까지 연결 가능합니다.", {
            theme: "colored",
          });
        } else {
          setSelectedIdeas([idea, ...selectedIdeas]);
        }
      }
    }
  };

  // get Ideas that matches the tagPrmtr.
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

  // Slider configuration
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
        {writing ? (
          <div className="text-base font-black">
            추천 &nbsp;
            <FontAwesomeIcon icon={faThumbsUp} />
          </div>
        ) : (
          <button className="text-base font-black" onClick={() => tabChange(1)}>
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
              {filteredIdeas
                .filter((_idea) => _idea.id != idea.id)
                .map((idea, index) => (
                  <div key={index} className="relative">
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
                    <div
                      className="h-60 p-4 m-1 bg-white shadow rounded-3xl text-xs break-all"
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
