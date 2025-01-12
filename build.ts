import $, { Path } from "@david/dax";
import { Uint8ArrayWriter, ZipReader, ZipWriter } from "@zip-js/zip-js";
import * as ini from "@std/ini";

const baseTag = "v1.0.2";

const accents = [
  "blue",
  "dark",
  "flamingo",
  "green",
  "lavender",
  "light",
  "maroon",
  "mauve",
  "peach",
  "pink",
  "red",
  "rosewater",
  "sapphire",
  "sky",
  "teal",
  "yellow",
];
const flavors = ["frappe", "latte", "macchiato", "mocha"];

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
  await $`pipx run -q x2wincur ${inCursors} -o ${outDir.resolve()}`.cwd(inDir);

  const cursorDir = `Cursors\\${outDir.basename()}`;
  const regCursors = cursors
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
  await outDir
    .join("install.inf")
    .writeText(ini.stringify(installInf, { pretty: true }));
}

export function capitalize(str: string) {
  return str.substring(0, 1).toUpperCase() + str.substring(1);
}

if (import.meta.main) {
  const temp = $.path("temp");
  await temp.emptyDir();
  const outBase = $.path("out");
  await outBase.emptyDir();

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

        const zip = $.path("cache").join(baseTag, basename).withExtname(".zip");
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

        const zipWriter = new ZipWriter(
          await outBase
            .join(`${basename}.zip`)
            .open({ write: true, create: true })
        );
        for await (const file of outDir.readDirFilePaths())
          await zipWriter.add(
            `${basename}/${file.basename()}`,
            await file.open()
          );
        await zipWriter.close();

        // outdir.join(basename).remove({ recursive: true });
        pb.increment();
      }
  });
  await temp.remove({ recursive: true });
}
