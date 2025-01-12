import $ from "@david/dax";
import isAdmin from "is-admin";
import { capitalize } from "./build.ts";

if (Deno.build.os != "windows") throw "Windows required";
if (!(await isAdmin())) throw "Administrator required";

const outDir = $.path("out");

const dirs = Array.from(outDir.readDirSync())
  .filter((v) => v.isDirectory)
  .map((v) => v.path);

const pb = $.progress("Installing", {
  length: dirs.length,
});
pb.with(async () => {
  for (const dir of dirs) {
    const name = dir.basename().split("-").map(capitalize).join(" ");
    pb.message(name);
    const installInf = dir.join("install.inf");
    await $`InfDefaultInstall ${installInf}`;
    pb.increment();
  }
});
