import { getServerSocket, ServerClient } from "@da/socket";
import { Development } from "modules/development/main.ts";
import { InternalEvent } from "shared/enums/event.enum.ts";

const PORT = 24490;

export const internalProxy = () => {
  let $server;
  let $client: ServerClient;

  const load = async () => {
    $server = getServerSocket(PORT, () => new Response("404", { status: 404 }));

    $server.on(
      "guest",
      async ({ clientId, protocols: [type, token, gameId], headers }) => {
        if (type !== "game") return false;

        if ($client) return false;

        console.log("INTERNAL ->", "guest", clientId, token, gameId);
        return true;
      },
    );
    $server.on("connected", async (client: ServerClient) => {
      console.log("INTERNAL ->", "connected", client.id);
      $client = client;

      $client.on(InternalEvent.DISCONNECT_USER, ({ clientId }) => {
        Development.proxy.getClient(clientId)?.close();
      });
      $client.on(InternalEvent.USER_DATA, ({ clientId, event, message }) => {
        Development.proxy.getClient(clientId)?.emit(event, message);
      });
    });
    $server.on("disconnected", (client: ServerClient) => {
      console.log("INTERNAL ->", "disconnected", client.id);
      $client = null;
    });
    console.log(`(internal) on :${PORT}`);
  };

  const getServer = () => $server;
  const getClient = () => $client;

  return {
    load,

    getServer,
    getClient,
  };
};
