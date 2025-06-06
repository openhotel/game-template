import { ServerEvent } from "shared/enums/event.enum.ts";
import { InternalEventType } from "shared/types/event.types.ts";
import { System } from "modules/system/main.ts";

export const userLeaveEvent: InternalEventType = {
  event: ServerEvent.USER_LEAVE,
  func: ({ accountId }) => {
    System.game.users.remove(accountId);
  },
};
