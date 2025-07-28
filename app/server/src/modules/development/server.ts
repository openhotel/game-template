import { getParentProcessWorker } from "@oh/utils";
import { ServerEvent } from "shared/enums/event.enum.ts";
import { Development } from "./main.ts";
import { parseArgs } from "@std/cli/parse-args";

export const server = () => {
  let $worker;

  const load = () => {
    const { build } = parseArgs(Deno.args);

    console.log(`    BUILD: ${Boolean(build)}`.toUpperCase());
    console.log();

    $worker = getParentProcessWorker(
      build ? "../../build/server_linux" : "deno",
      build
        ? []
        : ["run", "-A", "--watch=./src", "--unstable-kv", "mod.ts", "--dev"],
    );
    $worker.on(ServerEvent.DISCONNECT_USER, ({ clientId }) => {
      Development.proxy.getClient(clientId)?.close();
    });
    $worker.on(ServerEvent.USER_DATA, ({ clientId, event, message }) => {
      Development.proxy.getClient(clientId).emit(event, message);
    });

    $worker.on(ServerEvent.PONG, () => {
      setTimeout(() => {
        $worker.emit(ServerEvent.PING, { d: performance.now() });
      }, 1000);
    });

    $worker.emit(ServerEvent.PING, { d: performance.now() });
  };

  const emit = (event: ServerEvent, data: any) => $worker.emit(event, data);

  return {
    load,

    emit,
  };
};
