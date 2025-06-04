import { getChildWorker } from "worker_ionic";
import { eventList } from "./events/main.ts";

export const worker = () => {
  const serverWorker = getChildWorker();

  const load = async () => {
    for (const { event, func } of eventList)
      serverWorker.on(event, (data: unknown) => func({ data }));
  };

  const getServerWorker = () => serverWorker;

  return {
    load,

    getServerWorker,
  };
};
