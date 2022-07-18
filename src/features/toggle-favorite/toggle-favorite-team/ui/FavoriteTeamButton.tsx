import { viewerModel } from "@/entities/viewer";
import { Team } from "@/shared/api";
import { StarIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { useEvent, useStore } from "effector-react";
import React from "react";
import { toggleFavoriteTeamModel } from "..";

interface FavoriteTeamButtonProps {
  data: Team;
  size: "small" | "normal";
}

export const FavoriteTeamButton: React.FC<FavoriteTeamButtonProps> = ({
  data,
  size = "normal",
}) => {
  const buttonClicked = useEvent(toggleFavoriteTeamModel.buttonClicked);
  const favoriteTeams = useStore(
    viewerModel.$viewerFavoriteTeams
  );
  const loadingState = useStore(toggleFavoriteTeamModel.$loading);

  const isLoading = loadingState?.id === data.id && loadingState.loading;
  const isFavorite = favoriteTeams?.find((team) => team.id === data.id);

  return (
    <Button
      p={1}
      size={size === "normal" ? "md" : "xs"}
      onClick={() => buttonClicked(data)}
      variant="outline"
      isLoading={isLoading}>
      <StarIcon
        h={size === "normal" ? 5 : 3}
        w={size === "normal" ? 5 : 3}
        color={isFavorite ? "yellow.400" : "initial"}
      />
    </Button>
  );
};
