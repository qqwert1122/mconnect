import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle,
  faCircleNodes,
  faDiceD6,
  faFeatherPointed,
  faLayerGroup,
  faMinus,
  faSquare,
} from "@fortawesome/free-solid-svg-icons";

const Ideas = ({ customHooks }) => {
  const [value, setValue] = useState(0);

  let navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onWritingClick = () => {
    navigate("/writing", { replace: true });
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }

  return (
    <>
      <div
        class="relative"
        style={{
          background: "#eeeeee",
        }}
      >
        <ThemeProvider theme={customHooks.theme}>
          <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
            <Tabs value={value} onChange={handleChange} centered label="top">
              <Tab
                icon={<FontAwesomeIcon icon={faLayerGroup} size="xl" />}
                label="List"
                aria-label="List"
              />
              <Tab
                icon={<FontAwesomeIcon icon={faCircleNodes} size="xl" />}
                label="Connect"
                aria-label="Connect"
              />
            </Tabs>
            <TabPanel value={value} index={0}>
              <div class="flex justify-start gap-2">
                <Chip
                  sx={{ fontSize: "1rem", p: "0.2rem" }}
                  icon={<FontAwesomeIcon icon={faCircle} size="2xs" />}
                  label="Dot"
                  variant="outlined"
                  onClick={() => {}}
                />
                <Chip
                  sx={{ fontSize: "1rem", p: "0.2rem" }}
                  icon={<FontAwesomeIcon icon={faMinus} />}
                  label="Line"
                  variant="outlined"
                  onClick={() => {}}
                />
                <Chip
                  sx={{ fontSize: "1rem", p: "0.2rem" }}
                  icon={<FontAwesomeIcon icon={faSquare} size="xs" />}
                  label="Square"
                  variant="outlined"
                  onClick={() => {}}
                />
                <Chip
                  sx={{ fontSize: "1rem", p: "0.2rem" }}
                  icon={<FontAwesomeIcon icon={faDiceD6} />}
                  label="Cube"
                  variant="outlined"
                  onClick={() => {}}
                />
              </div>
              <Divider />
              <div>gkdl</div>
            </TabPanel>
            <TabPanel value={value} index={1}>
              Item Two
            </TabPanel>
          </Box>
        </ThemeProvider>
        <div class="english__font mt-2 h-60 bg-white">
          <div class="relative highlight mx-4 mt-4 mb-2 text-2xl font-black z-10">
            Ideas 💡
          </div>
        </div>
        <div class="english__font mt-2 h-60 bg-white">
          <div class="relative highlight mx-4 mt-4 mb-2 text-2xl font-black z-10">
            Connect ♾️
          </div>
        </div>
        <div class="english__font mt-2 h-60 bg-white">
          <div class="relative highlight mx-4 mt-4 mb-2 text-2xl font-black z-10">
            Storming ⚡
          </div>
        </div>
        <div class="english__font mt-2 h-60 bg-white">
          <div class="relative highlight mx-4 mt-4 mb-2 text-2xl font-black z-10">
            Explore 🧭
          </div>
        </div>

        <div class="fixed bottom-24 right-10 z-10">
          <button
            class="borderShadow rounded-full w-14 h-14"
            style={{
              color: "#ffffff",
              backgroundColor: "#767676",
            }}
          >
            <FontAwesomeIcon icon={faFeatherPointed} size="xl" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Ideas;
