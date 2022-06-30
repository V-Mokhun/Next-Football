import { viewerModel } from "@/entities/viewer";
import { IClientViewer } from "@/shared/api";
import { forward } from "effector-next";
import { createGate } from "effector-react";

export const PageGate = createGate<IClientViewer | null>();

forward({
  from: PageGate.state,
  to: viewerModel.setViewer,
});
