export enum Event {
  //internal
  $USER_JOIN = "$$user-join",
  $USER_LEAVE = "$$user-leave",
  $USER_DATA = "$$user-data",
  $USER_READY = "$$user-ready",
  $USER_EXIT = "$$user-exit",
  //
  CLICK = "click",
}

export enum InternalEvent {
  DISCONNECT_USER = "disconnect-user",
  USER_DATA = "user-data",
}
