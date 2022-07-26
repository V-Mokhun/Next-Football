import { fetchFixturesModel } from "@/features/fixture/fetch-fixtures";
import { createEvent, sample } from "effector";
import { PageContext } from "nextjs-effector";

export const pageStarted = createEvent<PageContext>();

// sample({
//   clock: pageStarted,
//   target: fetchFixturesModel.fetchFixtures,
// });
