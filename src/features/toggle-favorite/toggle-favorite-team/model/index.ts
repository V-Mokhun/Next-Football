import { viewerModel } from "@/entities/viewer";
import { League, Team } from "@/shared/api";
import { createEvent } from "effector-next";

export const buttonClicked = createEvent<Team | League>();
