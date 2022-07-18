import { viewerModel } from "@/entities/viewer";
import { Team } from "@/shared/api";
import { createEvent, createStore, forward, sample } from "effector-next";

export const buttonClicked = createEvent<Team>();

export const $viewerFavoriteTeams = viewerModel.$viewer.map(
  (viewer) => viewer && viewer.favoriteTeams
);
export const $loading = createStore<{ id: number; loading: boolean } | null>(
  null
);

const isInFavorites = sample({
  clock: buttonClicked,
  source: $viewerFavoriteTeams,
  fn: (source, clock) => {
    if (!source) return false;
    const favoriteTeam = source.find((team) => team.id === clock.id);

    if (favoriteTeam) return true;
    return false;
  },
});

forward({
  from: buttonClicked.map((team) => ({ id: team.id, loading: true })),
  to: $loading,
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
