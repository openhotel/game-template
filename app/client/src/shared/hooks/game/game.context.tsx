import { createContext } from "react";
import { GameStartParams } from "@oh/utils";

export const GameContext = createContext<GameStartParams>(undefined);
