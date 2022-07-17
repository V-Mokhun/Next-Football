import {
  AddFavoriteLeagueResponse,
  AddFavoriteTeamResponse,
  ChangePasswordRequest,
  ChangePasswordResponse,
  ChangeTimezoneResponse,
  GetFavoriteLeaguesResponse,
  GetFavoriteTeamsResponse,
  IClientViewer,
  League,
  LoginResponse,
  LogoutResponse,
  RegisterResponse,
  RemoveFavoriteLeagueResponse,
  RemoveFavoriteTeamResponse,
  Team,
  viewerApi,
  ViewerRequestBody
} from "@/shared/api";
import {
  createEffect,
  createEvent,
  createStore,
  forward,
  restore
} from "effector-next";

export const setViewer = createEvent<IClientViewer | null>();
export const changeViewerTimezone = createEvent<string>();
export const logoutViewer = createEvent();

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

export const getFavoriteLeaguesFx = createEffect<
  void,
  GetFavoriteLeaguesResponse,
  Error
>(async () => {
  const response = await viewerApi.getFavoriteLeagues();

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

export const getFavoriteTeamsFx = createEffect<
  void,
  GetFavoriteTeamsResponse,
  Error
>(async () => {
  const response = await viewerApi.getFavoriteTeams();

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
  .reset(logoutViewer);

export const $viewerTimezone = $viewer.map((state) =>
  state ? state.timezone : ""
);
export const $isAuthenticated = $viewer.map((viewer) => !!viewer);

// Modal
export const openAuthModal = createEvent();
export const closeAuthModal = createEvent();
export const buttonClicked = createEvent();

export const $authModalOpen = createStore(false)
  .on(openAuthModal, () => true)
  .on(closeAuthModal, () => false);

forward({
  from: buttonClicked,
  to: openAuthModal,
});
