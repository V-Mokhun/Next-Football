import { createEvent, createStore, forward, sample } from "effector";

export const openModal = createEvent();
export const closeModal = createEvent();
export const buttonClicked = createEvent();
export const searchItemClicked = createEvent();

export const $modalOpen = createStore(false);

sample({
  clock: openModal,
  fn: () => true,
  target: $modalOpen,
});

sample({
  clock: closeModal,
  fn: () => false,
  target: $modalOpen,
});

forward({
  from: buttonClicked,
  to: openModal,
});

forward({
  from: searchItemClicked,
  to: closeModal,
});
