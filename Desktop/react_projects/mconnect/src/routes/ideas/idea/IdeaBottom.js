import { dbService } from "fbase";
import {
  deleteDoc,
  doc,
  getDoc,
  increment,
  updateDoc,
} from "firebase/firestore";
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
import { useEffect, useState } from "react";

const IdeaBottom = ({
  user,
  isOwner,
  userIdea,
  viewDetail,
  setViewDetail,
  colorList,
}) => {
  const countRef = doc(dbService, "counts", userIdea.id);
  const userIdeaRef = doc(
    dbService,
    "users",
    user.userId,
    "userIdeas",
    userIdea.id
  );

  const [countInfo, setCountInfo] = useState();
  const [isDeleted, setIsDeleted] = useState(false);

  const getCountInfo = async () => {
    const countDoc = (
      await getDoc(doc(dbService, "counts", userIdea.id))
    ).data();
    if (countDoc === undefined) {
      setCountInfo("delete");
      setIsDeleted(true);
    } else {
      setCountInfo(countDoc);
    }
  };

  useEffect(() => {
    getCountInfo();
  }, []);

  const onLikeClick = async () => {
    if (userIdea.isLiked) {
      if (isDeleted) {
        await updateDoc(userIdeaRef, {
          isLiked: false,
        });
      } else {
        delete countInfo.like_users[user.userId];
        await updateDoc(countRef, {
          like_count: increment(-1),
          like_users: countInfo.like_users,
        });
        await updateDoc(userIdeaRef, {
          isLiked: false,
        });
      }
    } else {
      if (isDeleted) {
        await updateDoc(userIdeaRef, {
          isLiked: true,
        });
      } else {
        await updateDoc(countRef, {
          like_count: increment(1),
          like_users: { ...countInfo.like_users, [user.userId]: user.userName },
        });
        await updateDoc(userIdeaRef, {
          isLiked: true,
        });
      }
    }
  };

  const onBookmarkClick = async () => {
    if (userIdea.isBookmarked) {
      if (isDeleted) {
        await updateDoc(userIdeaRef, {
          isBookmarked: false,
        });
      } else {
        delete countInfo.bookmark_users[user.userId];
        await updateDoc(countRef, {
          bookmark_count: increment(-1),
          bookmark_users: countInfo.bookmark_users,
        });
        await updateDoc(userIdeaRef, {
          isBookmarked: false,
        });
      }
      if (isOwner === false) {
        deleteDoc(userIdeaRef);
      }
    } else {
      if (isDeleted) {
        await updateDoc(userIdeaRef, {
          isBookmarked: true,
        });
      } else {
        await updateDoc(countRef, {
          bookmark_count: increment(1),
          bookmark_users: {
            ...countInfo.bookmark_users,
            [user.userId]: user.userName,
          },
        });
        await updateDoc(userIdeaRef, {
          isBookmarked: true,
        });
      }
    }
  };

  const onPublicClick = async () => {
    if (isOwner) {
      const ideaRef = doc(
        dbService,
        "users",
        user.userId,
        "userIdeas",
        userIdea.id
      );
      await updateDoc(ideaRef, { isPublic: !userIdea.isPublic });
    }
  };

  const onDetailClick = () => {
    setViewDetail((prev) => !prev);
  };

  return (
    <>
      <div className="flex items-center px-5 pb-5 gap-5 text-stone-500">
        <button
          className={`${userIdea.isLiked && "text-red-400"}`}
          onClick={onLikeClick}
        >
          <FontAwesomeIcon
            icon={userIdea.isLiked ? fasHeart : farHeart}
            size="lg"
          />
        </button>
        <button
          className={`${userIdea.isBookmarked && "text-orange-400"}`}
          onClick={onBookmarkClick}
        >
          <FontAwesomeIcon
            icon={userIdea.isBookmarked ? fasBookmark : farBookmark}
            size="lg"
          />
        </button>
        {isOwner && (
          <button
            className={`${userIdea.isPublic && "text-sky-400"}`}
            onClick={onPublicClick}
          >
            <FontAwesomeIcon
              icon={userIdea.isPublic ? fasCompass : farCompass}
              size="lg"
            />
          </button>
        )}

        {userIdea.connectedIdeas.length > 0 && (
          <div className="w-full flex justify-end gap-2">
            <ColoredIdeaList
              ideas={userIdea.connectedIdeas}
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
