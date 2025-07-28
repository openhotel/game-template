import { Envs } from "shared/types/main.ts";
import { ulid } from "@std/ulid";

export const getProcessedEnvs = ({ version, gameId }: Envs): Envs => ({
  version: version === "__VERSION__" ? "development" : version,
  gameId: gameId === "__GAME_ID__" ? ulid() : gameId,
});
