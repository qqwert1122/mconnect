import { dbService } from "fbase";
import { doc, increment, updateDoc } from "firebase/firestore";
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
    if (dbIdea.like_users.hasOwnProperty(user.userId)) {
      delete dbIdea.like_users[user.userId];
      await updateDoc(ideaRef, {
        like_count: increment(-1),
        like_users: dbIdea.like_users,
      });
    } else {
      await updateDoc(ideaRef, {
        like_count: increment(1),
        like_users: { ...dbIdea.like_users, [user.userId]: true },
      });
    }
  };

  const onBookmarkClick = async () => {
    const ideaRef = doc(dbService, "ideas", `${dbIdea.id}`);
    if (dbIdea.bookmark_users.hasOwnProperty(user.userId)) {
      delete dbIdea.bookmark_users[user.userId];
      await updateDoc(ideaRef, {
        bookmark_count: increment(-1),
        bookmark_users: dbIdea.bookmark_users,
      });
    } else {
      await updateDoc(ideaRef, {
        bookmark_count: increment(1),
        bookmark_users: { ...dbIdea.bookmark_users, [user.userId]: true },
      });
    }
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
            dbIdea.like_users.hasOwnProperty(user.userId) && "text-red-400"
          }`}
          onClick={onLikeClick}
        >
          <FontAwesomeIcon
            icon={
              dbIdea.like_users.hasOwnProperty(user.userId)
                ? fasHeart
                : farHeart
            }
            size="xl"
          />
        </button>
        <button
          className={`${
            dbIdea.bookmark_users.hasOwnProperty(user.userId) &&
            "text-orange-400"
          }`}
          onClick={onBookmarkClick}
        >
          <FontAwesomeIcon
            icon={
              dbIdea.bookmark_users.hasOwnProperty(user.userId)
                ? fasBookmark
                : farBookmark
            }
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
