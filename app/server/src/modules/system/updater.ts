import { System } from "modules/system/main.ts";
import { update } from "@oh/utils";
import { parseArgs } from "@std/cli/parse-args";

export const updater = () => {
  const $update = async () => {
    const { preventUpdate } = parseArgs(Deno.args);
    const envs = System.getEnvs();

    const isDevelopment = envs.version === "development";

    if (isDevelopment || preventUpdate) return;

    const { repository } = System.manifest.get();

    console.info(`Trying to update from ${envs.version}...`);
    if (
      await update({
        targetVersion: "latest",
        version: envs.version,
        repository,
        log: console.log,
        debug: console.debug,
      })
    )
      //@ts-ignore
      Deno.exit();
  };

  const load = async () => {
    await $update();
  };

  return {
    load,
  };
};
