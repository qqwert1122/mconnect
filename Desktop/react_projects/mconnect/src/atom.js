import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

export const userState = atom({
  key: "userState",
  default: null,
});

export const ideasState = atom({
  key: "ideasState",
  default: [],
});

export const cnctedIdeasState = atom({
  key: "cnctedIdeasState",
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
    "bg-red-400",
    "bg-orange-400",
    "bg-amber-400",
    "bg-yellow-400",
    "bg-lime-400",
    "bg-green-400",
    "bg-emerald-400",
    "bg-teal-400",
    "bg-cyan-400",
    "bg-sky-400",
    "bg-blue-400",
    "bg-indigo-400",
    "bg-violet-400",
    "bg-purple-400",
    "bg-fuchsia-400",
    "bg-pink-400",
    "bg-rose-400",
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

export const countState = atom({
  key: "countState",
  default: {},
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
