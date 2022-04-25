import Avatar from "@mui/material/Avatar";
import React from "react";
import { dbService } from "fbase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle,
  faQuoteLeft,
  faHashtag,
  faCircleCheck,
  faTrash,
  faCompass as fasCompass,
  faHeart as fasHeart,
  faBookmark as fasBookmark,
} from "@fortawesome/free-solid-svg-icons";
import {
  faCompass as farCompass,
  faHeart as farHeart,
  faBookmark as farBookmark,
} from "@fortawesome/free-regular-svg-icons";

const Idea = ({ dbIdea, customHooks, onIdeasClick, selectedIdeas }) => {
  const onDeleteClick = async () => {
    const ok = window.confirm("정말 삭제하시겠습니까?");
    if (ok) {
      const ideaRef = doc(dbService, "ideas", `${dbIdea.id}`);
      await deleteDoc(ideaRef);
    }
  };

  return (
    <div>
      <hr />
      <div className="mt-5 mb-5">
        <div className="flex justify-between items-center mx-4 mt-2">
          <div className="flex items-end">
            <div className="flex mx-3">
              <Avatar
                alt="avatar"
                src={dbIdea.userPhotoURL}
                sx={{
                  display: "flex",
                  width: "35px",
                  height: "35px",
                }}
              />
            </div>
            <h2>
              <b>{dbIdea.userName}</b>
            </h2>
          </div>
          {/* time */}
          <div className="mx-3">
            <div className="flex items-center gap-2">
              {dbIdea.isClicked ? (
                <></>
              ) : (
                <span className="w-2 h-2 bg-red-400 text-white rounded-full" />
              )}
              <span className="text-sm">
                {customHooks.timeDisplay(dbIdea.createdAt)}
              </span>
            </div>
          </div>
        </div>

        <div
          className={`box-border shadow-xl m-4 p-5 rounded-2xl duration-500 ${
            selectedIdeas.includes(dbIdea) ? "bg-yellow-100" : "bg-stone-200"
          }`}
          onClick={() => {
            onIdeasClick(dbIdea);
          }}
        >
          <div className="flex items-center">
            <FontAwesomeIcon icon={faCircle} size="xs" />
            <div className="mx-3 w-full">
              {dbIdea.text.length > 200 ? (
                <>
                  {dbIdea.text.substr(0, 200)}
                  <span>...</span>
                  <button className="font-black underline">더보기</button>
                </>
              ) : (
                dbIdea.text
              )}
            </div>
          </div>
          {dbIdea.source === "" ? (
            <></>
          ) : (
            <div className="flex items-center pt-3 pb-1">
              <FontAwesomeIcon icon={faQuoteLeft} />
              <div className="mx-3 w-full">{dbIdea.source}</div>
            </div>
          )}
          {dbIdea.tags.length === 0 ? (
            <></>
          ) : (
            <div className="flex items-center ">
              <FontAwesomeIcon icon={faHashtag} />
              <div className="mx-3 w-full">{dbIdea.tags}</div>
            </div>
          )}
        </div>
        {/* like, bookmark, ellipsis */}
        <div className="flex justify-between items-center mx-6 my-4">
          <div className="flex mx-3 gap-4">
            <button className="text-xl text-red-500">
              <FontAwesomeIcon icon={dbIdea.like ? fasHeart : farHeart} />
            </button>
            <button className="text-xl text-orange-400">
              <FontAwesomeIcon
                icon={dbIdea.bookmark ? fasBookmark : farBookmark}
              />
            </button>
            <button className="text-xl text-sky-400">
              <FontAwesomeIcon icon={dbIdea.public ? fasCompass : farCompass} />
            </button>
          </div>
          <div className="flex mx-3 text-xl gap-4">
            <button className="" onClick={onDeleteClick}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
            <button className="">
              <FontAwesomeIcon icon={faCircleCheck} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Idea;
