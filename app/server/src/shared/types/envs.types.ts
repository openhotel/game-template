import { SettingsTypes } from "shared/types/settings.types.ts";

export type Envs = {
  version: string;
  settings: string | SettingsTypes;
};
