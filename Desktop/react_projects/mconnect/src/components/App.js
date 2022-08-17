import AppRouter from "components/Router";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTheme } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import { authService, dbService } from "fbase";
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
} from "firebase/firestore";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  userState,
  ideaListState,
  selectedIdeaListState,
  formTitleState,
  formTextState,
  formSourceState,
  formTagsState,
  formPublicState,
  formCnctedListState,
} from "atom";
import { formCnctedIdeasState } from "atom";
import { ideasState } from "atom";
import { selectedIdeasState } from "atom";
import { whatEditState } from "atom";
import { cnctedIdeaState } from "atom";
import { cnctedIdeasState } from "atom";
import { countState } from "atom";

// const { persistAtom } = recoilPersist();
// const scrollAtom = atom({
//   key: "scrollAtom",
//   default: 0,
//   effects_UNSTABLE: [persistAtom],
// });

const useDeliverProps = () => {
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
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  // Get Ideas when app starts
  const [ideas, setIdeas] = useRecoilState(ideasState);

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
      });
    }
  }, [isLoggedIn]);

  // Ideas props
  const selectedIdeas = useRecoilValue(selectedIdeasState);

  // navigate
  let navigate = useNavigate();

  const [navValue, setNavValue] = useState("/");

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
  const setCnctedIdeas = useSetRecoilState(cnctedIdeasState);

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
    setCnctedIdeas(newData);
  };

  const getIDsFromIdeas = (ideas) => {
    return ideas.map((idea) => idea.id);
  };

  const isItIn = (arr, i) => {
    return getIDsFromIdeas(arr).includes(i.id);
  };

  const isOwner = (idea) => {
    return idea.userId === loggedInUser.userId;
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
      setFormCnctedIdeas(getIdeasFromIDs(idea.connectedIDs));
    }
  };

  // functions with firestore
  const setCount = useSetRecoilState(countState);
  const getCount = async (idea) => {
    const data = (await getDoc(doc(dbService, "counts", idea.id))).data();
    if (data === undefined) {
      setCount();
    } else {
      setCount(data);
    }
  };

  return {
    // getNextPosts,
    init,
    setInit,
    isLoggedIn,
    setIsLoggedIn,
    navigate,
    navValue,
    setNavValue,
    timeDisplay,
    getIdeasFromIDs,
    getIDsFromIdeas,
    isItIn,
    isOwner,
    initForm,
    initEditor,
    // firestore
    getCount,
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
