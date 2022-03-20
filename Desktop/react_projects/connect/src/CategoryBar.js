import "./CategoryBar.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Badge from "@mui/material/Badge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ThemeProvider } from "@mui/material/styles";
import {
  faPalette,
  faCircle,
  faSquare,
  faMinus,
  faDiceD6,
  faA,
} from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/free-regular-svg-icons";

const CategoryBar = ({ customHooks }) => {
  const tabValueHandleChange = (event, newValue) => {
    customHooks.setTabValue(newValue);
  };

  return (
    <div
      class="categorybar flex justify-between"
      style={{
        color: "#2C272E",
        // backgroundColor: `${customHooks.color}`,
        backgroundColor: "#FFFFFF",
      }}
    >
      <ThemeProvider theme={customHooks.theme}>
        <Tabs
          textColor="inherit"
          indicatorColor="primary"
          value={customHooks.tabValue}
          onChange={tabValueHandleChange}
          aria-label="icon label tabs example"
          orientation="vertical"
        >
          <Tab
            icon={
              // <Badge badgeContent={"new"} color="secondary">
              <FontAwesomeIcon icon={faA} size="" />
              // </Badge>
            }
          />
          <Tab icon={<FontAwesomeIcon icon={faCircle} size="2xs" />} />
          <Tab icon={<FontAwesomeIcon icon={faMinus} />} />
          <Tab icon={<FontAwesomeIcon icon={faSquare} size="xs" />} />
          <Tab icon={<FontAwesomeIcon icon={faDiceD6} />} />
        </Tabs>
      </ThemeProvider>
    </div>
  );
};

export default CategoryBar;
