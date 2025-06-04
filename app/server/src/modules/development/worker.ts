import { WorkerParent, getParentWorker } from "worker_ionic";
import { Event } from "shared/enums/event.enum.ts";

export const worker = () => {
  let $worker: WorkerParent;
  const load = async () => {
    $worker = getParentWorker({
      url: new URL("../../../mod.ts", import.meta.url).href,
    });
    $worker.on(Event.LOADED, () => {
      console.log("Game loaded!");
      $worker.emit(Event.USER_JOIN, {});
    });
    $worker.on(Event.GAME_START, () => {
      console.log("GAME_START");
    });
    $worker.on(Event.GAME_END, () => {
      console.log("GAME_END");
    });
  };

  return {
    load,
  };
};
