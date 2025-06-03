import React, { useMemo } from "react";
import {
  AppComponent,
} from "modules/application";
import { NesterComponent } from "shared/components";
import {TestComponent} from "modules/test";

export const ApplicationComponent = () => {
  const providers = useMemo(
    () => [
      AppComponent,
      //|\\|//|\\|//|\\|//|\\|//|\\|//|\\|//|\\|
      //|\\|//|\\|//|\\|//|\\|//|\\|//|\\|//|\\|
      TestComponent
    ],
    [],
  );

  return <NesterComponent components={providers} />;
};
