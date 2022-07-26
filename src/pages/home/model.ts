import { matchesModel } from "@/widgets/matches";
import { createEvent, sample } from "effector";
import { PageContext } from "nextjs-effector";

export const pageStarted = createEvent<PageContext>();

// sample({
//   clock: pageStarted,
//   target: matchesModel.fetchFixtures,
// });
