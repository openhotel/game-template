export const GameServer = (() => {
  const load = async () => {
    console.log("Load game server");
  };

  const shutdown = () => {
    console.log(`Game server shutting down :_(`);
  };

  return {
    load,
    shutdown,
  };
})();
