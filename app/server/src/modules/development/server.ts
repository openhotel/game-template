import { getParentProcessWorker } from "@oh/utils";
import { ServerEvent } from "shared/enums/event.enum.ts";
import { Development } from "./main.ts";

export const server = () => {
  let $worker;

  const load = () => {
    $worker = getParentProcessWorker("deno", [
      "run",
      "-A",
      "--watch=./src",
      "--unstable-kv",
      "mod.ts",
      "--dev",
    ]);

    $worker.on(ServerEvent.DISCONNECT_USER, ({ clientId }) => {
      Development.proxy.getClient(clientId)?.close();
    });
    $worker.on(ServerEvent.USER_DATA, ({ clientId, event, message }) => {
      Development.proxy.getClient(clientId).emit(event, message);
    });
  };

  const emit = (event: ServerEvent, data: any) => $worker.emit(event, data);

  return {
    load,

    emit,
  };
};
