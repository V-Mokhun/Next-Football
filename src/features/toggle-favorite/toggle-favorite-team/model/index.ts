import { viewerModel } from "@/entities/viewer";
import { BasicTeam, Team } from "@/shared/api";
import { createEvent, createStore, sample } from "effector";

export const buttonClicked = createEvent<BasicTeam>();

export const $loading = createStore<{ id: number; loading: boolean } | null>(
  null
);

const isInFavorites = sample({
  clock: buttonClicked,
  source: viewerModel.$viewerFavoriteTeams,
  fn: (source, clock) => {
    if (!source) return false;
    const favoriteTeam = source.find((team) => team.id === clock.id);

    if (favoriteTeam) return true;
    return false;
  },
});

sample({
  clock: buttonClicked,
  fn: ({ id }) => ({ id, loading: true }),
  target: $loading,
});

sample({
  clock: buttonClicked,
  filter: isInFavorites.map((isFavorite) => isFavorite),
  fn: (team) => team.id,
  target: viewerModel.removeFavoriteTeamFx,
});

sample({
  clock: buttonClicked,
  filter: isInFavorites.map((isFavorite) => !isFavorite),
  target: viewerModel.addFavoriteTeamFx,
});

sample({
  clock: [
    viewerModel.addFavoriteTeamFx.doneData,
    viewerModel.removeFavoriteTeamFx.doneData,
  ],
  filter: ({ success }) => success,
  fn: ({ data }) => data as Team[],
  target: viewerModel.updateTeams,
});

sample({
  clock: [
    viewerModel.addFavoriteTeamFx.doneData,
    viewerModel.removeFavoriteTeamFx.doneData,
  ],
  source: buttonClicked,
  fn: (source) => ({ id: source.id, loading: false }),
  target: $loading,
});
