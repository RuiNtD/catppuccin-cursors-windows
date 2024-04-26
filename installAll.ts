import $ from "@david/dax";
import isAdmin from "is-admin";

if (Deno.build.os != "windows") throw "Windows required";
if (!(await isAdmin())) throw "Administrator required";

const outDir = $.path("win");

for await (const dir of outDir.readDir()) {
  if (!dir.isDirectory) continue;
  await dir.path.remove({ recursive: true });
}

// const zips = [...outDir.expandGlobSync("*.zip")];

// const pb1 = $.progress("Extracting", {
//   length: zips.length,
// });
// pb1.with(async () => {
//   for (const zip of zips) {
//     pb1.message(zip.name);
//     const zipReader = new ZipReader(await zip.path.open());
//     for await (const entry of zipReader.getEntriesGenerator()) {
//       if (!entry.getData) continue;

//       const uint8 = await entry.getData(new Uint8ArrayWriter());
//       const filePath = outDir.join(entry.filename);

//       if (entry.directory) await filePath.ensureDir();
//       else await filePath.write(uint8);
//     }
//     pb1.increment();
//   }
// });

const dirs = [...outDir.readDirSync()]
  .filter((v) => v.isDirectory)
  .map((v) => v.path);

const pb = $.progress("Installing", {
  length: dirs.length,
});
pb.with(async () => {
  for (const dir of dirs) {
    const name = dir.basename().replaceAll("-", " ");
    pb.message(name);
    const installInf = dir.join("install.inf");
    await $`InfDefaultInstall ${installInf}`;
    pb.increment();
  }
});
