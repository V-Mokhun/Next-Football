import { Calendar } from '@/entities/calendar';
import { NextDayButton, PrevDayButton } from '@/features/change-date';
import { Box, Flex } from '@chakra-ui/react';
import React from 'react';

interface HomeProps {}

export const HomePage: React.FC<HomeProps> = ({}) => {
		return (
      <Box
        borderRadius="8px"
        pt="16px"
        pb="4px"
        px="12px"
        backgroundColor="main.500">
        <Flex justifyContent="flex-end" mb={4}>
          <Calendar
            NextButton={<NextDayButton />}
            PrevButton={<PrevDayButton />}
          />
        </Flex>
      </Box>
		);
}
