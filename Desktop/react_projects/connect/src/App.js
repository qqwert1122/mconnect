import Header from "./Header";
import TagBar from "./TagBar";
import SideBar from "./SideBar";
import Main from "./Main";
import "./Main.css";
import logo from "./logo.svg";
import "./App.css";
import { createTheme } from "@mui/material/styles";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";
import {
  useState,
  useRef,
  useEffect,
  useMemo,
  Fragment,
  useCallback,
} from "react";
import { recoilPersist } from "recoil-persist";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {} from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/free-regular-svg-icons";

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
      text: "대규모 경제조직에서 CEO의 중요성은 10~14%에 불과하다",
      source: "",
      tags: ["경제", "경영"],
      like: false,
      bookmark: false,
      connectedPostIds: [],
    },
    {
      postId: 2,
      category: 0,
      title: "",
      text: "거래량 없이 갭상승, 갭하락이 있었다면 이는 세력 작품이다. 이 갭은 곧 메워질 가능성이 크다",
      source: "네이버 블로그",
      tags: ["주식", "차트", "기술적분석"],
      like: false,
      bookmark: true,
      connectedPostIds: [],
    },
    {
      postId: 3,
      category: 0,
      title: "",
      text: "비트코인 10개 미만 소유자가 전체 공급량의 13.9%나 차지한다",
      source: "네이버 블로그",
      tags: ["암호화폐", "비트코인", "온체인데이터"],
      like: true,
      bookmark: true,
      connectedPostIds: [],
    },
    {
      postId: 4,
      category: 0,
      title: "",
      text: "현재 국제유가는 배럴당 130달러이다. 러시아 원유 금수조치가 내려질 경우 배럴당 200달러까지 상승이 전망된다.",
      source: "",
      tags: ["경제", "세계", "원자재", "러우크라이나 전쟁"],
      like: false,
      bookmark: true,
      connectedPostIds: [],
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

  // Header
  const [tabValue, setTabValue] = useState(0);

  // Main state
  const [lastPostId, setLastPostId] = useRecoilState(lastPostIdAtom); // form post id
  const [inputCategory, setInputCategory] = useState(0);
  const [inputTitle, setInputTitle] = useState("");
  const [inputContent, setInputContent] = useState(""); // form text
  const [inputTag, setInputTag] = useState(""); // form tag
  const [inputTagList, setInputTagList] = useState([]); // form tagList
  const [inputSource, setInputSource] = useState(""); // form source
  const [inputLike, setInputLike] = useState(false); // form like
  const [inputBookmark, setInputBookmark] = useState(false); // form bookmark
  const [inputConnectedPostId, setInputConnectedPostId] = useState([]);
  const [formMode, setFormMode] = useState(false); // form Mode, click event => true/false
  const [formDisplay, setFormDisplay] = useState(0); // form height
  const [filteringParameter, setFilteringParameter] = useState(""); // tag로 post Filter
  const [showingPostIds, setShowingPostIds] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteSnackBarOpen, setDeleteSnackBarOpen] = useState(false);

  // TagBar state
  const [tagList, setTagList] = useRecoilState(tagAtom); // posts에서 tagList 따오기
  const [searchTag, setSearchTag] = useState(""); // tag search한 input 값
  const [tagFavoriteList, setTagFavoriteList] = useRecoilState(tagFavoriteAtom); // tagList에서 favorite 값
  const [filterTag, setFilterTag] = useState([]); // tag Click으로 posts list 만들기

  // SideBar state
  const [sideBarMode, setSideBarMode] = useState("");
  const [selectedPostIds, setSelectedPostIds] = useState([]);

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
    if (formMode) {
      if (selectedPostIds.length === 0 || inputCategory === 0) {
        setFormDisplay("200px");
      } else {
        setFormDisplay("80%");
      }
    } else {
      setFormDisplay("0px");
    }
  }, [formMode, inputCategory, selectedPostIds]); // formMode true 시 form height 200px

  useEffect(() => {
    const newCategory = selectedPostIds
      .map((mId) => posts.findIndex((x) => x.postId === mId))
      .map((mIndex) => posts[mIndex].category)
      .sort(function (a, b) {
        return b - a;
      })[0];

    if (newCategory === 3) {
      return setInputCategory(3);
    } else {
      return setInputCategory(newCategory + 1);
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
      // selectedPostIds.filter((fPost, fIndex) => posts.includes(fPost))
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

  // JSX

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
    formDisplay,
    setFormDisplay,
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
    inputConnectedPostId,
    setInputConnectedPostId,
    tabValue,
    setTabValue,
    theme,
  };
};

const App = () => {
  const customHooks = useCustomHooks();

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        backgroundColor: `${customHooks.color}`,
        transition: "0.5s",
      }}
    >
      <Header customHooks={customHooks} />
      {/* TagBar, Main, SideBar flex-row로 놓을 자리 */}
      <div class="flex">
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
