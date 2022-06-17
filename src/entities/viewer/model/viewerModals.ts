import { createEvent, createStore } from "effector-next";

export const openAuthModal = createEvent();
export const closeAuthModal = createEvent();

export const $authModalOpen = createStore(false)
  .on(openAuthModal, () => true)
  .on(closeAuthModal, () => false);
