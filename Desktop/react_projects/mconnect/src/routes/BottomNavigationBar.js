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
        main: "#fb923c",
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
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
              } else {
                setNavValue(newValue);
              }
            }}
          >
            <BottomNavigationAction
              label="My Ideas"
              value={"/ideas" || "*"}
              icon={<NotesRoundedIcon />}
            />
            <BottomNavigationAction
              label="Explore"
              value="/storming"
              icon={<ExploreRoundedIcon />}
            />
            <BottomNavigationAction
              label="Profile"
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
