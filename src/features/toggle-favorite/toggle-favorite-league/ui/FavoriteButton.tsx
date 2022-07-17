import { League } from "@/shared/api";
import { StarIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/react";
import { useEvent } from "effector-react";
import React from "react";
import { toggleFavoriteLeagueModel } from "..";

interface FavoriteButtonProps {
  data: League;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({ data }) => {
  const buttonClicked = useEvent(toggleFavoriteLeagueModel.buttonClicked);

  return (
    <Box>
      <StarIcon onClick={() => buttonClicked(data)} />
    </Box>
  );
};
