import { GetTimezonesResponse, rapidApi } from "@/shared/api";
import {
  createEffect,
  createEvent,
  createStore,
  forward,
  sample,
} from "effector";

interface SettingsStore {
  timezones: GetTimezonesResponse["response"];
  timezoneError: string;
}

export const fetchTimezonesFx = createEffect<
  void,
  GetTimezonesResponse["response"],
  Error
>(async () => {
  const { response } = await rapidApi.settingsApi.getTimezones();
  return response;
});

export const openModal = createEvent();
export const closeModal = createEvent();
export const buttonClicked = createEvent();

export const $settings = createStore<SettingsStore>({
  timezones: [],
  timezoneError: "",
})
  .on(fetchTimezonesFx.doneData, (store, response) => ({
    timezoneError: "",
    timezones: response,
  }))
  .on(fetchTimezonesFx.failData, (store, error) => ({
    timezones: [],
    timezoneError: error.message,
  }));

export const $timezonesFetching = fetchTimezonesFx.pending;

export const $modalOpen = createStore(false)
  .on(openModal, () => true)
  .on(closeModal, () => false);

forward({
  from: buttonClicked,
  to: openModal,
});

const $modalOpenedCount = createStore(0).on(openModal, (count) => count + 1);

sample({
  clock: openModal,
  source: $modalOpenedCount,
  filter: (count) => count <= 1,
  target: fetchTimezonesFx,
});
