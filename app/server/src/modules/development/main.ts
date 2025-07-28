import { proxy } from "./proxy.ts";
import { server } from "./server.ts";

export const Development = (() => {
  const $proxy = proxy();
  const $server = server();

  const load = async () => {
    console.log(
      "\n    ------------------\n    DEVELOPMENT SERVER\n    ------------------\n",
    );
    // console.log = (...data) =>
    //   Deno.stdout.write(new TextEncoder().encode(`DEV -> ${data.join(" ")}`));

    $server.load();
    $proxy.load();
  };

  return {
    load,

    proxy: $proxy,
    server: $server,
  };
})();
