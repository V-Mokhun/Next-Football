import { settingsModel } from "@/entities/settings";
import { TriangleDownIcon } from "@chakra-ui/icons";
import { Select } from "@chakra-ui/react";
import { useStore } from "effector-react";
import React from "react";
import { changeTimezoneModel } from "..";

interface ChangeTimezoneProps {}

export const ChangeTimezone: React.FC<ChangeTimezoneProps> = ({}) => {
  const activeTimezone = useStore(changeTimezoneModel.$timezone);
  const { timezones } = useStore(settingsModel.$settings);

  return (
    <Select
      icon={<TriangleDownIcon />}
      variant="outline"
      size="md"
      placeholder="Your timezone.."
      value={activeTimezone}
      onChange={(e) => {
        changeTimezoneModel.changeTimezone(e.target.value);
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
