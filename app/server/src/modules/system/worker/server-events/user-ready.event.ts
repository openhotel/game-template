import { Event, ServerEvent } from "shared/enums/event.enum.ts";
import { InternalEventType } from "shared/types/event.types.ts";
import { System } from "modules/system/main.ts";

export const userReadyEvent: InternalEventType = {
  event: ServerEvent.USER_READY,
  func: ({ accountId }) => {
    const user = System.game.users.get(accountId);

    user.ready();

    if (System.isDevelopment()) user.emit(Event.$$CONFIG, System.config.get());
  },
};
