import { Event } from "shared/enums/event.enum.ts";
import { EventType } from "shared/types/event.types.ts";

export const clickEvent: EventType = {
  event: Event.CLICK,
  func: ({ user }) => {
    user.incrementClickCount();
  },
};
