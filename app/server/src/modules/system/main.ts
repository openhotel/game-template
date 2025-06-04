import { Envs } from "shared/types/main.ts";
import { getRandomString } from "@oh/utils";
import { tasks } from "./tasks.ts";
import { updater } from "./updater.ts";
import { manifest } from "./manifest.ts";
import { worker } from "./worker/main.ts";
import { Event } from "shared/enums/event.enum.ts";

export const System = (() => {
  let $envs: Envs;

  const $token = getRandomString(16);

  const $manifest = manifest();
  const $updater = updater();
  const $tasks = tasks();
  const $worker = worker();

  const load = async (envs: Envs) => {
    $envs = envs;

    if (isDevelopment())
      console.log("\n    -----------\n    GAME SERVER\n    -----------\n");

    await $manifest.load();
    await $updater.load();

    $tasks.load();
    await $worker.load();

    $worker.getServerWorker().emit(Event.LOADED, {});
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
  };
})();
