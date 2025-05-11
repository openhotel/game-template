import React from "react";
import { GameModule } from "@oh/utils";
import { GameComponent } from "./modules/game.component";
import { GameProvider } from "./shared/hooks/game/game.provider";


export const game: GameModule = {
  id: "game-template123",
  version: "0.0.1",
  name: "Game Template",
  start: ({ data, onEnd }) => {
    return (
      <GameProvider data={data} onEnd={onEnd}>
        <GameComponent />
      </GameProvider>
    );
  },
  destroy: () => {
    console.log("destroy");
  },
  metadata: {
    type: "window",
  },
};
