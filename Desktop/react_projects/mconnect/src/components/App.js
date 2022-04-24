import AppRouter from "components/Router";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTheme } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import { authService, dbService } from "fbase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import dayjs from "dayjs";
import "dayjs/locale/ko";

const useCustomHooks = () => {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  const [navValue, setNavValue] = useState("/");
  const [dbIdeas, setdbIdeas] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    const q = query(
      collection(dbService, "ideas"),
      orderBy("createdAt", "desc")
    );
    onSnapshot(q, (snapshot) => {
      const ideas = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setdbIdeas(ideas);
    });
  }, []);

  useEffect(() => {
    navigate(`${navValue}`, { replace: true });
  }, [navValue]);

  useEffect(() => {
    authService.onAuthStateChanged(async (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  const timeDisplay = (createdAt) => {
    if (dayjs().diff(dayjs(createdAt), "day") >= 31) {
      return <div>{dayjs(createdAt).format("YYYY. MM. DD. HH:mm:ss")}</div>;
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

  return {
    init,
    setInit,
    isLoggedIn,
    setIsLoggedIn,
    theme,
    navValue,
    setNavValue,
    timeDisplay,
    dbIdeas,
    setdbIdeas,
  };
};

const App = () => {
  const customHooks = useCustomHooks();
  return (
    <>
      {customHooks.init ? (
        <AppRouter customHooks={customHooks} />
      ) : (
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
      )}
      {customHooks.isLoggedIn ? (
        <footer className="english__font h-52 p-3 font-black bg-stone-200">
          &copy; Connecteas {new Date().getFullYear()}
        </footer>
      ) : (
        <></>
      )}
    </>
  );
};

export default App;
