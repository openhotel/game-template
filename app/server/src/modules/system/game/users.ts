import { User, UserMutable } from "shared/types/user.types.ts";
import { System } from "modules/system/main.ts";
import { Event, InternalEvent } from "shared/enums/event.enum.ts";

export const users = () => {
  let $userMap: Record<string, UserMutable> = {};

  const $getUser = (user: User): UserMutable => {
    let clickCount = 0;

    const getAccountId = () => user.accountId;
    const getUsername = () => user.username;

    const log = (...data: string[]) => {
      console.log(`${getUsername()} ${data.join(" ")}`);
    };

    const incrementClickCount = () => {
      clickCount++;
      if (clickCount >= 10) {
        return close();
      }
      emit(Event.CLICK, { status: 200 });
    };

    const ready = () => {
      log("ready");
    };

    const emit = (event: Event, message?: any) =>
      System.proxy.getSocket().emit(InternalEvent.USER_DATA, {
        clientId: user.clientId,
        event,
        message,
      });

    const close = () =>
      System.proxy
        .getSocket()
        .emit(InternalEvent.DISCONNECT_USER, { clientId: user.clientId });

    return {
      getAccountId,
      getUsername,

      log,

      ready,
      emit,
      close,

      incrementClickCount,
    };
  };

  const add = (user: User) => {
    const $user = $getUser(user);
    $userMap[user.accountId] = $user;
    $user.log("joined");
  };

  const remove = (accountId: string) => {
    $userMap[accountId].log("left");
    delete $userMap[accountId];
  };

  const get = (accountId: string): UserMutable | null => $userMap[accountId];

  const getList = async () => Object.values($userMap);

  return {
    add,
    remove,

    get,
    getList,
  };
};
