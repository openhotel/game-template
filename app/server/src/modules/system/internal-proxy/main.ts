import { getClientSocket, getWebSocketUrl } from "@da/socket";
import { parseArgs } from "@std/cli/parse-args";
import { getRandomString } from "@oh/utils";
import { System } from "modules/system/main.ts";
import { serverEventList } from "./server-events/main.ts";

export const internalProxy = () => {
  let $socket;

  const load = async () => {
    const { internalProxyPort, token } = parseArgs(Deno.args);

    const envs = System.getEnvs();

    console.log(`Game Id [${envs.gameId}]`);

    $socket = getClientSocket({
      url: getWebSocketUrl(`http://localhost:${internalProxyPort}`),
      protocols: ["game", token ?? getRandomString(16), envs.gameId],
      reconnect: true,
      reconnectIntents: 1000,
      reconnectInterval: 1000,
      silent: !System.isDevelopment() && !System.isDebug(),
    });
    for (const { event, func } of serverEventList) $socket.on(event, func);

    await $socket.connect();
  };

  const getSocket = () => $socket;

  return {
    load,

    getSocket,
  };
};
