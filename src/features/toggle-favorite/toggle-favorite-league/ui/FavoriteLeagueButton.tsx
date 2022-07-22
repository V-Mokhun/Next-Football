import { viewerModel } from "@/entities/viewer";
import { League } from "@/shared/api";
import { StarIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { useEvent, useStore } from "effector-react";
import React from "react";
import { toggleFavoriteLeagueModel } from "..";

interface FavoriteLeagueButtonProps {
  data: League;
  size: "small" | "normal";
  isAbsolute?: boolean;
}

export const FavoriteLeagueButton: React.FC<FavoriteLeagueButtonProps> = ({
  data,
  size = "normal",
  isAbsolute = false,
}) => {
  const buttonClicked = useEvent(toggleFavoriteLeagueModel.buttonClicked);
  const favoriteLeagues = useStore(viewerModel.$viewerFavoriteLeagues);
  const loadingState = useStore(toggleFavoriteLeagueModel.$loading);

  const isLoading = loadingState?.id === data.id && loadingState.loading;
  const isFavorite = favoriteLeagues?.find((league) => league.id === data.id);

  return (
    <Button
      position={isAbsolute ? "absolute" : "initial"}
      right={isAbsolute ? "0" : "initial"}
      top={isAbsolute ? "50%" : "initial"}
      transform={isAbsolute ? "translateY(-50%)" : "initial"}
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
