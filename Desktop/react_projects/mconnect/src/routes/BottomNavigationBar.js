import React, { useEffect, useState } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import NotesRoundedIcon from "@mui/icons-material/NotesRounded";
import ExploreRoundedIcon from "@mui/icons-material/ExploreRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const BottomNavigationBar = ({ navValue, setNavValue }) => {
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
              icon={<ExploreRoundedIcon />}
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
