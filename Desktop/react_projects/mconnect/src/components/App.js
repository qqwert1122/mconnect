import AppRouter from "components/Router";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RecoilRoot, atom, useRecoilState } from "recoil";
import { recoilPersist } from "recoil-persist";
import { createTheme } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import { authService, dbService } from "fbase";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
  addDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  startAfter,
  documentId,
  setDoc,
} from "firebase/firestore";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle,
  faDiceD6,
  faSquare,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";

const { persistAtom } = recoilPersist();
const scrollAtom = atom({
  key: "scrollAtom",
  default: 0,
  effects_UNSTABLE: [persistAtom],
});

const useCustomHooks = () => {
  //auth
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // context
  const [userContext, setUserContext] = useState(0);

  // db props
  const [dbIdeas, setdbIdeas] = useState([]);

  // Ideas props
  const [selectedIdeas, setSelectedIdeas] = useState([]);
  const [tagList, setTagList] = useState([]);
  const [sourceList, setSourceList] = useState([]);
  const [viewIdea, setViewIdea] = useState();

  // scroll
  const [scrollY, setScrollY] = useRecoilState(scrollAtom);

  let navigate = useNavigate();

  const [navValue, setNavValue] = useState("/");

  useEffect(() => {
    navigate(`${navValue}`, { replace: true });
  }, [navValue]);

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
        // const registeredUser = (
        //   await getDoc(doc(dbService, "users", user.uid))
        // ).data();
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

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

  useEffect(() => {
    if (isLoggedIn) {
      // const q1 = query(
      //   collection(dbService, "ideas"),
      //   where("userId", "==", loggedInUser.userId),
      //   orderBy("createdAt", "desc")
      // );

      // const q1 = query(
      //   collection(dbService, "ideas"),
      //   where("id", "in", loggedInUser.users_ideas),
      //   orderBy("createdAt", "desc")
      // );

      const q1 = query(
        collection(dbService, "users", loggedInUser.userId, "userIdeas"),
        orderBy("createdAt", "desc")
      );

      onSnapshot(q1, (snapshot) => {
        const ideas = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setdbIdeas(ideas);
      });
    }
  }, [isLoggedIn]);

  const timeDisplay = (createdAt) => {
    if (dayjs().diff(dayjs(createdAt), "day") >= 31) {
      return <div>{dayjs(createdAt).format("YYYY. MM. DD. HH:mm")}</div>;
    }

    return <div>{dayjs(createdAt).fromNow()}</div>;
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: "#5bb647",
        light: "#8ee976",
        dark: "#238516",
      },
      secondary: {
        main: "#fff44f",
        light: "#ffff83",
        dark: "#c9c208",
      },
    },
  });

  const colorList = [
    "bg-red-400",
    "bg-orange-400",
    "bg-amber-400",
    "bg-yellow-400",
    "bg-lime-400",
    "bg-green-400",
    "bg-emerald-400",
    "bg-teal-400",
    "bg-cyan-400",
    "bg-sky-400",
    "bg-blue-400",
    "bg-indigo-400",
    "bg-violet-400",
    "bg-purple-400",
    "bg-fuchsia-400",
    "bg-pink-400",
    "bg-rose-400",
  ];

  return {
    // getNextPosts,
    loggedInUser,
    setLoggedInUser,
    init,
    setInit,
    isLoggedIn,
    setIsLoggedIn,
    navigate,
    setNavValue,
    navValue,
    dbIdeas,
    setdbIdeas,
    userContext,
    setUserContext,
    viewIdea,
    setViewIdea,
    selectedIdeas,
    setSelectedIdeas,
    tagList,
    setTagList,
    sourceList,
    setSourceList,
    colorList,
    theme,
    timeDisplay,
    scrollY,
    setScrollY,
  };
};

const App = () => {
  const customHooks = useCustomHooks();

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

  return (
    <>{customHooks.init ? <AppRouter customHooks={customHooks} /> : loading}</>
  );
};

export default App;
