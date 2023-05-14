import AppRouter from "components/Router";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import algoliasearch from "algoliasearch";
import { authService, dbService } from "fbase";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
  doc,
  getDocs,
  getDoc,
  updateDoc,
  increment,
  deleteDoc,
  limit,
  startAfter,
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
  cnctedIdeasState,
} from "atom";
import BottomNavigationBar from "routes/BottomNavigationBar";

const useDeliverProps = () => {
  const [loggedInUser, setLoggedInUser] = useRecoilState(userState);
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const APP_ID = process.env.REACT_APP_ALGOLIA_APP_ID;
  const API_KEY = process.env.REACT_APP_ALGOLIA_API_KEY;

  const client = algoliasearch(APP_ID, API_KEY);
  const index = client.initIndex("userIdeas");

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
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  let navigate = useNavigate();
  const [navValue, setNavValue] = useState(isLoggedIn ? "/contents" : "/auth");

  useEffect(() => {
    navigate(`${navValue}`, { replace: true });
  }, [navValue]);

  useEffect(() => {
    console.log(isLoggedIn);
    console.log(loggedInUser);
    if (isLoggedIn) {
      console.log("contents");
      setNavValue("/contents");
    } else {
      console.log("auth");
      setNavValue("/auth");
    }
  }, [isLoggedIn]);

  const [ideas, setIdeas] = useRecoilState(ideasState);
  const [alarm, setAlarm] = useState({
    active: false,
    message: "",
  });

  const toastAlarm = (type) => {
    const messages = {
      new: "새 글이 등록되었습니다",
      delete: "글이 삭제되었습니다",
    };

    setAlarm({ active: true, message: messages[type] });

    setTimeout(() => {
      setAlarm({ active: false, message: "" });
    }, 5000);
  };

  const [lastVisible, setLastVisible] = useState();

  const getNextPosts = async () => {
    let q;
    if (lastVisible === -1) {
      return;
    } else if (lastVisible) {
      q = query(
        collection(dbService, "users", loggedInUser.userId, "userIdeas"),
        orderBy("updatedAt", "desc"),
        limit(5),
        startAfter(lastVisible)
      );
    } else {
      q = query(
        collection(dbService, "users", loggedInUser.userId, "userIdeas"),
        orderBy("updatedAt", "desc"),
        limit(5)
      );
    }

    await getDocs(q).then((snapshot) => {
      setIdeas((ideas) => {
        const arr = [...ideas];
        snapshot.forEach((doc) => {
          arr.push(doc.data());
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

  const updateVisiting = async (user) => {
    const userRef = doc(dbService, "users", user.userId);
    await updateDoc(userRef, {
      visitCount: increment(1),
      lastVisitedAt: dayjs().format("YYYY. MM. DD. HH:mm:ss"),
    });
  };

  useEffect(() => {
    if (loggedInUser) {
      getNextPosts();
    }
  }, [loggedInUser]);

  const selectedIdeas = useRecoilValue(selectedIdeasState);

  const clearEdit = useResetRecoilState(isEditState);
  const clearWhatEdit = useResetRecoilState(whatEditState);

  const onBackClick = (type = "default") => {
    switch (type) {
      case "edit":
        clearEdit();
        clearWhatEdit();
        break;
      default:
        break;
    }
    navigate(-1);
  };

  const viewIdea = async (idea, route) => {
    const countRef = doc(dbService, "counts", idea.docId);
    const countData = (await getDoc(countRef)).data();
    const userIdeaRef = doc(
      dbService,
      "users",
      loggedInUser.userId,
      "userIdeas",
      idea.docId
    );
    if (
      countData !== undefined &&
      countData.view_users.hasOwnProperty(loggedInUser.userId) === false
    ) {
      await updateDoc(countRef, {
        view_count: increment(1),
        view_users: {
          ...countData.view_users,
          [loggedInUser.userId]: loggedInUser.userName,
        },
      });
    }
    if (route == "my") {
      await updateDoc(userIdeaRef, {
        isViewed: true,
      });
    }
    navigate(`/contents/${idea.docId}`);
  };

  const getIdeasFromIDs = async (IDs) => {
    const q1 = query(
      collection(dbService, "users", loggedInUser.userId, "userIdeas"),
      where("docId", "in", IDs)
    );
    const ideaRef = await getDocs(q1);
    const newData = ideaRef.docs.map((doc) => doc.data());
    const DIFF_VALUE = IDs.length - newData.length;
    const tempArr = IDs.filter((x, i) => i < DIFF_VALUE).map((x, i) => ({
      docId: -1,
    }));
    return [...newData, ...tempArr];
  };

  const getIDsFromIdeas = (ideas) => {
    return ideas.map((idea) => idea.docId);
  };

  const isItIn = (arr, idea) => {
    return getIDsFromIdeas(arr).includes(idea.docId);
  };

  const timeDisplay = (createdAt) => {
    if (dayjs().diff(dayjs(createdAt), "day") >= 31) {
      return <div>{dayjs(createdAt).format("YYYY. MM. DD. HH:mm")}</div>;
    } else {
      return <div>{dayjs(createdAt).fromNow()}</div>;
    }
  };

  const setWhatEdit = useSetRecoilState(whatEditState);
  const setFormTitle = useSetRecoilState(formTitleState);
  const setFormText = useSetRecoilState(formTextState);
  const setFormSource = useSetRecoilState(formSourceState);
  const setFormTags = useSetRecoilState(formTagsState);
  const setFormPublic = useSetRecoilState(formPublicState);
  const [formCnctedIdeas, setFormCnctedIdeas] =
    useRecoilState(formCnctedIdeasState);

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
    clearWhatEdit();
    setFormTitle("");
    setFormText("");
    setFormSource("");
    setFormPublic(true);
    setFormTags(selectedIdeas.length > 1 ? concatTags() : []);
    setFormCnctedIdeas(selectedIdeas.length > 1 ? selectedIdeas : []);
  };

  const initEditor = (idea) => {
    const { title, text, source, tags, isPublic, connectedIDs } = idea;
    setWhatEdit(idea);
    setFormTitle(title);
    setFormText(text);
    setFormSource(source);
    setFormTags(tags);
    setFormPublic(isPublic);
    if (connectedIDs.length > 0) {
      getIdeasFromIDs(connectedIDs).then((ideas) => setFormCnctedIdeas(ideas));
    } else {
      setFormCnctedIdeas([]);
    }
  };

  const getCount = async (idea) => {
    const docRef = doc(dbService, "counts", idea.docId);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    return data || undefined;
  };

  const countUpdate = async (idea, type) => {
    const countRef = doc(dbService, "counts", idea.docId);
    const count = (await getDoc(countRef)).data();
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
    const ideaRef = doc(
      dbService,
      "users",
      loggedInUser.userId,
      "userIdeas",
      idea.docId
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
    const ideaRef = doc(
      dbService,
      "users",
      loggedInUser.userId,
      "userIdeas",
      idea.docId
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
    const ideaRef = doc(
      dbService,
      "users",
      loggedInUser.userId,
      "userIdeas",
      idea.docId
    );
    await updateDoc(ideaRef, { isPublic: !idea.isPublic });
  };

  const onDeleteClick = async (idea) => {
    const userIdeaRef = doc(
      dbService,
      "users",
      loggedInUser.userId,
      "userIdeas",
      idea.docId
    );
    await deleteDoc(userIdeaRef);
    const userRef = doc(dbService, "users", loggedInUser.userId);
    await updateDoc(userRef, {
      idea_count: increment(-1),
    });
    const countRef = doc(dbService, "counts", idea.docId);
    await deleteDoc(countRef);
    index.deleteObject(idea.searchId);
  };

  // get Trend Keywords from firestore
  const [trends, setTrends] = useState([]);

  useEffect(() => {
    getTrends();
  }, []);

  const getTrends = async () => {
    const trends = (await getDoc(doc(dbService, "trends", "hotTrends"))).data()
      .tags;
    setTrends(trends);
  };

  return {
    setLoggedInUser,
    getNextPosts,
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
    getCount,
    countUpdate,
    onLikeUpdate,
    onBookmarkUpdate,
    onPublicUpdate,
    onDeleteClick,
    trends,
    index,
  };
};

const App = () => {
  const props = useDeliverProps();

  const loading = (
    <div className="w-screen h-screen flex justify-center items-center mx-auto">
      <div className="flex justify-center text-center">
        <CircularProgress color="inherit" />
      </div>
    </div>
  );
  return <div>{props.init ? <AppRouter {...props} /> : loading}</div>;
};

export default App;
