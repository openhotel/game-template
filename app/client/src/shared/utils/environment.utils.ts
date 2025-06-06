import { ulid } from "ulidx";

declare const __APP_DATA: { version: string; gameId: string };

export const getInternalVersion = (): string =>
  __APP_DATA.version === "__VERSION__" ? "development" : __APP_DATA.version;

export const getInternalGameId = (): string =>
  __APP_DATA.gameId === "__GAME_ID__" ? ulid() : __APP_DATA.gameId;
