import { SettingsTypes, Envs } from "shared/types/main.ts";
import { readYaml } from "@oh/utils";

export const settings = () => {
  let $settings: SettingsTypes;

  const load = async (envs: Envs) => {
    $settings = {
      ...await readYaml("./settings.yml"),
      version: envs.version,
    };
  };

  const get = (): SettingsTypes => $settings;

  const isDevelopment = () => $settings.version === "development";
  const getVersion = () => $settings.version;

  return {
    load,
    get,

    isDevelopment,
    getVersion,
  };
};
