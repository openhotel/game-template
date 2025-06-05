import { getRandomString } from "@oh/utils";
import { proxy } from "./proxy.ts";
import { internalProxy } from "./internal-proxy.ts";

export const Development = (() => {
  const state = getRandomString(16);

  const $internalProxy = internalProxy();
  const $proxy = proxy();

  const load = async () => {
    console.log(
      "\n    ------------------\n    DEVELOPMENT SERVER\n    ------------------\n",
    );
    console.log = (...data) => console.info("DEV ->", ...data);

    await $internalProxy.load();
    $proxy.load();
  };

  return {
    load,

    internalProxy: $internalProxy,
    proxy: $proxy,
  };
})();
