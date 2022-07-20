import { Calendar } from "@/entities/calendar";
import { NextDayButton, PrevDayButton } from "@/features/change-date";
import { pageModel } from "@/pages-models/index";
import { IClientViewer } from "@/shared/api";
import { withSessionSsr } from "@/shared/lib";
import { Box, Flex } from "@chakra-ui/react";
import { useGate } from "effector-react";
import type { NextPage } from "next";

interface HomeProps {
  viewer: IClientViewer | null;
}

const Home: NextPage<HomeProps> = ({ viewer }) => {
  useGate(pageModel.PageGate, viewer);

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
};

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req }) {
    return {
      props: {
        viewer: req.session.viewer || null,
      },
    };
  }
);

export default Home;
