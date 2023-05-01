import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

export const pagesState = atom({
  key: "pagesState",
  default: ["ideas"],
});

export const userState = atom({
  key: "userState",
  default: null,
});

export const ideasState = atom({
  key: "ideasState",
  default: [],
});

export const selectedIdeasState = atom({
  key: "selectedIdeastState",
  default: [],
});

export const whatEditState = atom({
  key: "whatEditState",
  default: {},
});

export const isEditState = atom({
  key: "isEditState",
  default: false,
});

export const colorsState = atom({
  key: "colorListState",
  default: [
    "bg-gradient-to-br from-cyan-300 to-cyan-500",
    "bg-gradient-to-br from-sky-300 to-sky-500",
    "bg-gradient-to-br from-blue-300 to-blue-500",
    "bg-gradient-to-br from-indigo-300 to-indigo-500",
    "bg-gradient-to-br from-violet-300 to-violet-500",
  ],
});

export const formTitleState = atom({
  key: "formTitleState",
  default: "",
});

export const formTextState = atom({
  key: "formTextState",
  default: "",
});

export const formSourceState = atom({
  key: "formSourceState",
  default: "",
});

export const formTagsState = atom({
  key: "formTagsState",
  default: [],
});

export const formPublicState = atom({
  key: "formPublicState",
  default: true,
});

export const formCnctedIdeasState = atom({
  key: "formCnctedIdeasState",
  default: [],
});

export const chatUserState = atom({
  key: "chatUserState",
  default: [],
});

export const isFirstChatState = atom({
  key: "isFirstChatState",
  default: true,
});

const { persistAtom } = recoilPersist();

export const recentTagsState = atom({
  key: "recentTagListState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const recentSourcesState = atom({
  key: "recentSourceListState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
