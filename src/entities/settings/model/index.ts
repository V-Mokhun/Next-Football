import { GetTimezonesResponse, rapidApi } from "@/shared/api";
import { createEffect, createEvent, createStore } from "effector-next";

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
