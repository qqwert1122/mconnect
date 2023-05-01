import SuggestedIdea from "./SuggestedIdea";
import { useEffect, useState } from "react";
import algoliasearch from "algoliasearch";
import { dbService } from "fbase";
import {
  collectionGroup,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faQuoteLeft,
  faQuoteRight,
  faAngleDown,
  faAnglesRight,
  faMagnifyingGlass,
  faCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { toast } from "react-toastify";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { selectedIdeasState, formCnctedIdeasState } from "atom";
import { userState } from "atom";

const SuggestedIdeas = ({
  setNavValue,
  docId,
  writing,
  tagsPrmtr,
  tabClose,
  onIdeaClick,
  isItIn,
}) => {
  // docId
  //  - whatEdit or content docId
  // Writing
  //  - is writing ? "from writing" : "from viewing"
  // tagsPrmtr
  //  - tagsPrmtr ? formTags : content.tags
  // onIdeaClick={onIdeaClick}
  //  - navigate view page by clicking idea
  // isItIn ?
  //  - isItIn(array, item) : Check whether the item is in the array or not.
  const APP_ID = process.env.REACT_APP_ALGOLIA_APP_ID;
  const API_KEY = process.env.REACT_APP_ALGOLIA_API_KEY;
  const client = algoliasearch(APP_ID, API_KEY);
  const index = client.initIndex("userIdeas");

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

  const MAX_IDEAS_LENGTH = 15;
  const NUM_LOADMORE = 5;

  const [lastVisible, setLastVisible] = useState();

  function clearLastVisible() {
    setLastVisible();
  }

  async function initLoad() {
    clearLastVisible();
    const q1 = query(
      collectionGroup(dbService, "userIdeas"),
      orderBy("userId"),
      where("userId", "!=", loggedInUser.userId),
      where("tags", "array-contains", tagChangeProps),
      where("isOriginal", "==", true),
      where("isPublic", "==", true),
      orderBy("createdAt", "desc"),
      limit(NUM_LOADMORE)
    );
    await getDocs(q1).then((snapshot) => {
      const arr = [];
      snapshot.forEach((doc) => {
        if (doc.data().docId != docId) {
          arr.push(doc.data());
        }
      });
      setFilteredIdeas(arr);
      if (snapshot.docs.length === 0) {
        setLastVisible(-1);
      } else {
        setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
      }
    });
  }

  function loadMore() {
    let q;
    if (lastVisible === -1) return;
    else if (lastVisible) {
      q = query(
        collectionGroup(dbService, "userIdeas"),
        orderBy("userId"),
        where("userId", "!=", loggedInUser.userId),
        where("tags", "array-contains", tagChangeProps),
        where("isOriginal", "==", true),
        where("isPublic", "==", true),
        orderBy("createdAt", "desc"),
        limit(NUM_LOADMORE),
        startAfter(lastVisible)
      );
    }
    getFilteredIdeas(q);
  }

  // get Ideas that matches the tagPrmtr.
  const [filteredIdeas, setFilteredIdeas] = useState([]);

  const getFilteredIdeas = async (query) => {
    await getDocs(query).then((snapshot) => {
      setFilteredIdeas((ideas) => {
        const arr = [...ideas];
        snapshot.forEach((doc) => {
          if (doc.data().docId != docId) {
            arr.push(doc.data());
          }
        });
        return arr;
      });
      if (snapshot.docs.length === 0) {
        setLastVisible(-1);
      } else {
        setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
      }
    });
  };

  let navigate = useNavigate();

  function searchMore() {
    setNavValue("/searchpage");
  }

  useEffect(() => {
    initLoad();
  }, [tagChangeProps]);

  const onIdeaSelect = (e, idea) => {
    e.preventDefault();
    if (writing) {
      if (isItIn(formCnctedIdeas, idea)) {
        setFormCnctedIdeas(
          formCnctedIdeas.filter((_idea) => _idea.docId != idea.docId)
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
        setSelectedIdeas(
          selectedIdeas.filter((_idea) => _idea.docId != idea.docId)
        );
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
      <div className="flex justify-between p-4 z-10 text-base font-black">
        추천 아이디어
        <button onClick={tabClose}>닫기</button>
      </div>
      <hr />
      <div className="p-5 flex flex-nowrap overflow-x-scroll">
        {tagsPrmtr.map((tag, index) => (
          <button
            key={index}
            className={`relative flex-grow-0 flex-shrink-0 border-box rounded-3xl border-2 mr-1 mb-1 px-3 py-1 text-xs duration-500 break-words ${
              tag === tagChangeProps
                ? " bg-sky-400 text-white -top-1"
                : " bg-white top-0"
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
            className="flex justify-center items-center text-center font-black "
            style={{ height: "248px" }}
          >
            <div className="flex-col">
              <img
                className="mx-auto pb-5"
                width={150}
                src="../img/empty_box.png"
              />
              <span>아이디어가 비어있어요</span>
            </div>
          </div>
        ) : (
          <Slider {...sugtdSettings}>
            {filteredIdeas.map((idea, i) => (
              <div key={i} className="relative">
                <SuggestedIdea
                  index={index}
                  writing={writing}
                  loggedInUser={loggedInUser}
                  idea={idea}
                  isChecked={isChecked}
                  onIdeaSelect={onIdeaSelect}
                  onIdeaClick={onIdeaClick}
                />
                {i === filteredIdeas.length - 1 && lastVisible !== -1 && (
                  <button
                    className="absolute -right-8 top-24 text-stone-600 text-2xl"
                    onClick={
                      filteredIdeas.length === MAX_IDEAS_LENGTH
                        ? searchMore
                        : loadMore
                    }
                  >
                    {filteredIdeas.length === MAX_IDEAS_LENGTH ? (
                      <FontAwesomeIcon icon={faMagnifyingGlass} />
                    ) : (
                      <FontAwesomeIcon icon={faCircleRight} />
                    )}
                  </button>
                )}
              </div>
            ))}
          </Slider>
        )}
      </div>
    </>
  );
};

export default SuggestedIdeas;
