import { Envs } from "shared/types/main.ts";
import { getRandomString } from "@oh/utils";
import { tasks } from "./tasks.ts";
import { socket } from "./socket/main.ts";
import { updater } from "./updater.ts";
import { manifest } from "./manifest.ts";

export const System = (() => {
  let $envs: Envs;

  const $token = getRandomString(16);

  const $manifest = manifest();
  const $updater = updater();
  const $tasks = tasks();
  const $socket = socket();

  const load = async (envs: Envs) => {
    console.clear();

    $envs = envs;

    if (isDevelopment())
      console.log(
        "\n\n    ------------------\n    DEVELOPMENT SERVER\n    ------------------\n\n",
      );

    console.log("server");

    await $manifest.load();
    await $updater.load();

    $tasks.load();
    await $socket.load();
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
    socket: $socket,
  };
})();
