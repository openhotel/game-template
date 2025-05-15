import { parseArgs } from "@std/cli/parse-args";
import { getBeautyDate } from "@oh/utils";

const log = (message: string, color = "#FFFFFF") => {
  console.log(
    `%c${getBeautyDate()} | %c${message}`,
    `color: #666666`,
    `color: ${color}`,
  );
};

log(`Welcome to Open Hotel MiniGame Build Process!`);

try {
  log(`Cleaning old build...`, "gray");
  await Deno.remove("./build", {
    recursive: true,
  });
} catch (_) {}

let { debug, version } = parseArgs(Deno.args);

if (!version) version = `1.0.0`;

log(`Version: ${version}`, "yellow");

const commandInstall = new Deno.Command(Deno.execPath(), {
  args: ["task", "install"],
});
const installChild = await commandInstall.spawn();

if (!(await installChild.status).success)
  throw new Error("Install had an error!");

// client build
log(`Client - Compiling...`, "gray");

const clientPath = "./app/client";
const $permanentViteConfigPath = `${clientPath}/vite.config.ts`;
const $temporalViteConfigPath = `${clientPath}/$vite.config.ts`;

try {
  log(`Server - Removing old $vite.config.ts`, "gray");
  await Deno.remove($temporalViteConfigPath);
} catch (_) {}

const viteConfigFileText = await Deno.readTextFile($permanentViteConfigPath);
log(`Server - Generating $vite.config.ts`, "gray");
await Deno.writeTextFile(
  $temporalViteConfigPath,
  viteConfigFileText.replace("__VERSION__", version),
);

const command = new Deno.Command(`vite`, {
  args: ["build", `--config=$vite.config.ts`],
  cwd: clientPath,
  stdout: debug ? "inherit" : "piped",
});
const child = command.spawn();

if (!(await child.status).success)
  throw new Error("Client - Build had an error!");
log(`Client - Build was successful!`, "green");

try {
  await Deno.remove($temporalViteConfigPath);
} catch (_) {}

// server build
const serverCommand = new Deno.Command(Deno.execPath(), {
  args: ["task", "build:server"],
  stdout: debug ? "inherit" : "piped",
});
const serverChild = serverCommand.spawn();

if (!(await serverChild.status).success)
  throw new Error("Server - Build had an error!");
log(`Server - Build was successful!`, "green");

log(`Done!`, "#FFFFFF");
