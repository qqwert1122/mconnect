import { dbService } from "fbase";
import { doc, updateDoc } from "firebase/firestore";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCompass as fasCompass,
  faHeart as fasHeart,
  faBookmark as fasBookmark,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";
import {
  faCompass as farCompass,
  faHeart as farHeart,
  faBookmark as farBookmark,
} from "@fortawesome/free-regular-svg-icons";
import ColoredIdeaList from "../writingIdea/ColoredIdeaList";

const IdeaBottom = ({ dbIdea, user, viewDetail, setViewDetail, colorList }) => {
  const onLikeClick = async () => {
    const ideaRef = doc(dbService, "ideas", `${dbIdea.id}`);
    if (dbIdea.likeUsers.includes(user.userId)) {
      await updateDoc(ideaRef, {
        likeUsers: dbIdea.likeUsers.filter((fUser) => fUser != user.userId),
      });
    } else {
      await updateDoc(ideaRef, {
        likeUsers: [...dbIdea.likeUsers, user.userId],
      });
    }
  };

  const onBookmarkClick = async () => {
    const ideaRef = doc(dbService, "ideas", `${dbIdea.id}`);
    await updateDoc(ideaRef, { bookmark: !dbIdea.bookmark });
  };

  const onPublicClick = async () => {
    if (dbIdea.userId === user.userId) {
      const ideaRef = doc(dbService, "ideas", `${dbIdea.id}`);
      await updateDoc(ideaRef, { public: !dbIdea.public });
    }
  };

  const onDetailClick = () => {
    setViewDetail((prev) => !prev);
  };

  return (
    <>
      <div className="flex items-center px-5 pb-5 gap-5 text-stone-500">
        <button
          className={`${
            dbIdea.likeUsers.includes(user.userId) && "text-red-400"
          }`}
          onClick={onLikeClick}
        >
          <FontAwesomeIcon
            icon={dbIdea.likeUsers.includes(user.userId) ? fasHeart : farHeart}
            size="xl"
          />
        </button>
        <button
          className={`${dbIdea.bookmark && "text-orange-400"}`}
          onClick={onBookmarkClick}
        >
          <FontAwesomeIcon
            icon={dbIdea.bookmark ? fasBookmark : farBookmark}
            size="xl"
          />
        </button>
        <button
          className={`${dbIdea.public && "text-sky-400"}`}
          onClick={onPublicClick}
        >
          <FontAwesomeIcon
            icon={dbIdea.public ? fasCompass : farCompass}
            size="xl"
          />
        </button>
        {/* <div className="w-full border-b-2 border-stone-200"></div> */}

        {dbIdea.connectedIdeas.length > 0 && (
          <div className="w-full flex justify-end gap-2">
            {/* <img
              className={`w-full h-4 ${
                viewDetail ? "opacity-0" : "opacity-30"
              } duration-500`}
              src="./img/line_3.png"
            /> */}

            <ColoredIdeaList
              ideas={dbIdea.connectedIdeas}
              colorList={colorList}
              small={true}
            />

            <div
              className={`flex items-center text-stone-500 ${
                viewDetail && "rotate-180"
              } duration-500`}
              onClick={onDetailClick}
            >
              <FontAwesomeIcon icon={faAngleDown} size="xl" />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default IdeaBottom;
