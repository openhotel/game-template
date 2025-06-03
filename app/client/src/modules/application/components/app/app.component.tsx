import React, { useMemo } from "react";
import { ApplicationProvider } from "@openhotel/pixi-components";

type Props = {
  children: React.ReactNode;
};

export const AppComponent: React.FC<Props> = ({ children }) => {

  return useMemo(
    () => (
      <ApplicationProvider children={children} />
    ),
    [children],
  );
};
