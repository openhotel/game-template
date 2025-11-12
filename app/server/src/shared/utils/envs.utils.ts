import { Envs } from "shared/types/main.ts";

export const getProcessedEnvs = ({ version, settings }: Envs): Envs => ({
  version: version === "__VERSION__" ? "development" : version,
  settings,
});
