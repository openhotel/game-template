import React, { useMemo } from "react";
import { AppComponent, CoreLoaderComponent } from "modules/application";
import { NesterComponent } from "shared/components";
import { SandboxComponent } from "modules/sandbox";
import { InitialLoaderComponent } from "./components";
import { AssetsProvider, ConfigProvider, LanguageProvider } from "shared/hooks";

export const ApplicationComponent = () => {
  const providers = useMemo(
    () => [
      AppComponent,
      //|\\|//|\\|//|\\|//|\\|//|\\|//|\\|//|\\|
      //|\\|//|\\|//|\\|//|\\|//|\\|//|\\|//|\\|
      InitialLoaderComponent,
      ConfigProvider,
      LanguageProvider,
      AssetsProvider,
      CoreLoaderComponent,
      //|\\|//|\\|//|\\|//|\\|//|\\|//|\\|//|\\|
      //|\\|//|\\|//|\\|//|\\|//|\\|//|\\|//|\\|
      SandboxComponent,
    ],
    [],
  );

  return <NesterComponent components={providers} />;
};
