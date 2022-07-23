import { loadViewerModel } from "@/features/auth/load";
import { createEvent, sample } from "effector";

export const appStarted = createEvent();

sample({
  clock: appStarted,
  target: [loadViewerModel.loadViewer, 
    // countriesModel.fetchCountries
  ],
});

appStarted.watch(() => console.log("APP STARTED"))
