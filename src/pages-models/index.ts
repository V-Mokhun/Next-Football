import { viewerModel } from "@/entities/viewer";
import { IClientUser } from "@/shared/api";
import { forward } from "effector-next";
import { createGate } from "effector-react";

export const PageGate = createGate<IClientUser | null>();

forward({
  from: PageGate.state,
  to: viewerModel.viewerSubmodel.setViewer,
});
