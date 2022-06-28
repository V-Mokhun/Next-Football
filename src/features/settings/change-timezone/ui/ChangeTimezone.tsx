import { settingsModel } from "@/entities/settings";
import { viewerModel } from "@/entities/viewer";
import { TriangleDownIcon } from "@chakra-ui/icons";
import { Select } from "@chakra-ui/react";
import { useEvent, useStore } from "effector-react";
import React from "react";
import { changeTimezoneModel } from "..";

interface ChangeTimezoneProps {}

export const ChangeTimezone: React.FC<ChangeTimezoneProps> = ({}) => {
  const activeTimezone = useStore(viewerModel.viewerSubmodel.$viewerTimezone);
  const changeTimezone = useEvent(changeTimezoneModel.changeTimezone);
  const { timezones } = useStore(settingsModel.$settings);

  return (
    <Select
      icon={<TriangleDownIcon />}
      variant="outline"
      size="md"
      placeholder="Your timezone.."
      value={activeTimezone}
      onChange={(e) => {
        changeTimezone(e.target.value);
      }}>
      {timezones.length > 0 &&
        timezones.map((timezone) => (
          <option key={timezone} value={timezone}>
            {timezone}
          </option>
        ))}
    </Select>
  );
};
