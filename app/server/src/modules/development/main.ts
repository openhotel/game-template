import { getRandomString } from "@oh/utils";
import { socket } from "./socket.ts";
import { worker } from "./worker.ts";

export const Development = (() => {
  const state = getRandomString(16);

  const $socket = socket();
  const $worker = worker();

  const load = async () => {
    console.log(
      "\n    ------------------\n    DEVELOPMENT SERVER\n    ------------------\n",
    );

    await $socket.load();
    await $worker.load();
  };

  return {
    load,

    socket: $socket,
  };
})();
