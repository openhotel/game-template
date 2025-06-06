import { ServerEvent } from "shared/enums/event.enum.ts";
import { InternalEventType } from "shared/types/event.types.ts";
import { System } from "modules/system/main.ts";

export const userReadyEvent: InternalEventType = {
  event: ServerEvent.USER_READY,
  func: ({ accountId }) => {
    System.game.users.get(accountId).ready();
  },
};
