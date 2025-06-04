import { getServerSocket, ServerClient } from "@da/socket";
import { getFreePort } from "@oh/utils";

export const socket = () => {
  let server;
  let port;

  const load = async () => {
    port = await getFreePort();
    server = getServerSocket(port);

    server.on(
      "guest",
      async ({
        clientId,
        protocols: [connectionType, ...protocols],
        headers,
      }) => {
        return true;
      },
    );
    server.on("connected", async (client: ServerClient) => {});
    server.on("disconnected", (client: ServerClient) => {});
    console.log(`Started on http://localhost:${port}`);
  };

  return {
    load,
  };
};
