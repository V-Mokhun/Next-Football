import { createEvent, createStore } from "effector-next";

export const openModal = createEvent();
export const closeModal = createEvent();

export const $modalOpen = createStore(false)
  .on(openModal, () => true)
  .on(closeModal, () => false);
