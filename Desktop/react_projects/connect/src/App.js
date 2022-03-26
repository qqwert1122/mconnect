import Header from "./Header";
import CategoryBar from "./CategoryBar";
import TagBar from "./TagBar";
import Main from "./Main";
import "./Main.css";
import SideBar from "./SideBar";
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
import moment from "moment";
import Moment from "react-moment";
import "moment/locale/ko";
import { RecoilRoot, atom, useRecoilState } from "recoil";
import { useState, useRef, useEffect, Fragment } from "react";
import { recoilPersist } from "recoil-persist";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateLeft } from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/free-regular-svg-icons";
import { selectClasses } from "@mui/material";

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
    "#95CD41",
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
      category: 0,
      title: "",
      content: "대규모 경제조직에서 CEO의 중요성은 10~14%에 불과하다",
      source: "",
      tags: ["경제", "경영"],
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
        "거래량 없이 갭상승, 갭하락이 있었다면 이는 세력 작품이다. 이 갭은 곧 메워질 가능성이 크다",
      source: "네이버 블로그",
      tags: ["주식", "차트", "기술적분석"],
      like: false,
      bookmark: true,
      connectedPostIds: [],
      time: "2022-02-20T23:59:13",
    },
    {
      postId: 3,
      category: 0,
      title: "",
      content: "비트코인 10개 미만 소유자가 전체 공급량의 13.9%나 차지한다",
      source: "네이버 블로그",
      tags: ["암호화폐", "비트코인", "온체인데이터"],
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
        "현재 국제유가는 배럴당 130달러이다. 러시아 원유 금수조치가 내려질 경우 배럴당 200달러까지 상승이 전망된다.",
      source: "",
      tags: ["경제", "세계", "원자재", "러우크라이나 전쟁"],
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
    "경제",
    "경영",
    "주식",
    "차트",
    "기술적분석",
    "암호화폐",
    "비트코인",
    "온체인데이터",
  ],
  effects_UNSTABLE: [persistAtom],
});

const tagFavoriteAtom = atom({
  key: "tagFavoriteAtom",
  default: ["경제", "경영", "암호화폐", "비트코인"],
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
  const [tempoPost, setTempoPost] = useState([]); // Dialog에서 post 삭제 구현하기 위한 post 값 임시저장
  const topMain = useRef(); // Main 상단으로 부드럽게 이동
  const topTagBar = useRef(); // TagBar 상단으로 부드럽게 이동
  const [time, setTime] = useState(Date.now());

  // Header
  const [tabValue, setTabValue] = useState(0);

  // Main state
  const [filteringParameter, setFilteringParameter] = useState(""); // tag로 post Filter
  const [showingPostIds, setShowingPostIds] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteSnackBarOpen, setDeleteSnackBarOpen] = useState(false);
  const [formErrorSnackBarOpen, setFormErrorSnackBarOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  // TagBar state
  const [tagList, setTagList] = useRecoilState(tagAtom); // posts에서 tagList 따오기
  const [searchTag, setSearchTag] = useState(""); // tag search한 input 값
  const [tagFavoriteList, setTagFavoriteList] = useRecoilState(tagFavoriteAtom); // tagList에서 favorite 값
  const [filterTag, setFilterTag] = useState([]); // tag Click으로 posts list 만들기

  // SideBar state
  const [sideBarMode, setSideBarMode] = useState("");
  const [formMode, setFormMode] = useState(false); // form Mode, click event => true/false
  const [formState, setFormState] = useState("NEW"); // "NEW" : main faplus , "EDIT" : sidebar view or edit, "CONNECT" : selectedpostids > 1 => you can press the connect button
  const [editMode, setEditMode] = useState(false);
  const [selectedPostIds, setSelectedPostIds] = useState([]);
  const [sideBarTabValue, setSideBarTabValue] = useState(0);

  const [lastPostId, setLastPostId] = useRecoilState(lastPostIdAtom); // form post id
  const [inputCategory, setInputCategory] = useState(0);
  const [inputTitle, setInputTitle] = useState("");
  const [inputContent, setInputContent] = useState(""); // form text
  const [inputTag, setInputTag] = useState(""); // form tag
  const [inputTagList, setInputTagList] = useState([]); // form tagList
  const [inputSource, setInputSource] = useState(""); // form source
  const [inputLike, setInputLike] = useState(false); // form like
  const [inputBookmark, setInputBookmark] = useState(false); // form bookmark
  const [inputConnectedPostIds, setInputConnectedPostIds] = useState([]);

  // useEffect
  useEffect(() => {
    setTextColor(getTextColorByBackgroundColor(color));
  }, [color]); // color의 반대색으로 textColor 지정

  useEffect(() => {
    if (colorPicker) {
      setColorPickerDisplay("");
    } else {
      setColorPickerDisplay("none");
    }
  }, [colorPicker]); // colorPicker false 시 display : none

  useEffect(() => {
    switch (selectedPostIds.length) {
      case 1:
        setFormState("EDIT");
        break;
      case 0:
        setFormState("NEW");
        break;
      default:
        setFormState("CONNECT");
        break;
    }
  }, [selectedPostIds]);

  useEffect(() => {
    const newCategory = selectedPostIds
      .map((mId) => posts.findIndex((x) => x.postId === mId))
      .map((mIndex) => posts[mIndex].category)
      .sort(function (a, b) {
        return b - a;
      })[0];

    switch (formState) {
      case "NEW":
        return setInputCategory(0);
      // setInputTitle("");
      // setInputContent("");
      // setInputSource("");
      // setInputTag("");
      // setInputTagList([]);
      // setInputLike(false);
      // setInputBookmark(false);
      // setSelectedPostIds([]);
      // setFormMode(false);

      case "EDIT":
        return setInputCategory(newCategory);
      case "CONNECT":
        switch (newCategory) {
          case 3:
            return setInputCategory(3);
          default:
            return setInputCategory(newCategory + 1);
        }
    }
  }, [formState]);

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
    );
  }, [posts]); // posts가 바뀔 때마다 tagList 변경

  useEffect(() => {
    setTagFavoriteList(
      tagFavoriteList.filter((fTag, fIndex) => tagList.includes(fTag))
    );
  }, [tagList]); // (posts가 바뀔 때마다 tagList가 바뀌면) tagList가 바뀔 때마다 tagFavoriteList 변경

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
  }, [posts, tabValue, filterTag, filteringParameter]); // filter parameter 변경 시마다 showingPostIds를 변경

  // function
  const getTextColorByBackgroundColor = (hexColor) => {
    const c = hexColor.substring(1); // 색상 앞의 # 제거
    const rgb = parseInt(c, 16); // rrggbb를 10진수로 변환
    const r = (rgb >> 16) & 0xff; // red 추출
    const g = (rgb >> 8) & 0xff; // green 추출
    const b = (rgb >> 0) & 0xff; // blue 추출
    const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
    // 색상 선택
    return luma < 127.5 ? "#EEEEEE" : "#2C272E"; // luma 최대값 255, 50% 이상 밝기의 기준 127.5
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
      {/* 삭제 버튼 누르면 나오는 대화상자 */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => {
          setDeleteDialogOpen(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"삭제 알림"}</DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            style={{
              fontSize: "12px",
            }}
          >
            정말 글을 지우시겠다면 '삭제'를 눌러주세요.
            <br />
            삭제된 글은 한 달간 휴지통에 보관됩니다.
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
            취소
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
            삭제
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
  };
};

const App = () => {
  const customHooks = useCustomHooks();

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        backgroundColor: "#ffffff",
        transition: "0.5s",
      }}
    >
      <Header customHooks={customHooks} />
      {/* TagBar, Main, SideBar flex-row로 놓을 자리 */}
      <div class="flex justify-center">
        <CategoryBar customHooks={customHooks} />
        <TagBar customHooks={customHooks} />
        <Main customHooks={customHooks} />
        <SideBar customHooks={customHooks} />
      </div>
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
