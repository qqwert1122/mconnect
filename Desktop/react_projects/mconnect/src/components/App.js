import AppRouter from "components/Router";
import { useEffect, useState } from "react";
import { createTheme } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import { authService } from "fbase";

const useCustomHooks = () => {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);

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

  const theme = createTheme({
    palette: {
      primary: {
        main: "#5bb647",
      },
      secondary: {
        main: "#BFFF00",
      },
    },
  });

  return {
    init,
    setInit,
    isLoggedIn,
    setIsLoggedIn,
    theme,
  };
};

const App = () => {
  const customHooks = useCustomHooks();

  return (
    <>
      {customHooks.init ? (
        <>
          <AppRouter customHooks={customHooks} />
        </>
      ) : (
        <div class="w-screen h-screen flex justify-center items-center">
          <CircularProgress />
        </div>
      )}
      {customHooks.isLoggedIn ? (
        <footer class="h-52">
          &copy; Connect-Ideas {new Date().getFullYear()}
        </footer>
      ) : (
        <></>
      )}
    </>
  );
};

export default App;
