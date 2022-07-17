import { viewerModel } from "@/entities/viewer";
import { League } from "@/shared/api";
import { createEvent, sample } from "effector-next";

export const buttonClicked = createEvent<League>();

const $viewerFavoriteLeagues = viewerModel.$viewer.map(
  (viewer) => viewer && viewer.favoriteLeagues
);

const isInFavorites = sample({
  clock: buttonClicked,
  source: $viewerFavoriteLeagues,
  fn: (source, clock) => {
    const favoriteLeague = source?.find((league) => league.id === clock.id);

    if (favoriteLeague) return true;
    return false;
  },
});

sample({
  clock: buttonClicked,
	filter: isInFavorites.map(isFavorite => isFavorite),
  fn: (league) => {
    return league.id;
  },
  target: viewerModel.removeFavoriteLeagueFx,
});

sample({
  clock: buttonClicked,
	filter: isInFavorites.map(isFavorite => !isFavorite),
  target: viewerModel.addFavoriteLeagueFx,
});
