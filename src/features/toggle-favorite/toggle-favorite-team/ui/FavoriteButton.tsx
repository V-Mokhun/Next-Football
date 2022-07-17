import { League, Team } from "@/shared/api";
import { StarIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/react";
import { useEvent } from "effector-react";
import React from "react";
import { toggleFavoriteTeamModel } from "..";

interface FavoriteButtonProps {
  data: Team;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({ data }) => {
  const buttonClicked = useEvent(toggleFavoriteTeamModel.buttonClicked);

  return (
    <Box>
      <StarIcon onClick={() => buttonClicked(data)} />
    </Box>
  );
};
