import { CalendarIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useEvent, useStore } from "effector-react";
import React from "react";
import { calendarModel } from "..";

interface CalendarProps {
  NextButton: React.ReactElement;
  PrevButton: React.ReactElement;
}

export const Calendar: React.FC<CalendarProps> = ({
  NextButton,
  PrevButton,
}) => {
  const onSelectDate = useEvent(calendarModel.dateSelected);

  const selectedDate = useStore(calendarModel.$selectedDate);
  const isDisabled = useStore(calendarModel.$calendarDisabled);
  const allDates = useStore(calendarModel.$allDates);

  const { onToggle, isOpen, onClose } = useDisclosure();

  return (
    <Popover isOpen={isOpen} onClose={onClose}>
      <Flex flex={{ base: "1 1 auto", md: "0 1 auto" }} alignItems="center">
        {PrevButton}
        <PopoverTrigger>
          <Button
            isDisabled={isDisabled}
            size="sm"
            onClick={onToggle}
            py={0}
            borderRadius={0}
            variant="solid"
            width={{ base: "100%", md: "initial" }}
          >
            <CalendarIcon /> <Text ml={2}>{selectedDate.slice(5)}</Text>
          </Button>
        </PopoverTrigger>
        {NextButton}
      </Flex>
      <PopoverContent
        maxHeight={{ base: "450px", md: "none" }}
        overflowY={{ base: "auto", md: "initial" }}
        maxWidth={{ base: "none", md: 160 }}
      >
        <PopoverBody padding={2}>
          <VStack spacing={2}>
            {allDates.map((date) => (
              <Button
                w="100%"
                p={1}
                size="sm"
                key={date}
                onClick={() => {
                  onSelectDate(date);
                  onClose();
                }}
                disabled={date === selectedDate}
                pointerEvents={date === selectedDate ? "none" : "initial"}
                backgroundColor={
                  date === selectedDate ? "primary.400" : "initial"
                }
                variant="solid"
              >
                {date.slice(5)}
              </Button>
            ))}
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
