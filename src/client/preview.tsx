import React, { StrictMode } from "react";
import { ApplicationProvider } from "@openhotel/pixi-components";
import { GameComponent } from "./modules/game.component";
import { GameProvider } from "./shared/hooks/game/game.provider";

const Preview = () => {
  return (
    <StrictMode>
      <ApplicationProvider backgroundColor={0x1e1e1e}>
        <GameProvider
          data={{ dev: true }}
          onEnd={() => console.log("Game ended")}
        >
          <GameComponent />
        </GameProvider>
      </ApplicationProvider>
    </StrictMode>
  );
};

export default Preview;
