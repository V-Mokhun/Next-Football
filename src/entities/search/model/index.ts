import { createEvent, createStore, forward } from "effector-next";

export const openModal = createEvent();
export const closeModal = createEvent();
export const buttonClicked = createEvent();
export const searchItemClicked = createEvent();

export const $modalOpen = createStore(false)
  .on(openModal, () => true)
  .on(closeModal, () => false);

forward({
  from: buttonClicked,
  to: openModal,
});

forward({
  from: searchItemClicked,
  to: closeModal,
});
