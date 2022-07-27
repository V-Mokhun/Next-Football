import { calendarModel } from "@/entities/calendar";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import { useEvent, useStore } from "effector-react";
import React from "react";
import { changeDateModel } from "..";

interface PrevDayButtonProps {}

export const PrevDayButton: React.FC<PrevDayButtonProps> = ({}) => {
  const onPrevButtonClick = useEvent(changeDateModel.prevDayButtonClicked);
  const calendarDisabled = useStore(calendarModel.$calendarDisabled);
  const isFirstDate = useStore(calendarModel.$isFirstDate);

  return (
    <IconButton
      onClick={onPrevButtonClick}
      isDisabled={isFirstDate || calendarDisabled}
      size="sm"
      borderRadius="8px 0 0 8px"
      p={1}
      aria-label="Previous day"
      icon={<ChevronLeftIcon w={6} h={6} />}
    />
  );
};
