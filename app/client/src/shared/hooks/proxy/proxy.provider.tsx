import React, { ReactNode, useCallback, useState } from "react";
import { ProxyContext } from "./proxy.context";
import { useConfig } from "shared/hooks";
import {
  getClientSocket,
  getRandomString,
  getWebSocketUrl,
} from "shared/utils";
import { ulid } from "ulidx";
import { Event } from "shared/enums";
import { LoaderComponent } from "shared/components";

type ProxyProps = {
  children: ReactNode;
};

export const ProxyProvider: React.FunctionComponent<ProxyProps> = ({
  children,
}) => {
  const { isDevelopment } = useConfig();

  const [loadingMessage, setLoadingMessage] =
    useState<string>("system.connecting");

  const params = new URLSearchParams(location.search);
  const gameId = params.get("game") ?? (isDevelopment() ? ulid() : null);
  const accountId = params.get("account") ?? (isDevelopment() ? ulid() : null);
  const token =
    params.get("token") ?? (isDevelopment() ? getRandomString(16) : null);

  const [socket] = useState(() => {
    setLoadingMessage("system.connecting");

    const $socket = getClientSocket({
      url: getWebSocketUrl(`${window.location.origin}/proxy`),
      protocols: ["game", gameId, accountId, token],
      reconnect: false,
      silent: !isDevelopment(),
    });
    $socket.on("connected", () => {
      setLoadingMessage(null);
    });
    $socket.on("disconnected", () => {
      setLoadingMessage("system.proxy_disconnected");
    });
    $socket.connect().catch(() => {
      setLoadingMessage("proxy_not_reachable");
    });

    return $socket;
  });

  const emit = useCallback(
    (event: Event, message: unknown) => {
      socket?.emit("$$user-data", { event, message });
    },
    [socket],
  );

  const on = useCallback(
    (event: Event, callback: (data: unknown) => void | Promise<void>) =>
      socket?.on(event, callback),
    [socket],
  );

  const ready = useCallback(() => {
    socket?.emit("$$user-ready", { d: Date.now(), p: performance.now() });
  }, [emit]);

  const exit = useCallback(() => {
    socket?.emit("$$user-exit", { d: Date.now(), p: performance.now() });
  }, [emit]);

  return (
    <ProxyContext.Provider
      value={{
        emit,
        on,
        ready,
        exit,
      }}
      children={
        <LoaderComponent message={loadingMessage} children={children} />
      }
    />
  );
};
