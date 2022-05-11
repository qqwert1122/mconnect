import React from "react";
import Paper from "@mui/material/Paper";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import NotesRoundedIcon from "@mui/icons-material/NotesRounded";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import { ThemeProvider } from "@mui/material/styles";

const BottomNavigationBar = ({ customHooks }) => {
  return (
    <>
      <div className="w-screen fixed bottom-0 z-20">
        <ThemeProvider theme={customHooks.theme}>
          <BottomNavigation
            showLabels={false}
            value={customHooks.navValue}
            onChange={(event, newValue) => {
              customHooks.setNavValue(newValue);
            }}
          >
            {/* <BottomNavigationAction
                label="Home"
                value="/"
                icon={<HomeRoundedIcon />}
              /> */}
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
            {/* <BottomNavigationAction
                label="Explore"
                value="/explore"
                icon={<ExploreRoundedIcon />}
              /> */}
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
