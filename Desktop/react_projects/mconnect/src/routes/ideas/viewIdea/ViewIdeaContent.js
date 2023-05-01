import { useEffect, useRef, useState } from "react";
import { dbService } from "fbase";
import {
  doc,
  setDoc,
  updateDoc,
  increment,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import algoliasearch from "algoliasearch";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHashtag,
  faQuoteLeft,
  faCompass as fasCompass,
  faHeart as fasHeart,
  faBookmark as fasBookmark,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";
import {
  faCompass as farCompass,
  faHeart as farHeart,
  faBookmark as farBookmark,
} from "@fortawesome/free-regular-svg-icons";
import { ideasState } from "atom";
import { useRecoilState } from "recoil";
import { v4 } from "uuid";
import dayjs from "dayjs";

const ViewIdeaContent = ({
  open,
  user,
  navigate,
  itemChangeProps,
  handleEllipsisClick,
  isOwner,
  timeDisplay,
  count,
  setCount,
  content,
  setContent,
  countUpdate,
  onLikeUpdate,
  onBookmarkUpdate,
  onPublicUpdate,
  isDeleted,
}) => {
  const [ideas, setIdeas] = useRecoilState(ideasState);

  const ideaRef = doc(
    dbService,
    "users",
    user.userId,
    "userIdeas",
    content.docId
  );

  const countRef = doc(dbService, "counts", content.docId);
  const userIdeaRef = doc(
    dbService,
    "users",
    user.userId,
    "userIdeas",
    content.docId
  );
  const userRef = doc(dbService, "users", user.userId);

  const onLikeClick = async () => {
    if (isOwner) {
      onLikeUpdate(content);
      countUpdate(content, "like");
      if (count.like_users.hasOwnProperty(user.userId)) {
        delete count.like_users[user.userId];
        setCount((prevCount) => ({
          ...prevCount,
          like_count: prevCount.like_count - 1,
        }));
      } else {
        setCount((prevCount) => ({
          ...prevCount,
          like_count: prevCount.like_count + 1,
          like_users: {
            ...prevCount.like_users,
            [user.userId]: user.userName,
          },
        }));
      }
      setContent({ ...content, isLiked: !content.isLiked });
      setIdeas(
        ideas.map((m) =>
          m.docId === content.docId
            ? { ...content, isLiked: !content.isLiked }
            : m
        )
      );
    } else {
      if (count.like_users.hasOwnProperty(user.userId)) {
        delete count.like_users[user.userId];
        setCount((prevCount) => ({
          ...prevCount,
          like_count: prevCount.like_count - 1,
        }));
        await updateDoc(countRef, {
          like_count: increment(-1),
          like_users: count.like_users,
        });
      } else {
        setCount((prevCount) => ({
          ...prevCount,
          like_count: prevCount.like_count + 1,
          like_users: {
            ...prevCount.like_users,
            [user.userId]: user.userName,
          },
        }));
        await updateDoc(countRef, {
          like_count: increment(1),
          like_users: {
            ...count.like_users,
            [user.userId]: user.userName,
          },
        });
      }
      setContent({ ...content, isLiked: !content.isLiked });
    }
  };

  const APP_ID = process.env.REACT_APP_ALGOLIA_APP_ID;
  const API_KEY = process.env.REACT_APP_ALGOLIA_API_KEY;
  const client = algoliasearch(APP_ID, API_KEY);
  const index = client.initIndex("userIdeas");

  const onBookmarkClick = async (idea) => {
    if (isOwner) {
      onBookmarkUpdate(content);
      countUpdate(content, "bookmark");
      if (count.bookmark_users.hasOwnProperty(user.userId)) {
        delete count.bookmark_users[user.userId];
        setCount((prevCount) => ({
          ...prevCount,
          bookmark_count: prevCount.bookmark_count - 1,
        }));
      } else {
        setCount((prevCount) => ({
          ...prevCount,
          bookmark_count: prevCount.bookmark_count + 1,
          bookmark_users: {
            ...prevCount.bookmark_users,
            [user.userId]: user.userName,
          },
        }));
      }
      setContent({ ...content, isBookmarked: !content.isBookmarked });
      setIdeas(
        ideas.map((m) =>
          m.docId === content.docId
            ? { ...content, isBookmarked: !content.isBookmarked }
            : m
        )
      );
    } else {
      if (count.bookmark_users.hasOwnProperty(user.userId)) {
        delete count.bookmark_users[user.userId];
        await updateDoc(countRef, {
          bookmark_count: increment(-1),
          bookmark_users: count.bookmark_users,
        });
        deleteDoc(ideaRef);
        await updateDoc(userRef, {
          idea_count: increment(-1),
        });
        setIdeas(ideas.filter((f) => f.docId !== content.docId));
        index.deleteObject(content.searchId);
        navigate(-1);
      } else {
        setCount((prevCount) => ({
          ...prevCount,
          bookmark_count: prevCount.bookmark_count + 1,
          bookmark_users: {
            ...prevCount.bookmark_users,
            [user.userId]: user.userName,
          },
        }));
        await updateDoc(countRef, {
          bookmark_count: increment(1),
          bookmark_users: {
            ...count.bookmark_users,
            [user.userId]: user.userName,
          },
        });
        setContent({ ...content, isBookmarked: !content.isBookmarked });
        setIdeas(
          ideas.map((m) =>
            m.docId === content.docId
              ? { ...content, isBookmarked: !content.isBookmarked }
              : m
          )
        );
        const newIdeaId = v4();
        const _document = {
          docId: content.docId,
          userId: content.userId,
          userName: content.userName,
          userPhotoURL: content.userPhotoURL,
          title: content.title,
          text: content.text,
          source: content.source,
          tags: content.tags,
          connectedIDs: content.connectedIDs,
          createdAt: content.createdAt,
          updatedAt: dayjs().format("YYYY. MM. DD. HH:mm:ss"),
        };
        const document = {
          ..._document,
          searchId: newIdeaId,
          isPublic: false,
          isLiked: count.like_users.hasOwnProperty(user.userId),
          isBookmarked: true,
          isViewed: count.view_users.hasOwnProperty(user.userId),
          isOriginal: false,
        };
        await setDoc(userIdeaRef, { ...document });
        await updateDoc(userRef, {
          idea_count: increment(1),
        });
        setIdeas([{ ...document }, ...ideas]);
        index.saveObject({ ..._document, objectID: newIdeaId });
      }
    }
  };

  const onPublicClick = () => {
    if (isOwner) {
      onPublicUpdate(content);
      setContent({ ...content, isPublic: !content.isPublic });
    }
    setIdeas(
      ideas.map((m) =>
        m.docId === content.docId
          ? { ...content, isPublic: !content.isPublic }
          : m
      )
    );
    const _idea = {
      docId: content.docId,
      userId: content.userId,
      userName: content.userName,
      userPhotoURL: content.userPhotoURL,
      title: content.title,
      text: content.text,
      source: content.source,
      tags: content.tags,
      connectedIDs: content.connectedIDs,
      createdAt: content.createdAt,
      updatedAt: content.updatedAt,
    };
    index.saveObject({
      ..._idea,
      isPublic: !content.isPublic,
      objectID: content.searchId,
    });
  };

  return (
    <div className="relative">
      <div>
        {content.title !== "" && (
          <div className="flex px-5 pt-5 font-black text-lg break-all">
            {content.title}
          </div>
        )}
        <div
          className={`${
            content.title === "" ? "p-5" : "px-5 py-3 pb-5"
          } flex items-center gap-2`}
        >
          <Avatar
            className="border-2"
            alt="avatar"
            src={isOwner ? user.userPhotoURL : content.userPhotoURL}
            sx={{
              display: "flex",
              width: "30px",
              height: "30px",
            }}
          />
          <div className="flex-col text-xs">
            <span className="font-black flex">
              {isOwner ? user.userName : content.userName}
            </span>
            <span className="flex">{content.createdAt}</span>
          </div>
        </div>

        <div className="flex p-5 text-base break-all whitespace-pre-line">
          <span>{content.text}</span>
        </div>
        {content.source.length != 0 && (
          <div className="flex flex-wrap items-center p-5 py-2 gap-2 text-stone-400 text-xs break-all">
            <span className="text-stone-300">
              <FontAwesomeIcon icon={faQuoteLeft} />
            </span>
            <span>{content.source}</span>
          </div>
        )}
        {content.tags.length != 0 && (
          <div className="flex flex-wrap items-center p-5 pt-1 pb-4 gap-1 text-stone-400 text-xs word-breaks">
            <span className="pt-1 text-stone-300">
              <FontAwesomeIcon icon={faHashtag} />
            </span>
            {content.tags.map((tag, index) => (
              <span key={index}>
                {index === content.tags.length - 1 ? tag : `${tag},`}
              </span>
            ))}
          </div>
        )}
        {isOwner === false && (
          <div className="flex items-start p-5 pt-1 pb-4 text-stone-400 text-xs">
            {timeDisplay(content.updatedAt)}에 저장됨
          </div>
        )}

        {isDeleted ? (
          <div className="flex items-center p-5 pt-1 pb-4 gap-1 text-stone-300 text-xs">
            <FontAwesomeIcon icon={faCircleInfo} />원 작성자가 삭제한
            아이디어입니다.
          </div>
        ) : (
          <button
            className="flex items-start p-5 pt-1 pb-4 gap-2 text-stone-400 text-xs"
            onClick={handleEllipsisClick}
          >
            <span>
              조회&nbsp;
              {count.view_count}
            </span>
            {count.like_count != 0 && (
              <span
                aria-controls={open ? "demo-positioned-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                좋아요&nbsp;
                {count.like_count}
              </span>
            )}
            {count.bookmark_count != 0 && (
              <span>저장됨&nbsp;{count.bookmark_count}</span>
            )}
          </button>
        )}
      </div>

      <hr />
      <div
        className={`flex items-center px-5 py-4 gap-4 duration-100 ${
          itemChangeProps != 0 && "blur-sm"
        }`}
      >
        <button className="text-red-400 px-2" onClick={onLikeClick}>
          <FontAwesomeIcon
            icon={
              count.like_users.hasOwnProperty(user.userId) ? fasHeart : farHeart
            }
            size="lg"
          />
        </button>
        <button className="text-orange-400 px-2" onClick={onBookmarkClick}>
          <FontAwesomeIcon
            icon={
              count.bookmark_users.hasOwnProperty(user.userId)
                ? fasBookmark
                : farBookmark
            }
            size="lg"
          />
        </button>
        {isOwner && (
          <button className="text-sky-400 px-2" onClick={onPublicClick}>
            <FontAwesomeIcon
              icon={content.isPublic ? fasCompass : farCompass}
              size="lg"
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default ViewIdeaContent;
