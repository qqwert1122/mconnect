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

export const whatViewState = atom({
  key: "whatViewState",
  default: {},
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
    "bg-gradient-to-br from-red-400 via-pink-400 to-purple-600",
    "bg-gradient-to-br from-pink-400 via-orange-400 to-amber-600",
    "bg-gradient-to-br from-lime-400 via-green-400 to-emerald-600",
    "bg-gradient-to-br from-teal-400 via-cyan-400 to-sky-600",
    "bg-gradient-to-br from-blue-400 via-indigo-400 to-violet-600",
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
