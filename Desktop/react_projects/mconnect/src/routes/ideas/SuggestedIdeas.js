import { useEffect, useState } from "react";
import { dbService } from "fbase";
import {
  collectionGroup,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  increment,
  orderBy,
  query,
  setDoc,
  updateDoc,
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
  faBookmark,
  faBookmark as fasBookmark,
} from "@fortawesome/free-solid-svg-icons";
import {
  faThumbsUp,
  faBookmark as farBookmark,
} from "@fortawesome/free-regular-svg-icons";
import { toast } from "react-toastify";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  whatViewState,
  whatEditState,
  selectedIdeasState,
  formCnctedIdeasState,
} from "atom";
import { userState } from "atom";
import dayjs from "dayjs";
import SuggestedIdea from "./SuggestedIdea";

const SuggestedIdeas = ({
  id,
  writing,
  tagsPrmtr,
  tabChange,
  onIdeaClick,
  isItIn,
}) => {
  // id
  //  - whatEdit or whatView id
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
  const loggedInUser = useRecoilValue(userState);
  const [selectedIdeas, setSelectedIdeas] = useRecoilState(selectedIdeasState);
  const [formCnctedIdeas, setFormCnctedIdeas] =
    useRecoilState(formCnctedIdeasState);

  // change tag parameter
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

  // select tagPrmtr
  const [tagChangeProps, setTagChangeProps] = useState(
    tagsPrmtr.length > 0 && tagsPrmtr[0]
  );

  // get Ideas that matches the tagPrmtr.
  const [filteredIdeas, setFilteredIdeas] = useState([]);
  console.log(filteredIdeas);

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
        {filteredIdeas.filter((_idea, index) => _idea.id != id).length === 0 ? (
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
                .filter((_idea) => _idea.id != id)
                .map((idea, index) => (
                  <SuggestedIdea
                    key={index}
                    writing={writing}
                    loggedInUser={loggedInUser}
                    idea={idea}
                    isChecked={isChecked}
                    onIdeaSelect={onIdeaSelect}
                    onIdeaClick={onIdeaClick}
                  />
                ))}
            </Slider>
          </>
        )}
      </div>
    </>
  );
};

export default SuggestedIdeas;
