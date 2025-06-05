import { Event } from "shared/enums/event.enum.ts";
import { EventType } from "shared/types/event.types.ts";

export const userLeaveEvent: EventType = {
  event: Event.$USER_LEAVE,
  func: (data) => {
    console.log("USER_LEAVE", data);
  },
};
