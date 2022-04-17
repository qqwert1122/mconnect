import React from "react";
import Paper from "@mui/material/Paper";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import NotesRoundedIcon from "@mui/icons-material/NotesRounded";
import ExploreRoundedIcon from "@mui/icons-material/ExploreRounded";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";
import { ThemeProvider } from "@mui/material/styles";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";

const BottomNavigationBar = ({ customHooks }) => {
  return (
    <>
      <div className="w-screen fixed bottom-0 z-20">
        <ThemeProvider theme={customHooks.theme}>
          <Paper
            sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
            elevation={3}
          >
            <BottomNavigation
              showLabels={false}
              value={customHooks.navValue}
              onChange={(event, newValue) => {
                customHooks.setNavValue(newValue);
              }}
            >
              <BottomNavigationAction
                label="Home"
                value="/"
                icon={<HomeRoundedIcon />}
              />
              <BottomNavigationAction
                label="Ideas"
                value="/ideas"
                icon={<NotesRoundedIcon />}
              />
              <BottomNavigationAction
                label="Storming"
                value="/storming"
                icon={<BoltRoundedIcon />}
              />
              <BottomNavigationAction
                label="Explore"
                value="/explore"
                icon={<ExploreRoundedIcon />}
              />
              <BottomNavigationAction
                label="Setting"
                value="/setting"
                icon={<MoreHorizRoundedIcon />}
              />
            </BottomNavigation>
          </Paper>
        </ThemeProvider>
      </div>
    </>
  );
};

export default BottomNavigationBar;
