import { viewerModel } from "@/entities/viewer";
import { createEvent, forward, sample } from "effector-next";

export const buttonClicked = createEvent();

forward({
  from: buttonClicked,
  to: viewerModel.logoutFx,
});

sample({
  clock: viewerModel.logoutFx.doneData,
  filter: ({ success }) => success,
  target: viewerModel.logoutViewer,
});
