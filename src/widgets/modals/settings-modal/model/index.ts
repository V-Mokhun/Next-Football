import { settingsModel } from "@/entities/settings";
import { changeTimezoneModel } from "@/features/settings/change-timezone";
import { combine } from "effector-next";

export const $loading = combine(
  [
    settingsModel.$timezonesFetching,
    changeTimezoneModel.$viewerTimezonesFetching,
  ],
  ([$timezonesFetching, $viewerTimezonesFetching]) =>
    $timezonesFetching || $viewerTimezonesFetching
);
