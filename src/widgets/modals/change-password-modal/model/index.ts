import { viewerModel } from "@/entities/viewer";
import { changePasswordModel } from "@/features/auth/change-password";
import { createEvent, createStore, sample } from "effector";

export const openModal = createEvent();
export const closeModal = createEvent();

export const $modalOpen = createStore<boolean>(false)
  .on(openModal, () => true)
  .on(closeModal, () => false);

sample({
  clock: changePasswordModel.buttonClicked,
  target: openModal,
});

sample({
  clock: viewerModel.changePasswordFx.doneData,
  filter: ({ success }) => success,
  target: closeModal,
});
