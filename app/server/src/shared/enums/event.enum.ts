export enum Event {
  CLICK = "click",
}

export enum ServerEvent {
  PING = "PING",
  PONG = "PONG",

  USER_JOIN = "USER_JOIN",
  USER_LEAVE = "USER_LEAVE",
  USER_DATA = "USER_DATA",
  USER_READY = "USER_READY",

  DISCONNECT_USER = "DISCONNECT_USER",
}
