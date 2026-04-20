import $ from "@david/dax";
import AdmZip from "adm-zip";
import { startCase } from "es-toolkit/string";
import { accents, flavors } from "./consts.ts";

if (import.meta.main) {
  const outBase = $.path("out");
  const distBase = $.path("dist");
  await distBase.emptyDir();

  const pb = $.progress("Zipping", {
    length: flavors.length * (accents.length + 1) + 1,
  });
  await pb.with(async () => {
    const allZip = new AdmZip();
    const allInf = outBase.join(`install-all.bat`);
    allZip.addLocalFile(`${allInf}`);

    for (const flavor of flavors) {
      const flavorZip = new AdmZip();
      const flavorInf = outBase.join(`install-all-${flavor}.bat`);
      flavorZip.addLocalFile(`${flavorInf}`);
      allZip.addLocalFile(`${flavorInf}`);

      for (const accent of accents) {
        const basename = `catppuccin-${flavor}-${accent}-cursors`;
        pb.message(startCase(basename)).forceRender();

        const inDir = outBase.join(basename);
        const outZip = distBase.join(`${basename}.zip`);

        const zip = new AdmZip();
        zip.addLocalFolder(`${inDir}`, `${basename}`);
        allZip.addLocalFolder(`${inDir}`, `${basename}`);
        flavorZip.addLocalFolder(`${inDir}`, `${basename}`);
        await zip.writeZipPromise(`${outZip}`);

        // outdir.join(basename).remove({ recursive: true });
        pb.increment();
      }

      const basename = `all-catppuccin-${flavor}-cursors`;
      pb.message(startCase(basename)).forceRender();
      await flavorZip.writeZipPromise(`${distBase.join(`${basename}.zip`)}`);
      pb.increment();
    }

    const basename = `all-catppuccin-cursors`;
    pb.message(startCase(basename)).forceRender();
    await allZip.writeZipPromise(`${distBase.join(`${basename}.zip`)}`);
    pb.increment();
  });
}
