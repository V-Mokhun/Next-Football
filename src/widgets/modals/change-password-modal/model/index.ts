import { viewerModel } from "@/entities/viewer";
import { changePasswordModel } from "@/features/auth/change-password";
import { createEvent, createStore, forward, sample } from "effector-next";

export const openModal = createEvent();
export const closeModal = createEvent();

export const $modalOpen = createStore<boolean>(false)
  .on(openModal, () => true)
  .on(closeModal, () => false);

forward({
  from: changePasswordModel.buttonClicked,
  to: openModal,
});

sample({
  clock: viewerModel.changePasswordFx.doneData,
  filter: ({ success }) => success,
  target: closeModal,
});
