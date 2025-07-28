import { getChildProcessWorker } from "@oh/utils";
import { ServerEvent } from "shared/enums/event.enum.ts";
import { serverEventList } from "./server-events/main.ts";

export const worker = () => {
  const $worker = getChildProcessWorker();

  const load = () => {
    for (const { event, func } of serverEventList) $worker.on(event, func);
  };

  const emit = (event: ServerEvent, data: any) => {
    $worker.emit(event, data);
  };

  return {
    load,

    emit,
  };
};
