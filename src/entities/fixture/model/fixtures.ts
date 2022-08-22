import { FixtureResponse, FixturesQueryParams, rapidApi } from "@/shared/api";
import { createEffect, createEvent, createStore, sample } from "effector";

export const liveFixturesSelected = createEvent();
export const allFixturesSelected = createEvent();

export const fetchFixturesFx = createEffect<
  FixturesQueryParams,
  FixtureResponse[],
  Error
>(async (params) => {
  const { response } = await rapidApi.fixturesApi.getFixtures(params);

  return response;
});

export const $isLiveFixtures =
  createStore<boolean>(false).reset(allFixturesSelected);
export const $buttonsDisabled = createStore<boolean>(false);

export const $fixtures = createStore<{ [key: string]: FixtureResponse[] }[]>(
  []
).reset(fetchFixturesFx.failData);
export const $fixturesError = createStore("").reset(fetchFixturesFx);
export const $fixutresLoading = fetchFixturesFx.pending;

sample({
  clock: liveFixturesSelected,
  fn: () => true,
  target: $isLiveFixtures,
});

sample({
  clock: fetchFixturesFx.failData,
  fn: ({ message }) => message,
  target: $fixturesError,
});
