import { GameModule } from "@oh/utils";
import { GameComponent } from "./modules/game.component";
import { GameProvider } from "./shared/hooks";

export const game: GameModule = {
  id: "game-template123",
  version: "0.0.1",
  name: "Game Template",
  start: (params) => {
    return (
      <GameProvider {...params}>
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

// TODO: events
// secure with events games:emit:*
