import { ServerEvent } from "shared/enums/event.enum.ts";
import { InternalEventType } from "shared/types/event.types.ts";
import { CLIENT_EVENT_WHITELIST } from "shared/consts/events.consts.ts";
import { System } from "modules/system/main.ts";
import { eventList } from "../events/main.ts";

export const userDataEvent: InternalEventType = {
  event: ServerEvent.USER_DATA,
  func: ({ clientId, accountId, event, message }) => {
    const close = () =>
      System.worker.emit(ServerEvent.DISCONNECT_USER, { clientId });

    if (!CLIENT_EVENT_WHITELIST.includes(event)) return close();

    const foundEvent = eventList.find(($event) => $event.event === event);
    if (!foundEvent) return close();

    const user = System.game.users.get(accountId);

    foundEvent.func({ data: JSON.stringify(message ?? "{}"), user });
  },
};
