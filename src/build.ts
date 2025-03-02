import $, { Path } from "@david/dax";
import { Uint8ArrayWriter, ZipReader } from "@zip-js/zip-js";
import * as ini from "@std/ini";
import { flavors, accents, baseTag } from "./consts.ts";

const cursors = [
  "default.cur", // Normal Select
  "help.cur", // Help Select
  "progress.ani", // Working in Background
  "wait.ani", // Busy
  "crosshair.cur", // Precision Select
  "text.cur", // Text Select
  "pencil.cur", // Handwriting
  "not-allowed.cur", // Unavailable
  "size_ver.cur", // Vertical Resize
  "size_hor.cur", // Horizontal Resize
  "size_fdiag.cur", // Diagonal Resize 1
  "size_bdiag.cur", // Diagonal Resize 2
  "all-scroll.cur", // Move
  "up-arrow.cur", // Alternate Select
  "pointer.cur", // Link Select
  "", // Location Select
  "", // Person Select
];

const inCursors = cursors
  .filter(Boolean)
  .map((v) => $.path(v).withExtname("").basename());

async function processFolder(inDir: Path, outDir: Path, schemeName: string) {
  await outDir.mkdir();
  await $`pipx run x2wincur ${inCursors} -o ${outDir.resolve()}`.cwd(inDir);

  const cursorDir = `Cursors\\${outDir.basename()}`;
  const regCursors = cursors
    // `v &&` filters out the empty entries
    .map((v) => v && `%SYSTEMROOT%\\${cursorDir}\\${v}`)
    .join(",");

  const installInf = {
    Version: { signature: "$CHICAGO$" },
    DefaultInstall: {
      CopyFiles: "Scheme.Cur, Scheme.Txt",
      AddReg: "Scheme.Reg",
    },
    DestinationDirs: {
      "Scheme.Cur": `10,"${cursorDir}"`,
      "Scheme.Txt": `10,"${cursorDir}"`,
    },
    "Scheme.Reg": [
      `HKCU,"Control Panel\\Cursors\\Schemes","${schemeName}",0x00020000,"${regCursors}"`,
    ],
    "Scheme.Cur": cursors.filter(Boolean),
  };

  const infFile = outDir.join("install.inf");
  await infFile.writeText(ini.stringify(installInf, { pretty: true }));
}

export function capitalize(str: string) {
  return str.substring(0, 1).toUpperCase() + str.substring(1);
}

if (import.meta.main) {
  const temp = await $.path("temp").emptyDir();
  const outBase = await $.path("out").emptyDir();

  let cacheBase = await $.path("cache").ensureDir();
  // Delete old caches
  for await (const file of cacheBase.readDir()) {
    if (file.name == baseTag) continue;
    await file.path.remove({ recursive: true });
  }
  cacheBase = await cacheBase.join(baseTag).ensureDir();

  const pb = $.progress("Building", {
    length: flavors.length * accents.length,
  });
  await pb.with(async () => {
    for (const flavor of flavors)
      for (const accent of accents) {
        const flavorName = capitalize(flavor);
        const accentName = capitalize(accent);
        const schemeName = `Catppuccin ${flavorName} ${accentName}`;
        const basename = `catppuccin-${flavor}-${accent}-cursors`;
        const url = `https://github.com/catppuccin/cursors/releases/download/${baseTag}/${basename}.zip`;
        pb.message(`${schemeName} Cursors`);

        const zip = cacheBase.join(basename).withExtname(".zip");
        if (!(await zip.exists())) {
          await zip.ensureFile();
          await $.request(url).showProgress().pipeToPath(zip);
        }

        const zipReader = new ZipReader(await zip.open());
        for await (const entry of zipReader.getEntriesGenerator()) {
          if (!entry.getData) continue;

          const uint8 = await entry.getData(new Uint8ArrayWriter());
          const filePath = temp.join(entry.filename);

          if (entry.directory) await filePath.ensureDir();
          else await filePath.write(uint8);
        }

        const inDir = temp.join(basename, "cursors");
        const outDir = outBase.join(basename);
        await processFolder(inDir, outDir, schemeName);

        // outdir.join(basename).remove({ recursive: true });
        pb.increment();
      }
  });

  await $.progress("Cleaning up...").with(async () => {
    await temp.remove({ recursive: true });
  });
}
