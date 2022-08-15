import { viewerModel } from "@/entities/viewer";
import { BasicTeam } from "@/shared/api";
import { StarIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { useEvent, useStore } from "effector-react";
import { toggleFavoriteTeamModel } from "..";

interface FavoriteTeamButtonProps<T extends BasicTeam> {
  data: T;
  size: "small" | "normal";
  isAbsolute?: boolean;
}

export function FavoriteTeamButton<T extends BasicTeam>({
  data,
  size = "normal",
  isAbsolute = false,
}: FavoriteTeamButtonProps<T>) {
  const buttonClicked = useEvent(toggleFavoriteTeamModel.buttonClicked);
  const favoriteTeams = useStore(viewerModel.$viewerFavoriteTeams);
  const loadingState = useStore(toggleFavoriteTeamModel.$loading);

  const isLoading = loadingState?.id === data.id && loadingState.loading;
  const isFavorite = favoriteTeams?.find((team) => team.id === data.id);

  const { logo, id, name } = data;

  return (
    <Button
      position={isAbsolute ? "absolute" : "initial"}
      right={isAbsolute ? "0" : "initial"}
      top={isAbsolute ? "50%" : "initial"}
      transform={isAbsolute ? "translateY(-50%)" : "initial"}
      p={1}
      size={size === "normal" ? "md" : "xs"}
      onClick={() => buttonClicked({ logo, id, name })}
      variant="outline"
      isLoading={isLoading}
    >
      <StarIcon
        h={size === "normal" ? 5 : 3}
        w={size === "normal" ? 5 : 3}
        color={isFavorite ? "yellow.400" : "initial"}
      />
    </Button>
  );
}
