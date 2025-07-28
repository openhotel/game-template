declare const __APP_DATA: { version: string };

export const getInternalVersion = (): string =>
  __APP_DATA.version === "__VERSION__" ? "development" : __APP_DATA.version;
