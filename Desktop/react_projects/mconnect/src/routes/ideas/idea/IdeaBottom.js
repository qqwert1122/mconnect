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

const IdeaBottom = ({
  dbIdea,
  ideaInfo,
  user,
  viewDetail,
  setViewDetail,
  colorList,
}) => {
  const onLikeClick = async () => {
    const countRef = doc(dbService, "counts", `${dbIdea.id}`);
    if (ideaInfo.like_users.hasOwnProperty(user.userId)) {
      delete ideaInfo.like_users[user.userId];
      await updateDoc(countRef, {
        like_count: increment(-1),
        like_users: ideaInfo.like_users,
      });
    } else {
      await updateDoc(countRef, {
        like_count: increment(1),
        like_users: { ...ideaInfo.like_users, [user.userId]: true },
      });
    }
  };

  const onBookmarkClick = async () => {
    const countRef = doc(dbService, "counts", `${dbIdea.id}`);
    if (ideaInfo.bookmark_users.hasOwnProperty(user.userId)) {
      delete ideaInfo.bookmark_users[user.userId];
      await updateDoc(countRef, {
        bookmark_count: increment(-1),
        bookmark_users: ideaInfo.bookmark_users,
      });
    } else {
      await updateDoc(countRef, {
        bookmark_count: increment(1),
        bookmark_users: { ...ideaInfo.bookmark_users, [user.userId]: true },
      });
    }
  };

  const onPublicClick = async () => {
    if (dbIdea.userId === user.userId) {
      const ideaRef = doc(
        dbService,
        "users",
        user.userId,
        "userIdeas",
        dbIdea.id
      );
      await updateDoc(ideaRef, { isPublic: !dbIdea.isPublic });
    }
  };

  const onDetailClick = () => {
    setViewDetail((prev) => !prev);
  };

  return (
    <>
      <div className="flex items-center px-5 pb-5 gap-5 text-stone-500">
        {ideaInfo && (
          <>
            <button
              className={`${
                ideaInfo.like_users.hasOwnProperty(user.userId) &&
                "text-red-400"
              }`}
              onClick={onLikeClick}
            >
              <FontAwesomeIcon
                icon={
                  ideaInfo.like_users.hasOwnProperty(user.userId)
                    ? fasHeart
                    : farHeart
                }
                size="xl"
              />
            </button>
            <button
              className={`${
                ideaInfo.bookmark_users.hasOwnProperty(user.userId) &&
                "text-orange-400"
              }`}
              onClick={onBookmarkClick}
            >
              <FontAwesomeIcon
                icon={
                  ideaInfo.bookmark_users.hasOwnProperty(user.userId)
                    ? fasBookmark
                    : farBookmark
                }
                size="xl"
              />
            </button>
            {user.userId == dbIdea.userId && (
              <button
                className={`${dbIdea.isPublic && "text-sky-400"}`}
                onClick={onPublicClick}
              >
                <FontAwesomeIcon
                  icon={dbIdea.isPublic ? fasCompass : farCompass}
                  size="xl"
                />
              </button>
            )}
          </>
        )}

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
