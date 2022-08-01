import { createEvent, createStore, sample } from "effector";

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

sample({
  clock: buttonClicked,
  target: openModal,
});

sample({
  clock: searchItemClicked,
  target: closeModal,
});
