// import { getChildProcessWorker } from "@oh/utils";
import { ServerEvent } from "shared/enums/event.enum.ts";
import { serverEventList } from "./server-events/main.ts";
import { getChildProcessWorker } from "./child-process-worker.ts";

export const worker = () => {
  const $worker = getChildProcessWorker();

  const load = () => {
    emit("USER_DATA", { foo: "faa" });

    for (const { event, func } of serverEventList) $worker.on(event, func);
  };

  const emit = (event: ServerEvent, data: any) => {
    console.log("game", event, data);
    $worker.emit(event, data);
  };

  return {
    load,

    emit,
  };
};
