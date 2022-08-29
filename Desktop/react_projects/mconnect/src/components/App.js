import AppRouter from "components/Router";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { authService, dbService, messaging } from "fbase";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
  doc,
  getDocs,
  documentId,
  getDoc,
  updateDoc,
  increment,
  deleteDoc,
} from "firebase/firestore";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from "recoil";
import {
  userState,
  formTitleState,
  formTextState,
  formSourceState,
  formTagsState,
  formPublicState,
  formCnctedIdeasState,
  ideasState,
  selectedIdeasState,
  isEditState,
  whatEditState,
  whatViewState,
  cnctedIdeasState,
} from "atom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/free-regular-svg-icons";

const useDeliverProps = () => {
  console.log("rendering");

  // Auth
  const [loggedInUser, setLoggedInUser] = useRecoilState(userState);
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    authService.onAuthStateChanged(async (user) => {
      if (user) {
        onSnapshot(doc(dbService, "users", user.uid), (doc) => {
          if (doc.data() === undefined) {
            navigate("/signup");
          } else {
            setLoggedInUser(doc.data());
            setIsLoggedIn(true);
          }
        });
        console.log("user snapshot");
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  // Get Ideas when app starts
  const [ideas, setIdeas] = useRecoilState(ideasState);
  const [alarm, setAlarm] = useState({
    boolean: true,
    message: "새 글이 등록되었습니다",
  });
  const toastAlarm = (type) => {
    switch (type) {
      case "new":
        setAlarm({ boolean: true, message: "새 글이 등록되었습니다" });
        break;
      case "delete":
        setAlarm({ boolean: true, message: "글이 삭제되었습니다" });
        break;
    }
    setTimeout(() => {
      setAlarm({ boolean: false, message: "" });
    }, 5000);
  };

  useEffect(() => {
    if (isLoggedIn) {
      const q1 = query(
        collection(dbService, "users", loggedInUser.userId, "userIdeas"),
        orderBy("updatedAt", "desc")
      );
      onSnapshot(q1, (snapshot) => {
        const _ideas = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setIdeas(_ideas);
        console.log("idea snapshot");
      });
    }
  }, [isLoggedIn]);

  // Ideas props
  const selectedIdeas = useRecoilValue(selectedIdeasState);

  // navigate
  let navigate = useNavigate();

  const [navValue, setNavValue] = useState("/ideas");

  const clearWhatView = useResetRecoilState(whatViewState);
  const clearEdit = useResetRecoilState(isEditState);
  const clearWhatEdit = useResetRecoilState(whatEditState);

  const onBackClick = (type = "default") => {
    navigate(-1);
    switch (type) {
      case "view":
        clearWhatView();
        break;
      case "edit":
        clearEdit();
        clearWhatEdit();
        break;
      default:
        break;
    }
  };

  const setWhatView = useSetRecoilState(whatViewState);
  const viewIdea = async (idea) => {
    const countRef = doc(dbService, "counts", idea.id);
    const countData = (await getDoc(countRef)).data();
    const userIdeaRef = doc(
      dbService,
      "users",
      loggedInUser.userId,
      "userIdeas",
      idea.id
    );
    if (countData !== undefined) {
      if (countData.view_users.hasOwnProperty(loggedInUser.userId) === false) {
        await updateDoc(countRef, {
          view_count: increment(1),
          view_users: {
            ...countData.view_users,
            [loggedInUser.userId]: loggedInUser.userName,
          },
        });
        await updateDoc(userIdeaRef, {
          isViewed: true,
        });
        console.log("update view_count");
      }
    }
    setWhatView(idea);
    navigate(`/${idea.id}`);
  };

  useEffect(() => {
    navigate(`${navValue}`, { replace: true });
  }, [navValue]);

  // infinite scroll
  // const [lastVisible, setLastVisible] = useState();

  // const getNextPosts = async () => {
  //   let q;

  //   if (lastVisible === -1) {
  //     return;
  //   } else if (lastVisible) {
  //     q = query(
  //       collection(dbService, "ideas"),
  //       where("userId", "==", loggedInUser.userId),
  //       orderBy("createdAt", "desc"),
  //       limit(5),
  //       startAfter(lastVisible)
  //     );
  //   } else {
  //     q = query(
  //       collection(dbService, "ideas"),
  //       where("userId", "==", loggedInUser.userId),
  //       orderBy("createdAt", "desc"),
  //       limit(5)
  //     );
  //   }

  //   getDocs(q).then((snapshot) => {
  //     setdbIdeas((dbIdeas) => {
  //       const arr = [...dbIdeas];

  //       snapshot.forEach((doc) => {
  //         arr.push(doc.data());
  //       });
  //       console.log(arr);
  //       return arr;
  //     });

  //     if (snapshot.docs.length === 0) {
  //       setLastVisible(-1);
  //     } else {
  //       setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
  //     }
  //   });
  // };

  // useEffect(() => {
  //   getNextPosts();
  // }, []);

  // any functions
  const [cnctedIdeas, setCnctedIdeas] = useRecoilState(cnctedIdeasState);

  const getIdeasFromIDs = async (IDs) => {
    const q1 = query(
      collection(dbService, "users", loggedInUser.userId, "userIdeas"),
      where(documentId(), "in", IDs)
    );
    const ideaRef = await getDocs(q1);
    const newData = ideaRef.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log("get ideas from ids");
    setCnctedIdeas(newData);
  };

  const getIDsFromIdeas = (ideas) => {
    return ideas.map((idea) => idea.id);
  };

  const isItIn = (arr, idea) => {
    return getIDsFromIdeas(arr).includes(idea.id);
  };

  const timeDisplay = (createdAt) => {
    if (dayjs().diff(dayjs(createdAt), "day") >= 31) {
      return <div>{dayjs(createdAt).format("YYYY. MM. DD. HH:mm")}</div>;
    } else {
      return <div>{dayjs(createdAt).fromNow()}</div>;
    }
  };

  // form Props
  const setWhatEdit = useSetRecoilState(whatEditState);
  const setFormTitle = useSetRecoilState(formTitleState);
  const setFormText = useSetRecoilState(formTextState);
  const setFormSource = useSetRecoilState(formSourceState);
  const setFormTags = useSetRecoilState(formTagsState);
  const setFormPublic = useSetRecoilState(formPublicState);
  const setFormCnctedIdeas = useSetRecoilState(formCnctedIdeasState);

  const concatTags = () => {
    if (selectedIdeas.length > 1) {
      const tempoInputTagList = [];
      for (var a in selectedIdeas) {
        for (var b in selectedIdeas[a].tags) {
          if (tempoInputTagList.includes(selectedIdeas[a].tags[b])) {
          } else {
            tempoInputTagList.push(selectedIdeas[a].tags[b]);
          }
        }
      }
      return tempoInputTagList;
    }
  };

  const initForm = () => {
    setWhatEdit();
    setFormTitle("");
    setFormText("");
    setFormSource("");
    setFormPublic(true);
    if (selectedIdeas.length > 1) {
      setFormTags(concatTags());
      setFormCnctedIdeas(selectedIdeas);
    } else {
      setFormTags([]);
      setFormCnctedIdeas([]);
    }
  };

  const initEditor = (idea) => {
    setWhatEdit(idea);
    setFormTitle(idea.title);
    setFormText(idea.text);
    setFormSource(idea.source);
    setFormTags(idea.tags);
    setFormPublic(idea.isPublic);
    if (idea.connectedIDs.length > 0) {
      getIdeasFromIDs(idea.connectedIDs);
      setFormCnctedIdeas(cnctedIdeas);
    }
  };

  // functions with firestore
  const getCount = async (idea) => {
    const data = (await getDoc(doc(dbService, "counts", idea.id))).data();
    if (data === undefined) {
      return undefined;
    } else {
      return data;
    }
    console.log("get count");
  };

  const countUpdate = async (idea, type) => {
    const countRef = doc(dbService, "counts", idea.id);
    const count = (await getDoc(countRef)).data();
    console.log("update counts");
    if (count !== undefined) {
      switch (type) {
        case "like":
          if (idea.isLiked) {
            delete count.like_users[loggedInUser.userId];
            await updateDoc(countRef, {
              like_count: increment(-1),
              like_users: count.like_users,
            });
          } else {
            await updateDoc(countRef, {
              like_count: increment(1),
              like_users: {
                ...count.like_users,
                [loggedInUser.userId]: loggedInUser.userName,
              },
            });
          }
          break;
        case "bookmark":
          if (idea.isBookmarked) {
            delete count.bookmark_users[loggedInUser.userId];
            await updateDoc(countRef, {
              bookmark_count: increment(-1),
              bookmark_users: count.bookmark_users,
            });
          } else {
            await updateDoc(countRef, {
              bookmark_count: increment(1),
              bookmark_users: {
                ...count.bookmark_users,
                [loggedInUser.userId]: loggedInUser.userName,
              },
            });
          }
          break;
      }
    }
  };

  const onLikeUpdate = async (idea) => {
    console.log("update likes");
    const ideaRef = doc(
      dbService,
      "users",
      loggedInUser.userId,
      "userIdeas",
      idea.id
    );
    if (idea.isLiked) {
      await updateDoc(ideaRef, {
        isLiked: false,
      });
    } else {
      await updateDoc(ideaRef, {
        isLiked: true,
      });
    }
  };

  const onBookmarkUpdate = async (idea) => {
    console.log("update bookmark");
    const ideaRef = doc(
      dbService,
      "users",
      loggedInUser.userId,
      "userIdeas",
      idea.id
    );
    if (idea.isBookmarked) {
      await updateDoc(ideaRef, {
        isBookmarked: false,
      });
    } else {
      await updateDoc(ideaRef, {
        isBookmarked: true,
      });
    }
  };

  const onPublicUpdate = async (idea) => {
    console.log("update public");
    const ideaRef = doc(
      dbService,
      "users",
      loggedInUser.userId,
      "userIdeas",
      idea.id
    );
    await updateDoc(ideaRef, { isPublic: !idea.isPublic });
  };

  const onDeleteClick = async (idea) => {
    console.log("delete doc");
    const userIdeaRef = doc(
      dbService,
      "users",
      loggedInUser.userId,
      "userIdeas",
      idea.id
    );
    await deleteDoc(userIdeaRef);
    const userRef = doc(dbService, "users", loggedInUser.userId);
    await updateDoc(userRef, {
      idea_count: increment(-1),
    });
    const countRef = doc(dbService, "counts", idea.id);
    await deleteDoc(countRef);
  };

  // get Trend Keywords from firestore
  const [trends, setTrends] = useState([]);

  useEffect(() => {
    getTrends();
  }, []);

  const getTrends = async () => {
    console.log("get trends");
    const trends = (await getDoc(doc(dbService, "trends", "hotTrends"))).data()
      .tags;
    setTrends(trends);
  };

  return {
    // getNextPosts,
    init,
    setInit,
    isLoggedIn,
    setIsLoggedIn,
    navigate,
    viewIdea,
    onBackClick,
    navValue,
    setNavValue,
    timeDisplay,
    getIdeasFromIDs,
    getIDsFromIdeas,
    isItIn,
    initForm,
    initEditor,
    alarm,
    setAlarm,
    toastAlarm,
    // firestore
    getCount,
    countUpdate,
    onLikeUpdate,
    onBookmarkUpdate,
    onPublicUpdate,
    onDeleteClick,
    trends,
  };
};

const App = () => {
  const props = useDeliverProps();

  const loading = (
    <div className="w-screen h-screen flex justify-center items-center mx-auto">
      <div className="flex-col">
        <div className="flex justify-center text-center">
          <CircularProgress color="inherit" />
        </div>
        <div className="english__font flex justify-center mt-6 text-2xl font-black">
          Loading
        </div>
      </div>
    </div>
  );
  return <>{props.init ? <AppRouter {...props} /> : loading}</>;
};

export default App;
