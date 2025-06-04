import { Event } from "shared/enums/event.enum.ts";

export type EventType = {
  event: Event;
  func: (data: any) => Promise<unknown> | unknown;
};
