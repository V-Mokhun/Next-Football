import { settingsModel } from "@/entities/settings";
import { viewerModel } from "@/entities/viewer";
import { combine } from "effector-next";

export const $loading = combine(
  [
    settingsModel.$timezonesFetching,
    viewerModel.viewerSubmodel.$viewerTimezonesFetching,
  ],
  ([$timezonesFetching, $viewerTimezonesFetching]) =>
    $timezonesFetching || $viewerTimezonesFetching
);
