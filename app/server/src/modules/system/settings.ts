import { SettingsTypes, Envs } from "shared/types/main.ts";
import { readYaml } from "@oh/utils";

export const settings = () => {
  let $settings: SettingsTypes;

  const load = async (envs: Envs) => {
    const isDevelopment = envs.version === "development";

    if (isDevelopment) {
      $settings = await readYaml("./settings.yml");
      return;
    }

    $settings = {
      ...(envs.settings as SettingsTypes),
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
