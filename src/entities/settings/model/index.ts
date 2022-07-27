import { GetTimezonesResponse, rapidApi } from "@/shared/api";
import {
  createEffect,
  createEvent,
  createStore,
  forward,
  guard,
} from "effector";

interface SettingsStore {
  timezones: GetTimezonesResponse["response"];
  timezoneError: string;
}

export const fetchTimezonesFx = createEffect<void, GetTimezonesResponse, Error>(
  async () => {
    const response = await rapidApi.settingsApi.getTimezones();
    return response;
  }
);

export const openModal = createEvent();
export const closeModal = createEvent();
export const buttonClicked = createEvent();

export const $settings = createStore<SettingsStore>({
  timezones: [],
  timezoneError: "",
})
  .on(fetchTimezonesFx.doneData, (store, response) => ({
    ...store,
    timezones: response.response,
  }))
  .on(fetchTimezonesFx.failData, (store, error) => ({
    ...store,
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

guard({
  clock: openModal,
  source: $modalOpenedCount,
  filter: (count) => count <= 1,
  target: fetchTimezonesFx,
});
