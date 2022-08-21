import {
  FixtureResponse,
  HeadToHeadQueryParams,
  rapidApi,
  SingleFixtureQueryParams,
  SingleFixtureResponse,
} from "@/shared/api";
import {
  createEffect,
  createEvent,
  createStore,
  restore,
  sample,
} from "effector";

export const singleFixtureSet = createEvent<SingleFixtureQueryParams>();
export const headToHeadSet = createEvent<HeadToHeadQueryParams>();

export const fetchSingleFixtureFx = createEffect<
  SingleFixtureQueryParams,
  SingleFixtureResponse,
  Error
>(async (params) => {
  const { response } = await rapidApi.fixturesApi.getSingleFixture(params);

  return response[0];
});

export const fetchHeadToHeadFx = createEffect<
  HeadToHeadQueryParams,
  FixtureResponse[],
  Error
>(async (params) => {
  const { response } = await rapidApi.fixturesApi.getHeadToHead(params);

  return response;
});

export const $singleFixture = restore(
  fetchSingleFixtureFx.doneData,
  null
).reset(fetchSingleFixtureFx.failData);
export const $singleFixtureError = createStore("").reset(fetchSingleFixtureFx);
export const $singleFixtureLoading = fetchSingleFixtureFx.pending;

export const $headToHead = restore(fetchHeadToHeadFx.doneData, []);
export const $headtoHeadError = createStore("").reset(fetchHeadToHeadFx);
export const $headToHeadLoading = fetchHeadToHeadFx.pending;

sample({
  clock: singleFixtureSet,
  source: $singleFixture,
  filter: (fixture, clock) => fixture?.fixture.id != clock.id,
  fn: (_, clock) => clock,
  target: fetchSingleFixtureFx,
});

sample({
  clock: headToHeadSet,
  target: fetchHeadToHeadFx,
});

sample({
  clock: fetchSingleFixtureFx.failData,
  fn: ({ message }) => message,
  target: $singleFixtureError,
});

sample({
  clock: fetchHeadToHeadFx.failData,
  fn: ({ message }) => message,
  target: $headtoHeadError,
});
