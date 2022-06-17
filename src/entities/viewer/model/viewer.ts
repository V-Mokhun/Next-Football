import { User } from "@/shared/api";
import { createStore } from "effector-next";

export const $viewer = createStore<User | null>(null);
export const $isAuth = $viewer.map((viewer) => !!viewer);
