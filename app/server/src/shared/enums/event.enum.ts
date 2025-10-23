export enum Event {
  CLICK = "click",

  $$CONFIG = "$$config",
}

export enum ServerEvent {
  PING = "PING",
  PONG = "PONG",

  USER_JOIN = "USER_JOIN",
  USER_LEAVE = "USER_LEAVE",
  USER_DATA = "USER_DATA",
  USER_READY = "USER_READY",

  USER_REWARD = "USER_REWARD",

  DISCONNECT_USER = "DISCONNECT_USER",
}
