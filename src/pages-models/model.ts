import { viewerModel } from "@/entities/viewer";
import { IClientViewer } from "@/shared/api";
import { createStore, forward, sample } from "effector-next";
import { createGate } from "effector-react";

export const PageGate = createGate<IClientViewer | null>();
export const $viewerSet = createStore<boolean>(false);

forward({
  from: PageGate.state,
  to: viewerModel.setViewer,
});

// forward({
//   from: viewerModel.setViewer.map(() => true),
//   to: $viewerSet,
// });

// sample({
//   clock: $viewerSet,
//   source: viewerModel.$isAuth,
//   filter: (isAuth) => isAuth,
//   target: [viewerModel.getFavoriteLeaguesFx, viewerModel.getFavoriteTeamsFx],
// });

