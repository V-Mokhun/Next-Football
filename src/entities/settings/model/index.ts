import { GetTimezonesResponse, rapidApi } from "@/shared/api";
import {
  createEffect,
  createEvent,
  createStore,
  guard,
  forward,
} from "effector-next";

interface SettingsStore {
  timezones: GetTimezonesResponse["response"];
  activeTimezone: string;
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
export const settingsButtonClicked = createEvent();

export const $settings = createStore<SettingsStore>({
  activeTimezone: "",
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
  from: settingsButtonClicked,
  to: openModal,
});

const $modalOpenedCount = createStore(0).on(openModal, (count) => count + 1);

guard({
  source: $modalOpenedCount,
  clock: openModal,
  filter: (count) => count <= 1,
  target: fetchTimezonesFx,
});
