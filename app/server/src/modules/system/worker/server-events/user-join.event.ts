import { ServerEvent } from "shared/enums/event.enum.ts";
import { InternalEventType } from "shared/types/event.types.ts";
import { System } from "modules/system/main.ts";

export const userJoinEvent: InternalEventType = {
  event: ServerEvent.USER_JOIN,
  func: ({ accountId, username, clientId }) => {
    System.game.users.add({
      clientId,
      accountId,
      username,
    });
  },
};
