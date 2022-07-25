import { createEvent } from "effector";
import { PageContext } from "nextjs-effector";

export const pageStarted = createEvent<PageContext>();

// sample({
//   clock: pageStarted,
//   target: fetchFixturesModel.fetchFixtures,
// });
