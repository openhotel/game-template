import { parse } from "@std/yaml";
import { Manifest } from "shared/types/manifest.types.ts";
import { dirname } from "@std/path";
import { System } from "modules/system/main.ts";

export const manifest = () => {
  let $manifest: Manifest;

  const load = async () => {
    const manifestText = await Deno.readTextFile(
      `${dirname(Deno.execPath())}/manifest.yml`,
    );
    $manifest = parse(manifestText);

    if ($manifest.id !== System.getEnvs().gameId) throw "Manifest is invalid!";
  };

  const get = () => $manifest;

  return {
    load,
    get,
  };
};
