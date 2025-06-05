import { Event } from "shared/enums/event.enum.ts";
import { UserMutable } from "shared/types/user.types.ts";

export type EventType = {
  event: Event;
  func: (data: { data: any; user: UserMutable }) => Promise<unknown> | unknown;
};

export type InternalEventType = {
  event: Event;
  func: (data: {
    clientId: string;
    accountId: string;
    username?: string;
    event?: Event;
    message?: any;
  }) => Promise<unknown> | unknown;
};
