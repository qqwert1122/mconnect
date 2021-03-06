import HomePage from "./HomePage";
import MainPage from "./MainPage";
import PublicPage from "./PublicPage";
import LabPage from "./LabPage";
import Header from "./Header";
import "./Main.css";
import "./App.css";
import { createTheme } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { RecoilRoot, atom, useRecoilState } from "recoil";
import { useState, useRef, useEffect, Fragment } from "react";
import { recoilPersist } from "recoil-persist";
import { Routes, Route, Link, Router, Navigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateLeft } from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/free-regular-svg-icons";

// dayjs extends
var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);
var customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);
dayjs.locale("ko");

const { persistAtom } = recoilPersist();

const colorAtom = atom({
  key: "colorAtom",
  default: "#2C272E",
  effects_UNSTABLE: [persistAtom],
});

const colorListAtom = atom({
  key: "colorListAtom",
  default: [
    "#2C272E",
    "#FF6363",
    "#FF6F3C",
    "#FFF44F",
    "#BFFF00",
    "#1C6DD0",
    "#2D4059",
    "#CCA8E9",
    "#EEEEEE",
    "#F0FFC2",
    "#46CDCF",
    "#DFDFDF",
  ],
  effects_UNSTABLE: [persistAtom],
});

const textColorAtom = atom({
  key: "textColorAtom",
  default: "#2C272E",
  effects_UNSTABLE: [persistAtom],
});

const postsAtom = atom({
  key: "postsAtom",
  default: [
    {
      postId: 1,
      category: 1,
      title: "CEO??? ?????????",
      content: "????????? ?????????????????? CEO??? ???????????? 10~14%??? ????????????",
      source: "",
      tags: ["??????", "??????"],
      like: false,
      bookmark: false,
      connectedPostIds: [2, 3],
      time: "2022-02-17T13:24:00",
    },
    {
      postId: 2,
      category: 0,
      title: "",
      content:
        "????????? ?????? ?????????, ???????????? ???????????? ?????? ?????? ????????????. ??? ?????? ??? ????????? ???????????? ??????",
      source: "????????? ?????????",
      tags: ["??????", "??????", "???????????????"],
      like: false,
      bookmark: true,
      connectedPostIds: [],
      time: "2022-02-20T23:59:13",
    },
    {
      postId: 3,
      category: 0,
      title: "",
      content: "???????????? 10??? ?????? ???????????? ?????? ???????????? 13.9%??? ????????????",
      source: "????????? ?????????",
      tags: ["????????????", "????????????", "??????????????????"],
      like: true,
      bookmark: true,
      connectedPostIds: [],
      time: "2022-02-27T17:30:38",
    },
    {
      postId: 4,
      category: 0,
      title: "",
      content:
        "?????? ??????????????? ????????? 130????????????. ????????? ?????? ??????????????? ????????? ?????? ????????? 200???????????? ????????? ????????????.",
      source: "",
      tags: ["??????", "??????", "?????????", "?????????????????? ??????"],
      like: false,
      bookmark: true,
      connectedPostIds: [],
      time: "2022-03-26T17:10:12",
    },
  ],
  effects_UNSTABLE: [persistAtom],
});

const tagAtom = atom({
  key: "tagAtom",
  default: [
    "??????",
    "??????",
    "??????",
    "??????",
    "???????????????",
    "????????????",
    "????????????",
    "??????????????????",
  ],
  effects_UNSTABLE: [persistAtom],
});

const tagFavoriteAtom = atom({
  key: "tagFavoriteAtom",
  default: ["??????", "??????", "????????????", "????????????"],
  effects_UNSTABLE: [persistAtom],
});

const lastPostIdAtom = atom({
  key: "lastPostIdAtom",
  default: 4,
  effects_UNSTABLE: [persistAtom],
});

const useCustomHooks = () => {
  // All state
  const [colorPickerDisplay, setColorPickerDisplay] = useState(""); // colorPicker height
  const [color, setColor] = useRecoilState(colorAtom); // background color
  const [colorList, setColorList] = useRecoilState(colorListAtom); // colorPicker color List
  const [textColor, setTextColor] = useRecoilState(textColorAtom); // text Color
  const [colorPicker, setColorPicker] = useState(false); // colorPicker click event => true/false
  const [posts, setPosts] = useRecoilState(postsAtom); // post List
  const [tempoPost, setTempoPost] = useState([]); // Dialog?????? post ?????? ???????????? ?????? post ??? ????????????
  const topMain = useRef(); // Main ???????????? ???????????? ??????
  const topTagBar = useRef(); // TagBar ???????????? ???????????? ??????
  const [time, setTime] = useState(dayjs());
  // const [selectedPost, setSelectedPost] = useState([]);

  // Header
  const [tabValue, setTabValue] = useState(0);

  // Main state
  const [filteringParameter, setFilteringParameter] = useState(""); // tag??? post Filter
  const [showingPostIds, setShowingPostIds] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteSnackBarOpen, setDeleteSnackBarOpen] = useState(false);
  const [formErrorSnackBarOpen, setFormErrorSnackBarOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  // TagBar state
  const [tagList, setTagList] = useRecoilState(tagAtom); // posts?????? tagList ?????????
  const [searchTag, setSearchTag] = useState(""); // tag search??? input ???
  const [tagFavoriteList, setTagFavoriteList] = useRecoilState(tagFavoriteAtom); // tagList?????? favorite ???
  const [filterTag, setFilterTag] = useState([]); // tag Click?????? posts list ?????????

  // SideBar state
  const [sideBarMode, setSideBarMode] = useState("");
  const [formMode, setFormMode] = useState(false); // form Mode, click event => true/false
  const [formState, setFormState] = useState("NEW"); // "NEW" : main faplus , "EDIT" : sidebar view or edit, "CONNECT" : selectedpostids > 1 => you can press the connect button
  const [editMode, setEditMode] = useState(false);
  const [selectedPostIds, setSelectedPostIds] = useState([]);
  const [sideBarTabValue, setSideBarTabValue] = useState(0);

  const [lastPostId, setLastPostId] = useRecoilState(lastPostIdAtom); // form post id
  const [inputPostId, setInputPostId] = useState(0);
  const [inputCategory, setInputCategory] = useState(0);
  const [inputTitle, setInputTitle] = useState("");
  const [inputContent, setInputContent] = useState(""); // form text
  const [inputTag, setInputTag] = useState(""); // form tag
  const [inputTagList, setInputTagList] = useState([]); // form tagList
  const [inputSource, setInputSource] = useState(""); // form source
  const [inputLike, setInputLike] = useState(false); // form like
  const [inputBookmark, setInputBookmark] = useState(false); // form bookmark
  const [inputConnectedPostIds, setInputConnectedPostIds] = useState([]);
  const [inputTime, setInputTime] = useState(dayjs());

  // useEffect
  useEffect(() => {
    setTextColor(getTextColorByBackgroundColor(color));
  }, [color]); // color??? ??????????????? textColor ??????

  useEffect(() => {
    if (colorPicker) {
      setColorPickerDisplay("");
    } else {
      setColorPickerDisplay("none");
    }
  }, [colorPicker]); // colorPicker false ??? display : none

  useEffect(() => {
    const selectedPost = selectedPostIds
      .map((mId) => posts.findIndex((x) => x.postId === mId))
      .map((mIndex) => posts[mIndex]);

    const newCategory = selectedPostIds
      .map((mId) => posts.findIndex((x) => x.postId === mId))
      .map((mIndex) => posts[mIndex].category)
      .sort(function (a, b) {
        return b - a;
      })[0];

    const tempoinputTagList = [];

    for (var a in selectedPost) {
      for (var b in selectedPost[a].tags) {
        if (tempoinputTagList.includes(selectedPost[a].tags[b])) {
        } else {
          tempoinputTagList.push(selectedPost[a].tags[b]);
        }
      }
    }

    switch (selectedPostIds.length) {
      case 0:
        editClear();
        setEditMode(true);
        setFormState("NEW");
        break;
      case 1:
        setInputPostId(selectedPost[0].postId);
        setInputCategory(selectedPost[0].category);
        setInputTitle(selectedPost[0].title);
        setInputContent(selectedPost[0].content);
        setInputTag("");
        setInputTagList(selectedPost[0].tags);
        setInputSource(selectedPost[0].source);
        setInputLike(selectedPost[0].like);
        setInputBookmark(selectedPost[0].bookmark);
        setInputConnectedPostIds(selectedPost[0].connectedPostIds);
        setInputTime(selectedPost[0].time);
        setFormMode(true);
        if (selectedPost[0].connectedPostIds.length === 0) {
          setEditMode(true);
        } else {
          setEditMode(false);
        }
        setFormState("EDIT");
        break;
      default:
        if (formState == "EDIT") {
          editClear();
        }
        setEditMode(true);
        setFormState("CONNECT");
        setInputTagList(tempoinputTagList);
        switch (newCategory) {
          case 3:
            setInputCategory(3);
            break;
          default:
            setInputCategory(newCategory + 1);
            break;
        }
    }
  }, [selectedPostIds]);

  useEffect(() => {
    const tempoTagList = [];

    for (var a in posts) {
      for (var b in posts[a].tags) {
        if (tempoTagList.includes(posts[a].tags[b])) {
        } else {
          tempoTagList.push(posts[a].tags[b]);
        }
      }
    }
    setTagList(tempoTagList);
    setShowingPostIds(posts.map((mPost) => mPost.postId));
    setSelectedPostIds(
      posts
        .filter((fPost) => selectedPostIds.includes(fPost.postId))
        .map((mPost) => mPost.postId)
        .sort(function (a, b) {
          return b - a;
        })
    );
  }, [posts]); // posts??? ?????? ????????? tagList ??????

  useEffect(() => {
    setTagFavoriteList(
      tagFavoriteList.filter((fTag, fIndex) => tagList.includes(fTag))
    );
  }, [tagList]); // (posts??? ?????? ????????? tagList??? ?????????) tagList??? ?????? ????????? tagFavoriteList ??????

  useEffect(() => {
    const temPoTabValue = tabValue;
    if (temPoTabValue === 0) {
      if (filterTag.length === 0) {
        setShowingPostIds(posts.map((mPost) => mPost.postId));
      } else {
        setShowingPostIds(
          posts
            .map((mPost) => mPost.postId)
            .map((mId) => posts.findIndex((x) => x.postId === mId))
            .filter((fIndex) =>
              filterTag.some((x) => posts[fIndex].tags.includes(x))
            )
            .map((mIndex) => posts[mIndex].postId)
        );
      }
    } else {
      if (filterTag.length === 0) {
        setShowingPostIds(
          posts
            .filter((fPost) => fPost.category === temPoTabValue - 1)
            .map((mPost) => mPost.postId)
        );
      } else {
        setShowingPostIds(
          posts
            .filter((fPost) => fPost.category === temPoTabValue - 1)
            .map((mPost) => mPost.postId)
            .map((mId) => posts.findIndex((x) => x.postId === mId))
            .filter((fIndex) =>
              filterTag.some((x) => posts[fIndex].tags.includes(x))
            )
            .map((mIndex) => posts[mIndex].postId)
        );
      }
    }

    switch (filteringParameter) {
      case "LIKE":
        setShowingPostIds(
          showingPostIds
            .map((mId) => posts.findIndex((x) => x.postId === mId))
            .filter((fIndex) => posts[fIndex].like == true)
            .map((mIndex) => posts[mIndex].postId)
        );
        break;
      case "BOOKMARK":
        setShowingPostIds(
          showingPostIds
            .map((mId) => posts.findIndex((x) => x.postId === mId))
            .filter((fIndex) => posts[fIndex].bookmark == true)
            .map((mIndex) => posts[mIndex].postId)
        );
        break;
    }
  }, [posts, tabValue, filterTag, filteringParameter]); // filter parameter ?????? ????????? showingPostIds??? ??????

  // function
  const editClear = () => {
    setInputCategory(0);
    setInputTitle("");
    setInputContent("");
    setInputSource("");
    setInputTag("");
    setInputTagList([]);
    setInputLike(false);
    setInputBookmark(false);
    setInputConnectedPostIds([]);
    setInputTime(dayjs());
  };

  const getTextColorByBackgroundColor = (hexColor) => {
    const c = hexColor.substring(1); // ?????? ?????? # ??????
    const rgb = parseInt(c, 16); // rrggbb??? 10????????? ??????
    const r = (rgb >> 16) & 0xff; // red ??????
    const g = (rgb >> 8) & 0xff; // green ??????
    const b = (rgb >> 0) & 0xff; // blue ??????
    const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
    // ?????? ??????
    return luma < 127.5 ? "#EEEEEE" : "#2C272E"; // luma ????????? 255, 50% ?????? ????????? ?????? 127.5
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: `${color}`,
      },
      secondary: {
        main: `${textColor}`,
      },
    },
  });

  const handleDeleteSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setDeleteSnackBarOpen(false);
  };

  const timeDisplay = (mPost) => {
    if (dayjs().diff(dayjs(mPost.time), "day") >= 31) {
      return <div>{dayjs(mPost.time).format("YYYY. MM. DD. HH:mm:ss")}</div>;
    }

    return <div>{dayjs(mPost.time).fromNow()}</div>;
  };

  // JSX

  const deleteSnackBarAction = (
    <Fragment>
      <Button
        color="inherit"
        size="small"
        onClick={() => {
          setPosts([...posts, tempoPost]);
          handleDeleteSnackBarClose();
        }}
      >
        <FontAwesomeIcon icon={faArrowRotateLeft} />
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleDeleteSnackBarClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Fragment>
  );

  const deleteDialog = (
    <div>
      {/* ?????? ?????? ????????? ????????? ???????????? */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => {
          setDeleteDialogOpen(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"?????? ??????"}</DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            style={{
              fontSize: "12px",
            }}
          >
            ?????? ?????? ?????????????????? '??????'??? ???????????????.
            <br />
            ????????? ?????? ??? ?????? ???????????? ???????????????.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setDeleteDialogOpen(false);
            }}
            style={{
              fontSize: "12px",
            }}
          >
            ??????
          </Button>
          <Button
            onClick={() => {
              setPosts(posts.filter((fPost, fIndex) => fPost != tempoPost));
              setDeleteDialogOpen(false);
              setDeleteSnackBarOpen(true);
            }}
            autoFocus
            style={{
              fontSize: "12px",
            }}
          >
            ??????
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );

  return {
    colorPickerDisplay,
    setColorPickerDisplay,
    color,
    setColor,
    colorList,
    setColorList,
    textColor,
    setTextColor,
    colorPicker,
    setColorPicker,
    searchTag,
    setSearchTag,
    inputTag,
    setInputTag,
    inputContent,
    setInputContent,
    inputTagList,
    setInputTagList,
    posts,
    setPosts,
    tagList,
    setTagList,
    lastPostId,
    setLastPostId,
    inputLike,
    setInputLike,
    inputBookmark,
    setInputBookmark,
    formMode,
    setFormMode,
    inputSource,
    setInputSource,
    tagFavoriteList,
    setTagFavoriteList,
    filteringParameter,
    setFilteringParameter,
    filterTag,
    setFilterTag,
    topMain,
    topTagBar,
    sideBarMode,
    setSideBarMode,
    showingPostIds,
    setShowingPostIds,
    selectedPostIds,
    setSelectedPostIds,
    deleteDialogOpen,
    setDeleteDialogOpen,
    deleteSnackBarOpen,
    setDeleteSnackBarOpen,
    tempoPost,
    setTempoPost,
    inputCategory,
    setInputCategory,
    inputTitle,
    setInputTitle,
    inputConnectedPostIds,
    setInputConnectedPostIds,
    tabValue,
    setTabValue,
    theme,
    sideBarTabValue,
    setSideBarTabValue,
    formErrorSnackBarOpen,
    setFormErrorSnackBarOpen,
    activeStep,
    setActiveStep,
    deleteDialog,
    deleteSnackBarAction,
    handleDeleteSnackBarClose,
    time,
    setTime,
    formState,
    setFormState,
    editMode,
    setEditMode,
    timeDisplay,
    inputTime,
    setInputTime,
    inputPostId,
    setInputPostId,
  };
};

const App = () => {
  const customHooks = useCustomHooks();

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        transition: "0.5s",
      }}
    >
      <Header customHooks={customHooks} />
      {/* TagBar, Main, SideBar flex-row??? ?????? ?????? */}
      <Routes class="flex justify-center">
        <Route path="/home" element={<HomePage customHooks={customHooks} />} />
        <Route path="/main" element={<MainPage customHooks={customHooks} />} />
        <Route
          path="/public"
          element={<PublicPage customHooks={customHooks} />}
        />
        <Route path="/lab" element={<LabPage customHooks={customHooks} />} />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </div>
  );
};

const Root = () => {
  return (
    <RecoilRoot>
      <App />
    </RecoilRoot>
  );
};

export default Root;
