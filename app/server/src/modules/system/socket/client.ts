import { System } from "modules/system/main.ts";
import { parseArgs } from "@std/cli/parse-args";
import { getClientSocket } from "@da/socket";

export const client = () => {
  let $client;

  const load = async () => {
    const args = parseArgs(Deno.args);

    const $port = args.port ?? 1994;

    $client = getClientSocket({
      url: `ws://localhost:${$port}/proxy`,
      protocols: ["game", args.state ?? "state", "gameId"],
      reconnect: true,
      // reconnectIntents: 1000,
      // reconnectInterval: System.isDevelopment() ? 1000 : 5_000,
      silent: !System.isDevelopment(),
    });
    $client.on("connected", () => {
      console.log("connected");
    });
    $client.on("disconnected", () => {
      console.log("disconnected");
    });
    await $client.connect();
  };

  return {
    load,
  };
};
