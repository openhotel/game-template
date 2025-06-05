import { Envs } from "shared/types/main.ts";
import { getRandomString } from "@oh/utils";
import { tasks } from "./tasks.ts";
import { updater } from "./updater.ts";
import { manifest } from "./manifest.ts";
import { internalProxy } from "./internal-proxy/main.ts";

export const System = (() => {
  let $envs: Envs;

  const $token = getRandomString(16);

  const $manifest = manifest();
  const $updater = updater();
  const $tasks = tasks();

  const $internalProxy = internalProxy();

  const load = async (envs: Envs) => {
    $envs = envs;

    if (isDevelopment()) {
      console.log("\n    -----------\n    GAME SERVER\n    -----------\n");
      console.log = (...data) => console.info("GAME ->", ...data);
    }
    await $manifest.load();
    await $updater.load();

    $tasks.load();

    await $internalProxy.load();
  };

  const getEnvs = () => $envs;

  const getToken = () => $token;
  const isTokenValid = (token: string) => $token === token;

  const isDevelopment = () => $envs.version === "development";

  return {
    load,

    getEnvs,

    getToken,
    isTokenValid,

    isDevelopment,

    manifest: $manifest,
    proxy: $internalProxy,
  };
})();
