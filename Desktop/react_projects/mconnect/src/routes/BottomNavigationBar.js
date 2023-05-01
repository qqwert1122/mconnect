import React, { useEffect, useState } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import NotesRoundedIcon from "@mui/icons-material/NotesRounded";
import ExploreRoundedIcon from "@mui/icons-material/ExploreRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const BottomNavigationBar = ({ navValue, setNavValue }) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#38bdf8",
      },
    },
  });

  return (
    <>
      <div className="w-screen fixed bottom-0 z-20">
        <ThemeProvider theme={theme}>
          <BottomNavigation
            sx={{ boxShadow: 3 }}
            showLabels={false}
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
              value="/contents"
              icon={<NotesRoundedIcon />}
            />
            <BottomNavigationAction
              value="/storming"
              icon={<ExploreRoundedIcon />}
            />
            <BottomNavigationAction
              value="/searchpage"
              icon={<SearchRoundedIcon />}
            />
            <BottomNavigationAction
              value="/setting"
              icon={<MoreHorizRoundedIcon />}
            />
          </BottomNavigation>
        </ThemeProvider>
      </div>
    </>
  );
};

export default BottomNavigationBar;
