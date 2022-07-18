import { League } from "@/shared/api";
import { StarIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { useEvent, useStore } from "effector-react";
import React from "react";
import { toggleFavoriteLeagueModel } from "..";

interface FavoriteLeagueButtonProps {
  data: League;
  size: "small" | "normal";
}

export const FavoriteLeagueButton: React.FC<FavoriteLeagueButtonProps> = ({
  data,
  size = "normal",
}) => {
  const buttonClicked = useEvent(toggleFavoriteLeagueModel.buttonClicked);
  const favoriteLeagues = useStore(
    toggleFavoriteLeagueModel.$viewerFavoriteLeagues
  );
  const loadingState = useStore(toggleFavoriteLeagueModel.$loading);

  const isLoading = loadingState?.id === data.id && loadingState.loading;
  const isFavorite = favoriteLeagues?.find((league) => league.id === data.id);

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
