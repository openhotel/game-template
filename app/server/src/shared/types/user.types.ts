import { Event } from "shared/enums/event.enum.ts";

export type User = {
  clientId: string;

  accountId: string;
  username: string;
};

export type UserMutable = {
  getAccountId: () => string;
  getUsername: () => string;

  log: (...data: string[]) => void;

  ready: () => void;
  emit: (event: Event, message?: any) => void;
  close: () => void;

  //

  incrementClickCount: () => void;
};
