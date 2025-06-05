import { getServerSocket, ServerClient } from "@da/socket";
import { Development } from "modules/development/main.ts";
import { Event } from "shared/enums/event.enum.ts";
import { getRandomString } from "@oh/utils";

const PORT = 29940;

export const proxy = () => {
  let server;

  let clientMap: Record<string, ServerClient> = {};

  let clientAccountMap: Record<string, string> = {};
  let accountClientMap: Record<string, string> = {};

  const load = () => {
    server = getServerSocket(PORT, () => new Response("404", { status: 404 }));

    server.on(
      "guest",
      async ({
        clientId,
        protocols: [connectionType, gameId, accountId, token],
        headers,
      }) => {
        if (connectionType !== "game") return false;

        clientAccountMap[clientId] = accountId;
        accountClientMap[accountId] = clientId;
        // console.log("PROXY ->", "guest", clientId, gameId, accountId, token);
        return true;
      },
    );
    server.on("connected", async (client: ServerClient) => {
      // console.log("PROXY ->", "connected", client.id);

      clientMap[client.id] = client;
      const accountId = clientAccountMap[client.id];

      Development.internalProxy.getClient().emit(Event.$USER_JOIN, {
        clientId: client.id,
        accountId,
        username: `Player_${getRandomString(4)}`,
      });

      client.on(Event.$USER_EXIT, () => {
        client.close();
      });
      client.on(Event.$USER_DATA, ({ event, message }) => {
        Development.internalProxy.getClient().emit(Event.$USER_DATA, {
          clientId: client.id,
          accountId,
          event,
          message,
        });
      });
      client.on(Event.$USER_READY, () => {
        Development.internalProxy.getClient().emit(Event.$USER_READY, {
          clientId: client.id,
          accountId,
        });
      });
    });
    server.on("disconnected", (client: ServerClient) => {
      // console.log("PROXY ->", "disconnected", client.id);

      const accountId = clientAccountMap[client.id];

      Development.internalProxy.getClient().emit(Event.$USER_LEAVE, {
        clientId: client.id,
        accountId,
      });

      delete accountClientMap[accountId];
      delete clientAccountMap[client.id];
      delete clientMap[client.id];
    });
    console.log(`/proxy on :${PORT}`);
  };

  const getServer = () => server;
  const getClient = (clientId: string) => clientMap[clientId];

  return {
    load,

    getServer,
    getClient,
  };
};
