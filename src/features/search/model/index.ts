import { createEvent, restore } from "effector-next";

type SearchModeStore = "leagues" | "teams";

export const changeSearch = createEvent<string>();
export const changeSearchMode = createEvent<SearchModeStore>();

export const $search = restore(changeSearch, "");
export const $searchMode = restore(changeSearchMode, "leagues");
