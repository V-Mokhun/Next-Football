import {
  createGIPFactory,
  createGSPFactory,
  createGSSPFactory,
} from "nextjs-effector";
import { appStarted, appStartedStatic } from "./model";

export const createGIP = createGIPFactory({
  sharedEvents: [appStarted],
});

export const createGSSP = createGSSPFactory({
  sharedEvents: [appStarted],
});

export const createGSP = createGSPFactory({
  sharedEvents: [appStartedStatic],
});
