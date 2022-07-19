import { viewerModel } from "@/entities/viewer";
import { IClientViewer } from "@/shared/api";
import { createStore, forward } from "effector-next";
import { createGate } from "effector-react";

export const PageGate = createGate<IClientViewer | null>();
export const $viewerSet = createStore<boolean>(false);

forward({
  from: PageGate.state,
  to: viewerModel.setViewer,
});
