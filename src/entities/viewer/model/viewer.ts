import { IClientUser } from "@/shared/api";
import { createEvent, restore } from "effector-next";

export const setViewer = createEvent<IClientUser | null>();

export const $viewer = restore(setViewer, null);
export const $isAuth = $viewer.map((viewer) => !!viewer);

$viewer.watch((state) => {
  console.log(state);
});
