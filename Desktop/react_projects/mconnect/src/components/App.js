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
  const currentUser = authService.currentUser;
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  const [navValue, setNavValue] = useState("/");
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

  useEffect(() => {
    navigate(`${navValue}`, { replace: true });
  }, [navValue]);

  useEffect(() => {
    authService.onAuthStateChanged(async (user) => {
      if (user) {
        setIsLoggedIn(true);
        console.log(user);
        const q = query(
          collection(dbService, "ideas"),
          where("userId", "==", user.uid),
          orderBy("createdAt", "desc")
        );
        onSnapshot(q, (snapshot) => {
          const ideas = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setdbIdeas(ideas);
        });
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

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

  const getCategory = (formCategory) => {
    switch (formCategory) {
      case 3:
        return { icon: <FontAwesomeIcon icon={faDiceD6} />, label: "상자" };
      case 2:
        return {
          icon: <FontAwesomeIcon icon={faSquare} size="sm" />,
          label: "면",
        };
      case 1:
        return { icon: <FontAwesomeIcon icon={faMinus} />, label: "선" };
      case 0:
      default:
        return {
          icon: <FontAwesomeIcon icon={faCircle} size="xs" />,
          label: "점",
        };
    }
  };

  return {
    init,
    setInit,
    isLoggedIn,
    currentUser,
    navValue,
    setNavValue,
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
    getCategory,
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
