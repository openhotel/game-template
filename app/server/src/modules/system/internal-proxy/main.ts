import { getClientSocket, getWebSocketUrl } from "@da/socket";
import { parseArgs } from "@std/cli/parse-args";
import { getRandomString } from "@oh/utils";
import { ulid } from "@std/ulid";
import { System } from "modules/system/main.ts";
import { internalEventList } from "./events/main.ts";

export const internalProxy = () => {
  let $socket;

  const load = async () => {
    const { serverPort, token, gameId } = parseArgs(Deno.args);

    $socket = getClientSocket({
      url: getWebSocketUrl(`http://localhost:${serverPort}`),
      protocols: ["game", token ?? getRandomString(16), gameId ?? ulid()],
      reconnect: true,
      reconnectIntents: 1000,
      reconnectInterval: 1000,
      silent: !System.isDevelopment(),
    });
    for (const { event, func } of internalEventList) $socket.on(event, func);

    await $socket.connect();
  };

  const getSocket = () => $socket;

  return {
    load,

    getSocket,
  };
};
