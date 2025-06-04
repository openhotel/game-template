import { EventType } from "shared/types/main.ts";
import { Event } from "shared/enums/main.ts";

export const userJoinEvent: EventType = {
  event: Event.USER_JOIN,
  func: ({ data }) => {
    console.log(data, "<<<");
  },
};
