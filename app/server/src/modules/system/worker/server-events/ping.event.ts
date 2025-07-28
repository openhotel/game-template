import { ServerEvent } from "shared/enums/event.enum.ts";
import { InternalEventType } from "shared/types/event.types.ts";
import { System } from "modules/system/main.ts";

let lastPing = 0;
export const pingEvent: InternalEventType = {
  event: ServerEvent.PING,
  func: ({ d }) => {
    lastPing = d;
    System.worker.emit(ServerEvent.PONG, { d: performance.now() });
  },
};
