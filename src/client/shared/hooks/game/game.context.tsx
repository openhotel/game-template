import { createContext, useContext } from "react";
import { GameStartParams } from "@oh/utils";

export const GameContext = createContext<GameStartParams>(undefined);

export const useGame = () => {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used inside <GameProvider>");
  return ctx;
};
