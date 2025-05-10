import React from "react";
import { GameContext } from "./game.context";
import { GameStartParams } from "@oh/utils";

type Props = GameStartParams & {
  children: React.ReactNode;
};

export const GameProvider = ({ children, ...params }: Props) => {
  return (
    <GameContext.Provider value={{ ...params }}>
      {children}
    </GameContext.Provider>
  );
};
