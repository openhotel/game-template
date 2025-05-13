import { useContext } from "react";
import { GameContext } from "./game.context";

export const useGame = () => {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used inside <GameProvider>");
  return ctx;
};
