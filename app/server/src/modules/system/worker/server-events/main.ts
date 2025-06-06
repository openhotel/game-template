import { userJoinEvent } from "./user-join.event.ts";
import { userLeaveEvent } from "./user-leave.event.ts";
import { userDataEvent } from "./user-data.event.ts";
import { userReadyEvent } from "./user-ready.event.ts";
import { InternalEventType } from "shared/types/event.types.ts";

export const serverEventList: InternalEventType[] = [
  userReadyEvent,
  userJoinEvent,
  userLeaveEvent,
  userDataEvent,
];
