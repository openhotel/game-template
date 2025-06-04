import React, { useCallback, useEffect, useState } from "react";
import {
  ContainerComponent,
  Cursor,
  EventMode,
  GraphicsComponent,
  GraphicType,
} from "@openhotel/pixi-components";
import { TextComponent } from "shared/components";
import { getRandomNumber } from "shared/utils";

const MAX_COUNT = 10;

export const SandboxComponent: React.FC = () => {
  const [count, setCount] = useState(0);

  const onClick = useCallback(() => {
    setCount((count) => count + 1);
  }, [setCount]);

  useEffect(() => {
    if (count < MAX_COUNT) return;
  }, [count]);

  if (count >= MAX_COUNT) return <TextComponent text="Thanks 4 playing!" />;

  return (
    <ContainerComponent
      eventMode={EventMode.STATIC}
      cursor={Cursor.POINTER}
      onPointerDown={onClick}
    >
      <GraphicsComponent
        type={GraphicType.RECTANGLE}
        width={(50 * (MAX_COUNT - count)) / MAX_COUNT}
        height={(50 * (MAX_COUNT - count)) / MAX_COUNT}
        tint={0xff00ff}
        position={{
          x: count ? getRandomNumber(0, 100) : 0,
          y: count ? getRandomNumber(0, 100) : 0,
        }}
      />
      <TextComponent text={count ? `${count}/${MAX_COUNT}` : "click me"} />
    </ContainerComponent>
  );
};
