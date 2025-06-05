import { userJoinEvent } from "./user-join.event.ts";
import { userLeaveEvent } from "./user-leave.event.ts";
import { userDataEvent } from "./user-data.event.ts";
import { clickEvent } from "./click.event.ts";

export const internalEventList = [userJoinEvent, userLeaveEvent, userDataEvent];
export const eventList = [clickEvent];
