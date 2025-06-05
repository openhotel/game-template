import { getClientSocket, getWebSocketUrl } from "@da/socket";
import { parseArgs } from "@std/cli/parse-args";
import { getRandomString } from "@oh/utils";
import { ulid } from "@std/ulid";
import { System } from "modules/system/main.ts";
import { serverEventList } from "./server-events/main.ts";

export const internalProxy = () => {
  let $socket;

  const load = async () => {
    const { internalProxyPort, token, gameId } = parseArgs(Deno.args);

    $socket = getClientSocket({
      url: getWebSocketUrl(`http://localhost:${internalProxyPort}`),
      protocols: ["game", token ?? getRandomString(16), gameId ?? ulid()],
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
