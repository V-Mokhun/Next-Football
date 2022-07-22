import { createEvent, createStore, forward } from "effector";

export const openModal = createEvent();
export const closeModal = createEvent();
export const buttonClicked = createEvent();
export const searchItemClicked = createEvent();

export const $modalOpen = createStore(false)

forward({
  from: openModal.map(() => true),
  to: $modalOpen
})

forward({
  from: closeModal.map(() => false),
  to: $modalOpen
})

forward({
  from: buttonClicked,
  to: openModal,
});

forward({
  from: searchItemClicked,
  to: closeModal,
});
