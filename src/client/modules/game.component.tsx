import React, { useCallback, useState } from "react";
import {
  ContainerComponent,
  EventMode,
  GraphicsComponent,
  GraphicType,
} from "@openhotel/pixi-components";
import { useGame } from "../shared/hooks/game/game.context";

export const GameComponent = () => {
  const { onEnd } = useGame();
  const [clicks, setClicks] = useState(0);

  const handleClick = useCallback(() => {
    setClicks((prev) => prev + 1);
    console.log("click", clicks);
    if (clicks > 9) {
      onEnd();
    }
  }, [clicks, onEnd]);

  return (
    <ContainerComponent>
      <GraphicsComponent
        type={GraphicType.RECTANGLE}
        width={80}
        height={80}
        tint={0x03a381}
        onPointerDown={handleClick}
        eventMode={EventMode.STATIC}
      />
    </ContainerComponent>
  );
};
