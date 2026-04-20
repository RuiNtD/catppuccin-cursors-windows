import $, { ProgressBar } from "@david/dax";
import { flavors, accents, baseTag } from "./consts.ts";
import { flatten } from "es-toolkit/array";
import { startCase } from "es-toolkit/string";
import pMap from "p-map";

const batHeader = `
@echo off
:: Check for administrative permissions
net session >nul 2>&1
if %errorLevel% == 0 (
  echo Installing Catppuccin cursors...
) else (
  echo Requesting administrative privileges...
  powershell start-process '%~f0' -verb runas
  exit /b
)

cd /d "%~dp0"
`;

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

  let pb: ProgressBar;

  pb = $.progress("Downloading", {
    length: flavors.length * accents.length,
  });
  await pb.with(async () => {
    for (const flavor of flavors)
      for (const accent of accents) {
        const basename = `catppuccin-${flavor}-${accent}-cursors`;
        const url = `https://github.com/catppuccin/cursors/releases/download/${baseTag}/${basename}.zip`;
        pb.message(startCase(basename));

        const zipFile = cacheBase.join(basename).withExtname(".zip");
        if (!(await zipFile.exists())) {
          await zipFile.ensureFile();
          await $.request(url).showProgress().pipeToPath(zipFile);
        }

        pb.increment();
      }
  });

  pb = $.progress("Extracting...", {
    length: flavors.length * accents.length,
  });
  await pb.with(async () => {
    await pMap(
      flatten(
        flavors.map((flavor) =>
          accents.map((accent) => [flavor, accent] as const),
        ),
      ),
      async ([flavor, accent]) => {
        const basename = `catppuccin-${flavor}-${accent}-cursors`;
        // pb.message(startCase(basename));

        const zipFile = cacheBase.join(basename).withExtname(".zip");

        // Doesn't work with symlinks :(
        // const zip = new AdmZip(`${zipFile}`);
        // zip.extractAllTo(`${temp}`);
        await $`7z x ${zipFile} -o${temp} ${basename}/cursors/`.quiet();

        pb.increment();
      },
      { concurrency: 1 },
    );
  });

  pb = $.progress("Building", {
    length: flavors.length * accents.length,
  });
  await pb.with(async () => {
    for (const flavor of flavors) {
      for (const accent of accents) {
        const basename = `catppuccin-${flavor}-${accent}-cursors`;
        pb.message(startCase(basename));

        const inDir = temp.join(basename, "cursors");
        const outDir = await outBase.join(basename).ensureDir();
        // await processFolder(inDir, outDir);
        const schemeName = startCase(basename)
          .replace(" Cursors", "")
          .replace("Frappe", "Frappé");
        await $`pipx run --spec win2xcur x2wincurtheme ${inDir} -o ${outDir} -n ${schemeName}`;

        // outdir.join(basename).remove({ recursive: true });
        pb.increment();
      }

      const lines = accents
        .map((accent) => `catppuccin-${flavor}-${accent}-cursors`)
        .map((v) => `InfDefaultInstall ${v}\\install.inf`);
      outBase
        .join(`install-all-${flavor}.bat`)
        .writeText(batHeader + lines.join("\n"));
    }

    const lines = flatten(
      flavors.map((flavor) =>
        accents.map((accent) => `catppuccin-${flavor}-${accent}-cursors`),
      ),
    ).map((v) => `InfDefaultInstall ${v}\\install.inf`);
    outBase.join(`install-all.bat`).writeText(batHeader + lines.join("\n"));
  });

  await $.progress("Cleaning up...").with(async () => {
    await temp.remove({ recursive: true });
  });
}
