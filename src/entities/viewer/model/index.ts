import {
  ChangeTimezoneResponse,
  IClientViewer,
  LoginResponse,
  LogoutResponse,
  RegisterResponse,
  viewerApi,
  ViewerRequestBody,
} from "@/shared/api";
import {
  createEffect,
  createEvent,
  createStore,
  forward,
  restore,
} from "effector-next";

export const setViewer = createEvent<IClientViewer | null>();
export const setViewerTimezone = createEvent<string>();
export const logoutViewer = createEvent();

export const setViewerTimezoneFx = createEffect<
  string,
  ChangeTimezoneResponse,
  Error
>(async (timezone) => {
  const response = await viewerApi.changeTimezone(timezone);

  return response;
});

export const registerViewerFx = createEffect<
  ViewerRequestBody,
  RegisterResponse,
  Error
>(async (viewer) => {
  const response = await viewerApi.register(viewer);
  return response;
});

export const loginViewerFx = createEffect<
  ViewerRequestBody,
  LoginResponse,
  Error
>(async (viewer) => {
  const response = await viewerApi.login(viewer);
  return response;
});

export const logoutViewerFx = createEffect<void, LogoutResponse, Error>(
  async () => {
    const response = await viewerApi.logout();

    return response;
  }
);

export const $viewer = restore(setViewer, null)
  .on(setViewerTimezone, (state, timezone) => state && { ...state, timezone })
  .reset(logoutViewer);

export const $viewerTimezone = $viewer.map((state) =>
  state ? state.timezone : ""
);
export const $isAuth = $viewer.map((viewer) => !!viewer);

// Modal
export const openAuthModal = createEvent();
export const closeAuthModal = createEvent();
export const authButtonClicked = createEvent();

export const $authModalOpen = createStore(false)
  .on(openAuthModal, () => true)
  .on(closeAuthModal, () => false);

forward({
  from: authButtonClicked,
  to: openAuthModal,
});
