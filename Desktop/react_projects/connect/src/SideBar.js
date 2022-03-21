import "./Main.css";
import "./SideBar.css";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { ThemeProvider } from "@mui/material/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle,
  faCodeBranch,
  faCodeFork,
  faDiceD6,
  faLayerGroup,
  faMinus,
  faPersonDigging,
  faSquare,
} from "@fortawesome/free-solid-svg-icons";

const SideBar = ({ customHooks }) => {
  const menuColor = () => {
    const hexColor = customHooks.color;
    const c = hexColor.substring(1); // 색상 앞의 # 제거
    const rgb = parseInt(c, 16); // rrggbb를 10진수로 변환
    const r = (rgb >> 16) & 0xff; // red 추출
    const g = (rgb >> 8) & 0xff; // green 추출
    const b = (rgb >> 0) & 0xff; // blue 추출
    const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
    // 색상 선택
    return luma < 235 ? customHooks.color : "#2C272E";
  };

  const menuTextColor = () => {
    const hexColor = customHooks.color;
    const c = hexColor.substring(1); // 색상 앞의 # 제거
    const rgb = parseInt(c, 16); // rrggbb를 10진수로 변환
    const r = (rgb >> 16) & 0xff; // red 추출
    const g = (rgb >> 8) & 0xff; // green 추출
    const b = (rgb >> 0) & 0xff; // blue 추출
    const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
    // 색상 선택
    return luma < 235 ? customHooks.textColor : "#EEEEEE";
  };

  const TabPanel = ({ children, sideBarTabValue, index, ...other }) => {
    return (
      <div
        role="tabpanel"
        hidden={customHooks.sideBarTabValue !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {customHooks.sideBarTabValue === index && <span>{children}</span>}
      </div>
    );
  };

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const handleChange = (event, newValue) => {
    customHooks.setSideBarTabValue(newValue);
  };

  const infoMode = <></>;

  return (
    <div
      class="sidebar flex-col pl-2"
      style={{
        color: "#2C272E",
        backgroundColor: "#ffffff",
        // backgroundColor: `${customHooks.color}`,
      }}
    >
      {/* 메뉴 layout */}
      {customHooks.selectedPostIds.length === 0 ? (
        <div></div>
      ) : (
        <ThemeProvider theme={customHooks.theme}>
          <Tabs
            value={customHooks.sideBarTabValue}
            onChange={handleChange}
            aria-label="basic tabs example"
            textColor="inherit"
            indicatorColor="primary"
          >
            <Tab
              label="Thread"
              icon={<FontAwesomeIcon icon={faCodeBranch} />}
              iconPosition="start"
              {...a11yProps(0)}
              sx={{
                fontWeight: "bold",
                fontSize: 15,
                textTransform: "capitalize",
              }}
            />
            <Tab
              label="Stacks"
              icon={<FontAwesomeIcon icon={faLayerGroup} />}
              iconPosition="start"
              {...a11yProps(1)}
              sx={{
                fontWeight: "bold",
                fontSize: 15,
                textTransform: "capitalize",
              }}
            />
          </Tabs>
          <TabPanel value={customHooks.sideBarTabValue} index={0}>
            <div class="border-box flex items-center justify-center text-xl pt-20">
              <FontAwesomeIcon icon={faPersonDigging} />
              &nbsp;<span>공사중</span>
            </div>
          </TabPanel>
          <TabPanel
            value={customHooks.sideBarTabValue}
            index={1}
            sx={{
              boxSizing: "border-box",
              p: 3,
            }}
          >
            {/* selected posts */}
            <div
              class="selectedposts__box border-box flex-col flex-wrap justify-items-center items-center p-1 "
              style={{
                overflow: "scroll",
              }}
            >
              <div>
                {customHooks.posts
                  .filter((fPost) =>
                    customHooks.selectedPostIds.includes(fPost.postId)
                  )
                  .map((mPost) => (
                    <div>
                      <button
                        class="selectedposts border-box flex-col justify-center text-left mt-2  mx-2 p-2 px-4 rounded-3xl"
                        onClick={() => {
                          customHooks.setSelectedPostIds(
                            customHooks.selectedPostIds.filter(
                              (fPostId) => fPostId != mPost.postId
                            )
                          );
                        }}
                      >
                        {/* category */}
                        <div
                          class="flex w-full text-left"
                          style={{
                            fontSize: "12px",
                            wordBreak: "break-all",
                          }}
                        >
                          {mPost.category === 3 ? (
                            <FontAwesomeIcon icon={faDiceD6} />
                          ) : mPost.category === 2 ? (
                            <FontAwesomeIcon icon={faSquare} size="xs" />
                          ) : mPost.category === 1 ? (
                            <FontAwesomeIcon icon={faMinus} />
                          ) : (
                            <FontAwesomeIcon icon={faCircle} size="2xs" />
                          )}
                        </div>
                        {/* text */}
                        <div
                          class="flex w-full text-left"
                          style={{
                            fontSize: "12px",
                            wordBreak: "break-all",
                          }}
                        >
                          {mPost.text}
                        </div>
                        {/* tags */}
                        <div
                          class="flex flex-wrap justify-start"
                          style={{
                            wordBreak: "break-all",
                          }}
                        >
                          {mPost.tags.map((mTag, mIndex) => (
                            <div
                              class="mr-1 mt-1 px-1 rounded-2xl"
                              style={{
                                fontSize: "10px",
                                backgroundColor: "#2C272E",
                                color: "#EEEEEE",
                                transition: "0.5s",
                              }}
                            >
                              {mTag}
                            </div>
                          ))}
                        </div>
                      </button>
                      <hr />
                    </div>
                  ))}
              </div>
            </div>
          </TabPanel>
        </ThemeProvider>
      )}

      {customHooks.selectedPostIds.length <= 1 ? (
        <div></div>
      ) : (
        <div
          class="fixed borderShadow flex justify-center items-center m-5 p-2 rounded-full text-2xl"
          style={{
            right: "0",
            bottom: "0",
            color: `${menuTextColor()}`,
            backgroundColor: `${menuColor()}`,
            transition: "0.5s",
          }}
        >
          <button
            onClick={() => {
              // selected Posts 중 가장 상위 category를 가져옴.
              customHooks.setFormMode(!customHooks.formMode);
            }}
          >
            <Tooltip title="Combine two or more notes to find new ideas.">
              <IconButton
                style={{
                  color: "white",
                  // width: "1.5rem",
                  height: "1.5rem",
                  fontSize: "1rem",
                }}
              >
                <FontAwesomeIcon icon={faCodeFork} />
              </IconButton>
            </Tooltip>
          </button>
        </div>
      )}
    </div>
  );
};

export default SideBar;
