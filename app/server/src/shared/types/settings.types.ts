export type SettingsTypes = {
  version: string;
  name: string;
  repo: string;
  kickFromCurrentRoom: boolean;
  screen: "fullscreen" | "windowed";
  windowSize: {
    width: number;
    height: number;
  };
};
