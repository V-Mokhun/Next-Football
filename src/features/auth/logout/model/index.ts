import { viewerModel } from "@/entities/viewer";
import { createEvent, sample } from "effector";

export const buttonClicked = createEvent();

sample({
  clock: buttonClicked,
  target: viewerModel.logoutFx,
});

sample({
  clock: viewerModel.logoutFx.doneData,
  filter: ({ success }) => success,
  target: viewerModel.logoutViewer,
});
