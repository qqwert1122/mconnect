import React from "react";
import Paper from "@mui/material/Paper";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import NotesRoundedIcon from "@mui/icons-material/NotesRounded";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import { ThemeProvider } from "@mui/material/styles";

const BottomNavigationBar = ({ customHooks }) => {
  const theme = customHooks.theme;
  const navValue = customHooks.navValue;
  const setNavValue = customHooks.setNavValue;

  return (
    <>
      <div className="w-screen fixed bottom-0 z-20">
        <ThemeProvider theme={theme}>
          <BottomNavigation
            showLabels={false}
            value={navValue}
            onChange={(event, newValue) => {
              setNavValue(newValue);
            }}
          >
            <BottomNavigationAction
              label="Ideas"
              value="/"
              icon={<NotesRoundedIcon />}
            />
            <BottomNavigationAction
              label="Storming"
              value="/storming"
              icon={<BoltRoundedIcon />}
            />
            <BottomNavigationAction
              label="MyPage"
              value="/setting"
              icon={<PersonRoundedIcon />}
            />
          </BottomNavigation>
        </ThemeProvider>
      </div>
    </>
  );
};

export default BottomNavigationBar;
