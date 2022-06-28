import { viewerModel } from "@/entities/viewer";
import { createEvent, forward } from "effector-next";

export const changeTimezone = createEvent<string>();

export const $timezone = viewerModel.viewerSubmodel.$viewerTimezone;

forward({
  from: changeTimezone,
  to: viewerModel.viewerSubmodel.setViewerTimezone,
});
