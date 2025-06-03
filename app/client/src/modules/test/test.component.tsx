import React from "react";
import {
  Cursor,
  EventMode,
  GraphicsComponent,
  GraphicType,
} from "@openhotel/pixi-components";

export const TestComponent: React.FC = () => {
  return (
    <GraphicsComponent
      type={GraphicType.RECTANGLE}
      width={10}
      height={10}
      tint={0xff00ff}
      eventMode={EventMode.STATIC}
      cursor={Cursor.POINTER}
    />
  );
};
