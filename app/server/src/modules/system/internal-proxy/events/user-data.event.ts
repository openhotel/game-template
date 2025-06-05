import { Event } from "shared/enums/event.enum.ts";
import { EventType } from "shared/types/event.types.ts";
import { CLIENT_EVENT_WHITELIST } from "shared/consts/events.consts.ts";
import { System } from "modules/system/main.ts";
import { eventList } from "modules/system/internal-proxy/events/main.ts";

export const userDataEvent: EventType = {
  event: Event.$USER_DATA,
  func: ({ clientId, event, message }) => {
    const close = () =>
      System.proxy.getSocket().emit("disconnect-client", { clientId });

    if (!CLIENT_EVENT_WHITELIST.includes(event)) return close();

    const foundEvent = eventList.find(($event) => $event.event === event);
    if (!foundEvent) return close();

    foundEvent.func(JSON.stringify(message ?? "{}"));
  },
};
