import { EventType } from "shared/types/event.types.ts";
import { userJoinEvent } from "modules/system/worker/events/user-join.event.ts";

export const eventList: EventType[] = [userJoinEvent];
