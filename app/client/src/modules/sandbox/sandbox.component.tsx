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
import { useProxy } from "shared/hooks";
import { Event } from "shared/enums";

const MAX_COUNT = 10;

export const SandboxComponent: React.FC = () => {
  const { emit, ready, exit } = useProxy();
  const [count, setCount] = useState(0);

  const onClick = useCallback(() => {
    setCount((count) => count + 1);
    emit(Event.CLICK, { foo: "faa" });
  }, [setCount, emit]);

  useEffect(() => {
    if (count < MAX_COUNT) return;
  }, [count]);

  useEffect(() => {
    ready();
  }, [ready]);

  if (count >= MAX_COUNT) return <TextComponent text="Thanks 4 playing!" />;

  return (
    <>
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
      <TextComponent
        eventMode={EventMode.STATIC}
        cursor={Cursor.POINTER}
        onPointerDown={exit}
        position={{
          x: 150,
        }}
        text={"close game"}
      />
    </>
  );
};
