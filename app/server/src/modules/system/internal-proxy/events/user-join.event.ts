import { Event } from "shared/enums/event.enum.ts";
import { EventType } from "shared/types/event.types.ts";

export const userJoinEvent: EventType = {
  event: Event.$USER_JOIN,
  func: (data) => {
    console.log("USER_JOIN", data);
  },
};
