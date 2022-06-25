import { createEvent, createStore, forward } from "effector-next";

export const openAuthModal = createEvent();
export const closeAuthModal = createEvent();
export const authButtonClicked = createEvent();

export const $authModalOpen = createStore(false)
  .on(openAuthModal, () => true)
  .on(closeAuthModal, () => false);

forward({
  from: authButtonClicked,
  to: openAuthModal,
});
