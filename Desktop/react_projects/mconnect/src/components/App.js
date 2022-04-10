import AppRouter from "components/Router";
import { useEffect, useState } from "react";
import { createTheme } from "@mui/material/styles";
import fbase, { authService } from "fbase";

const useCustomHooks = () => {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
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
        "Initializing"
      )}
      {customHooks.isLoggedIn ? (
        <footer>&copy; Connect-Ideas {new Date().getFullYear()}</footer>
      ) : (
        <></>
      )}
    </>
  );
};

export default App;
