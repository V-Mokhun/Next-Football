import {
  AddFavoriteLeagueResponse,
  AddFavoriteTeamResponse,
  ChangePasswordRequest,
  ChangePasswordResponse,
  ChangeTimezoneResponse,
  IClientViewer,
  League,
  LoginResponse,
  LogoutResponse,
  MeResponse,
  RegisterResponse,
  RemoveFavoriteLeagueResponse,
  RemoveFavoriteTeamResponse,
  Team,
  viewerApi,
  ViewerRequestBody,
} from "@/shared/api";
import {
  createEffect,
  createEvent,
  createStore,
  restore,
  sample,
} from "effector";

export const setViewer = createEvent<IClientViewer | null>();
export const changeViewerTimezone = createEvent<string>();
export const updateLeagues = createEvent<League[]>();
export const updateTeams = createEvent<Team[]>();
export const logoutViewer = createEvent();

export const loadViewerFx = createEffect<string | void, MeResponse, Error>(
  async (cookie) => {
    const response = await viewerApi.me(cookie || undefined);

    return response;
  }
);

export const registerFx = createEffect<
  ViewerRequestBody,
  RegisterResponse,
  Error
>(async (viewer) => {
  const response = await viewerApi.register(viewer);
  return response;
});

export const loginFx = createEffect<ViewerRequestBody, LoginResponse, Error>(
  async (viewer) => {
    const response = await viewerApi.login(viewer);
    return response;
  }
);

export const logoutFx = createEffect<void, LogoutResponse, Error>(async () => {
  const response = await viewerApi.logout();

  return response;
});

export const changePasswordFx = createEffect<
  ChangePasswordRequest,
  ChangePasswordResponse,
  Error
>(async (body) => {
  const response = await viewerApi.changePassword(body);

  return response;
});

export const changeTimezoneFx = createEffect<
  string,
  ChangeTimezoneResponse,
  Error
>(async (timezone) => {
  const response = await viewerApi.changeTimezone(timezone);

  return response;
});

export const addFavoriteLeagueFx = createEffect<
  League,
  AddFavoriteLeagueResponse,
  Error
>(async (league) => {
  const response = await viewerApi.addFavoriteLeague(league);

  return response;
});

export const removeFavoriteLeagueFx = createEffect<
  number,
  RemoveFavoriteLeagueResponse,
  Error
>(async (id) => {
  const response = await viewerApi.removeFavoriteLeague(id);

  return response;
});

export const addFavoriteTeamFx = createEffect<
  Team,
  AddFavoriteTeamResponse,
  Error
>(async (team) => {
  const response = await viewerApi.addFavoriteTeam(team);

  return response;
});

export const removeFavoriteTeamFx = createEffect<
  number,
  RemoveFavoriteTeamResponse,
  Error
>(async (id) => {
  const response = await viewerApi.removeFavoriteTeam(id);

  return response;
});

export const $viewer = restore(setViewer, null)
  .on(
    changeViewerTimezone,
    (state, timezone) => state && { ...state, timezone }
  )
  .on(
    updateLeagues,
    (state, leagues) => state && { ...state, favoriteLeagues: leagues }
  )
  .on(
    updateTeams,
    (state, teams) => state && { ...state, favoriteTeams: teams }
  )
  .reset(logoutViewer);

export const $viewerTimezone = $viewer.map((state) =>
  state ? state.timezone : ""
);
export const $viewerFavoriteTeams = $viewer.map((state) =>
  state ? state.favoriteTeams : []
);
export const $viewerFavoriteLeagues = $viewer.map((state) =>
  state ? state.favoriteLeagues : []
);
export const $isAuthenticated = $viewer.map((viewer) => !!viewer);

// Modal
export const openAuthModal = createEvent();
export const closeAuthModal = createEvent();
export const buttonClicked = createEvent();

export const $authModalOpen = createStore(false)
  .on(openAuthModal, () => true)
  .on(closeAuthModal, () => false);

sample({
  clock: buttonClicked,
  target: openAuthModal,
});
