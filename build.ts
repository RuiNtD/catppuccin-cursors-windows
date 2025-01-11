import $, { Path } from "@david/dax";
import { Uint8ArrayWriter, ZipReader } from "@zip-js/zip-js";
import * as ini from "@std/ini";
import { expandGlob } from "@std/fs";

const cursors = [
  "default.cur", // Normal Select
  "help.cur", // Help Select
  "progress.ani", // Working in Background
  "wait.ani", // Busy
  "cross.cur", // Precision Select
  "text.cur", // Text Select
  "pencil.cur", // Handwriting
  "not-allowed.cur", // Unavailable
  "ns-resize.cur", // Vertical Resize
  "ew-resize.cur", // Horizontal Resize
  "nwse-resize.cur", // Diagonal Resize 1
  "nesw-resize.cur", // Diagonal Resize 2
  "all-scroll.cur", // Move
  "up-arrow.cur", // Alternate Select
  "pointer.cur", // Link Select
  "", // Location Select
  "", // Person Select
];

const inCursors = cursors
  .filter(Boolean)
  .map((v) => $.path(v).withExtname("").basename());

async function processFolder(inDir: Path, outDir: Path) {
  const schemeName = inDir.basename().split("-").slice(0, -1).join(" ");

  await outDir.mkdir();

  const cursorsDir = inDir.join("cursors");
  const inFiles = inCursors.map((v) => cursorsDir.join(v));
  await $`pipx run -q x2wincur ${inFiles} -o ${outDir}`;

  const cursorDir = `Cursors\\${schemeName.split(" ").join("\\")}`;
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

if (import.meta.main) {
  const temp = $.path("temp");
  await temp.emptyDir();
  const outdir = $.path("win");
  await outdir.emptyDir();

const cursorsDir = $.path("orig/cursors");
  const pb = $.progress("Building", {
    length: [...cursorsDir.readDirSync()].length,
  });
  await pb.with(async () => {
    for await (const zip of expandGlob(cursorsDir.join("*.zip").toString())) {
      const path = $.path(zip.path);
      const basename = path.withExtname("").basename();
      const indir = temp.join(basename);
      pb.message(basename.replaceAll("-", " "));

      const zipReader = new ZipReader(await path.open());
      for await (const entry of zipReader.getEntriesGenerator()) {
        if (!entry.getData) continue;

        const uint8 = await entry.getData(new Uint8ArrayWriter());
        const filePath = temp.join(entry.filename);

        if (entry.directory) await filePath.ensureDir();
        else await filePath.write(uint8);
      }
      await processFolder(indir, outdir.join(basename));

      // const zipWriter = new ZipWriter(
      //   await outdir.join(`${basename}.zip`).open({ write: true, create: true })
      // );
      // for await (const file of outdir.join(basename).expandGlob("*"))
      //   await zipWriter.add(`${basename}/${file.name}`, await file.path.open());
      // await zipWriter.close();

      // outdir.join(basename).remove({ recursive: true });
      pb.increment();
    }
  });
  temp.remove({ recursive: true });
}
