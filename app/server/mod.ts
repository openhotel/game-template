import { load as loadEnv } from "loadenv";
import { System } from "modules/system/main.ts";
import { getProcessedEnvs } from "shared/utils/envs.utils.ts";

const envs = getProcessedEnvs({
  version: "__VERSION__",
  settings: "__SETTINGS__",
});

await loadEnv();
System.load(envs);
