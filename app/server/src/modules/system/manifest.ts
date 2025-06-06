import { parse } from "@std/yaml";
import { Manifest } from "shared/types/manifest.types.ts";
import { dirname } from "@std/path";
import { System } from "modules/system/main.ts";

export const manifest = () => {
  let $manifest: Manifest;

  const load = async () => {
    const isDevelopment = System.isDevelopment();

    const manifestText = await Deno.readTextFile(
      `${isDevelopment ? "." : dirname(Deno.execPath())}/manifest.yml`,
    );
    $manifest = parse(manifestText);

    if (!isDevelopment && $manifest.id !== System.getEnvs().gameId)
      throw "Manifest is invalid!";
  };

  const get = () => $manifest;

  return {
    load,
    get,
  };
};
