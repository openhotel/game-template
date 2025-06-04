import React from "react";
import { ConfigTypes } from "shared/types";

export type ConfigState = {
  getConfig: () => ConfigTypes;

  isDevelopment: () => boolean;
};

export const ConfigContext = React.createContext<ConfigState>(undefined);
