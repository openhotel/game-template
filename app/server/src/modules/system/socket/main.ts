import { System } from "modules/system/main.ts";
import { devServer } from "./dev-server.ts";
import { client } from "./client.ts";

export const socket = () => {
  const $devServer = devServer();
  const $client = client();

  const load = async () => {
    if (System.isDevelopment()) await $devServer.load();
    else await $client.load();
  };

  return {
    load,
  };
};
