import { ConfigTypes } from "shared/types/config.types.ts";

export const CONFIG_DEFAULT: ConfigTypes = {
  version: "latest",
  name: "Game Template",
  repo: "openhotel/game-template",
  kickFromCurrentRoom: true,
  screen: "fullscreen",
  windowSize: {
    width: 200,
    height: 150,
  },
};
