import React, { useEffect, useState } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import NotesRoundedIcon from "@mui/icons-material/NotesRounded";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import ExploreRoundedIcon from "@mui/icons-material/ExploreRounded";
import { ThemeProvider } from "@mui/material/styles";

const BottomNavigationBar = ({ customHooks }) => {
  const theme = customHooks.theme;
  const navigate = customHooks.navigate;
  const navValue = customHooks.navValue;
  const setNavValue = customHooks.setNavValue;

  return (
    <>
      <div className="w-screen fixed bottom-0 shadow-inner z-20">
        <ThemeProvider theme={theme}>
          <BottomNavigation
            // showLabels={true}
            value={navValue}
            onChange={(event, newValue) => {
              if (navValue === newValue) {
                window.scrollTo(0, 0);
              } else {
                setNavValue(newValue);
              }
            }}
          >
            <BottomNavigationAction
              // label="아이디어"
              value={"/ideas" || "*"}
              icon={<NotesRoundedIcon />}
            />
            <BottomNavigationAction
              // label="번쩍"
              value="/storming"
              icon={<BoltRoundedIcon />}
            />
            {/* <BottomNavigationAction
              // label="탐색"
              value="/explore"
              icon={<ExploreRoundedIcon />}
            /> */}
            <BottomNavigationAction
              // label="프로필"
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
