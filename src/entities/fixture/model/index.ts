import {
  FixtureResponse,
  FixturesQueryParams,
  GetFixturesResponse,
  rapidApi,
} from "@/shared/api";
import { createEffect, createEvent, createStore, sample } from "effector";

export const liveFixturesSelected = createEvent();
export const allFixturesSelected = createEvent();

export const fetchFixturesFx = createEffect<
  FixturesQueryParams,
  GetFixturesResponse["response"],
  Error
>(async (params) => {
  const { response } = await rapidApi.fixturesApi.getFixtures(params);

  return response;
});

export const $isLiveFixtures =
  createStore<boolean>(false).reset(allFixturesSelected);
export const $fixtures = createStore<{ [key: string]: FixtureResponse[] }[]>(
  []
);

sample({
  clock: liveFixturesSelected,
  fn: () => true,
  target: $isLiveFixtures,
});
