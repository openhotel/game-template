import { parse } from "@std/yaml";
import { Manifest } from "shared/types/manifest.types.ts";

export const manifest = () => {
  let $manifest: Manifest;

  const load = async () => {
    const manifestText = await Deno.readTextFile("./manifest.yml");
    $manifest = parse(manifestText);
  };

  const get = () => $manifest;

  return {
    load,
    get,
  };
};
