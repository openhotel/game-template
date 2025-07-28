import { Envs } from "shared/types/main.ts";
import { getRandomString } from "@oh/utils";
import { tasks } from "./tasks.ts";
import { updater } from "./updater.ts";
import { game } from "./game/main.ts";
import { worker } from "./worker/main.ts";
import { ulid } from "@std/ulid";
import { parseArgs } from "@std/cli/parse-args";
import { config } from "./config.ts";

export const System = (() => {
  let $envs: Envs;
  let $debug = false;

  let $id = ulid();

  const $token = getRandomString(16);

  const $updater = updater();
  const $tasks = tasks();
  const $worker = worker();
  const $config = config();

  const $game = game();

  const load = async (envs: Envs) => {
    $envs = envs;
    //
    const { gameId } = parseArgs(Deno.args);
    $id = gameId;

    await $config.load(envs);
    await $updater.load();
    //

    /**
     * /!\ Important to start a loop to prevent the server to exit /!\
     */
    $tasks.load();

    // await $internalProxy.load();
    console.log("GAME LOADED!");
    $worker.load();
  };

  const getEnvs = () => $envs;

  const getToken = () => $token;
  const isTokenValid = (token: string) => $token === token;

  const isDevelopment = () => $envs.version === "development";
  const isDebug = () => $debug;

  const getGameId = () => $id;

  return {
    load,

    getEnvs,

    getToken,
    isTokenValid,

    isDevelopment,
    isDebug,

    getGameId,

    game: $game,
    worker: $worker,
    config: $config,
  };
})();
