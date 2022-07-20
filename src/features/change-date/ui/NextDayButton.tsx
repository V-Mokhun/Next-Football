import { calendarModel } from "@/entities/calendar";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import { useEvent, useStore } from "effector-react";
import React from "react";
import { changeDateModel } from "..";

interface NextDayButtonProps {}

export const NextDayButton: React.FC<NextDayButtonProps> = ({}) => {
  const onNextButtonClick = useEvent(changeDateModel.nextDayButtonClicked);
  const isLastDate = useStore(calendarModel.$isLastDate);

  return (
    <IconButton
      disabled={isLastDate}
      onClick={onNextButtonClick}
      size="sm"
      borderRadius="0 8px 8px 0"
      p={1}
      aria-label="Next day"
      icon={<ChevronRightIcon w={6} h={6} />}
    />
  );
};
