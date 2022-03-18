import "./Header.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { ThemeProvider } from "@mui/material/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPalette,
  faCircle,
  faSquare,
  faMinus,
  faDiceD6,
  faA,
} from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/free-regular-svg-icons";

const Header = ({ customHooks }) => {
  // const StyledTabs = styled((props) => (
  //   <Tabs
  //     {...props}
  //     TabIndicatorProps={{
  //       children: <span className="MuiTabs-indicatorSpan" />,
  //     }}
  //   />
  // ))({
  //   "& .MuiTabs-indicator": {
  //     display: "flex",
  //     justifyContent: "center",
  //     backgroundColor: "transparent",
  //   },
  //   "& .MuiTabs-indicatorSpan": {
  //     maxWidth: 40,
  //     width: "100%",
  //     backgroundColor: "#635ee7",
  //     transition: "1s",
  //   },
  // });

  // const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  //   ({ theme }) => ({
  //     textTransform: "none",
  //     fontWeight: theme.typography.fontWeightRegular,
  //     fontSize: theme.typography.pxToRem(15),
  //     marginRight: theme.spacing(1),
  //     color: "rgba(255, 255, 255, 0.7)",
  //     "&.Mui-selected": {
  //       color: "#fff",
  //     },
  //     "&.Mui-focusVisible": {
  //       backgroundColor: "rgba(100, 95, 228, 0.32)",
  //     },
  //   })
  // );

  const showColorPicker = (
    <div
      class="h-28 w-32 rounded-bl-3xl inset-y-16"
      style={{
        position: "absolute",
        right: "0",
        display: `${customHooks.colorPickerDisplay}`,
        transition: "0.5s",
        backgroundColor: `${customHooks.color}`,
      }}
    >
      <div class="flex justify-center items-center">
        <div class="flex justify-center items-center flex-wrap">
          {customHooks.colorList.map((mColor, mIndex) => (
            <button
              class="m-2 mt-2 p-2 border-2 border-solid border-white rounded-xl"
              style={{
                backgroundColor: `${mColor}`,
              }}
              onClick={() => {
                customHooks.setColor(mColor);
                customHooks.setColorPicker(!customHooks.colorPicker);
              }}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );

  const tabValueHandleChange = (event, newValue) => {
    customHooks.setTabValue(newValue);
  };

  return (
    <ThemeProvider theme={customHooks.theme}>
      <div
        class="flex justify-between items-center h-16"
        style={{
          height: "80px",
          color: `${customHooks.textColor}`,
          backgroundColor: `${customHooks.color}`,
          transition: "0.5s",
        }}
      >
        <div class="flex items-center">
          <img class="h-16 mx-2" src="img/logo_connect_ver2.png" />
          <Tabs
            class="flex items-end"
            style={{
              marginLeft: "20%",
            }}
            textColor="inherit"
            indicatorColor="secondary"
            value={customHooks.tabValue}
            onChange={tabValueHandleChange}
            aria-label="icon label tabs example"
          >
            <Tab
              textColor="textColor"
              icon={<FontAwesomeIcon icon={faA} size="xs" />}
              onClick={() => {}}
            />
            <Tab
              textColor="textColor"
              icon={<FontAwesomeIcon icon={faCircle} size="2xs" />}
              onClick={() => {}}
            />
            <Tab icon={<FontAwesomeIcon icon={faMinus} />} onClick={() => {}} />
            <Tab
              icon={<FontAwesomeIcon icon={faSquare} size="xs" />}
              onClick={() => {}}
            />
            <Tab
              icon={<FontAwesomeIcon icon={faDiceD6} />}
              onClick={() => {
                // customHooks.setFilteringParameter("CUBE");
              }}
            />
          </Tabs>
        </div>
        <div class="flex items-center">
          <div>User Info</div>
          <button
            class="mx-4 w-4 h-4 rounded-xl border-2 border-white"
            style={{
              backgroundColor: `${customHooks.color}`,
            }}
            onClick={() => {
              customHooks.setColorPicker(!customHooks.colorPicker);
            }}
          ></button>
        </div>
        {showColorPicker}
      </div>
    </ThemeProvider>
  );
};

export default Header;
