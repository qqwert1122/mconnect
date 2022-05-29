import { dbService } from "fbase";
import { doc, updateDoc } from "firebase/firestore";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCompass as fasCompass,
  faHeart as fasHeart,
  faBookmark as fasBookmark,
} from "@fortawesome/free-solid-svg-icons";
import {
  faCompass as farCompass,
  faHeart as farHeart,
  faBookmark as farBookmark,
} from "@fortawesome/free-regular-svg-icons";

const IdeaBottom = ({ dbIdea, user }) => {
  const onLikeClick = async () => {
    const ideaRef = doc(dbService, "ideas", `${dbIdea.id}`);
    await updateDoc(ideaRef, {
      like: !dbIdea.like,
      likeUsers: [...dbIdea.likeUsers, user.displayName],
    });
  };

  const onBookmarkClick = async () => {
    const ideaRef = doc(dbService, "ideas", `${dbIdea.id}`);
    await updateDoc(ideaRef, { bookmark: !dbIdea.bookmark });
  };

  const onPublicClick = async () => {
    const ideaRef = doc(dbService, "ideas", `${dbIdea.id}`);
    await updateDoc(ideaRef, { public: !dbIdea.public });
  };

  return (
    <Stack
      direction="row"
      divider={<Divider orientation="vertical" flexItem />}
      spacing={2}
      className="flex justify-around items-center py-2"
    >
      <button
        className="relative w-full text-red-500 text-center "
        onClick={onLikeClick}
      >
        <FontAwesomeIcon icon={dbIdea.like ? fasHeart : farHeart} size="xl" />
        <span className="absolute right-6 bottom-0 text-xs">
          {dbIdea.likeUsers.length != 0 && dbIdea.likeUsers.length}
        </span>
      </button>
      <button
        className=" text-orange-400 text-center w-full"
        onClick={onBookmarkClick}
      >
        <FontAwesomeIcon
          icon={dbIdea.bookmark ? fasBookmark : farBookmark}
          size="xl"
        />
      </button>
      <button
        className="text-sky-400 text-center w-full"
        onClick={onPublicClick}
      >
        <FontAwesomeIcon
          icon={dbIdea.public ? fasCompass : farCompass}
          size="xl"
        />
      </button>
    </Stack>
  );
};

export default IdeaBottom;
