import { viewerModel } from "@/entities/viewer";
import { League } from "@/shared/api";
import { createEvent, createStore, forward, sample } from "effector";

export const buttonClicked = createEvent<League>();

export const $loading = createStore<{ id: number; loading: boolean } | null>(
  null
);

const isInFavorites = sample({
  clock: buttonClicked,
  source: viewerModel.$viewerFavoriteLeagues,
  fn: (source, clock) => {
    if (!source) return false;
    const favoriteLeague = source.find((league) => league.id === clock.id);

    if (favoriteLeague) return true;
    return false;
  },
});

forward({
  from: buttonClicked.map((league) => ({ id: league.id, loading: true })),
  to: $loading,
});

sample({
  clock: buttonClicked,
  filter: isInFavorites.map((isFavorite) => isFavorite),
  fn: (league) => league.id,
  target: viewerModel.removeFavoriteLeagueFx,
});

sample({
  clock: buttonClicked,
  filter: isInFavorites.map((isFavorite) => !isFavorite),
  target: viewerModel.addFavoriteLeagueFx,
});

sample({
  clock: [
    viewerModel.addFavoriteLeagueFx.doneData,
    viewerModel.removeFavoriteLeagueFx.doneData,
  ],
  filter: ({ success }) => success,
  fn: ({ data }) => data as League[],
  target: viewerModel.updateLeagues,
});

sample({
  clock: [
    viewerModel.addFavoriteLeagueFx.doneData,
    viewerModel.removeFavoriteLeagueFx.doneData,
  ],
  source: buttonClicked,
  fn: (source) => ({ id: source.id, loading: false }),
  target: $loading,
});
