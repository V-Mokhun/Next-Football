import {
	FixturesQueryParams,
	GetFixturesResponse,
	rapidApi
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

export const $isLiveFixtures = createStore<boolean>(false);
export const $fixtures = createStore<GetFixturesResponse["response"]>([]);

$fixtures.watch((state) => console.log(state));

sample({
  clock: allFixturesSelected,
  fn: () => false,
  target: $isLiveFixtures,
});

sample({
  clock: liveFixturesSelected,
  fn: () => true,
  target: $isLiveFixtures,
});

sample({
  clock: fetchFixturesFx.doneData,
  target: $fixtures,
});
