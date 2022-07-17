import { viewerModel } from "@/entities/viewer";
import { League } from "@/shared/api";
import { createEvent, createStore, sample } from "effector-next";

export const buttonClicked = createEvent<League>();

// const $viewerFavoriteLeagues = viewerModel.$viewer.map(viewer => viewer && viewer.favoriteLeagues)
// export const $isInFavorites = createStore<boolean>(false).on(buttonClicked, (_ , league) => $viewerFavoriteLeagues ?)
