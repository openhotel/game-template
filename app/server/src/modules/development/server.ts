import { getParentProcessWorker } from "@oh/utils";
import { Event, ServerEvent } from "shared/enums/event.enum.ts";

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
    // on("foo", (data) => {
    //   console.log(data);
    //   emit("test", Date.now());
    // });

    $worker.on(ServerEvent.DISCONNECT_USER, (a) => {
      console.log(a);
    });
    $worker.on(ServerEvent.USER_DATA, (a) => {
      // console.log(a);
    });
  };

  const emit = (event: ServerEvent, data: any) => $worker.emit(event, data);

  return {
    load,

    emit,
  };
};
