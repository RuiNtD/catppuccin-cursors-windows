import $ from "@david/dax";
import { ZipWriter } from "@zip-js/zip-js";
import { _format } from "https://jsr.io/@std/path/1.0.8/_common/format.ts";

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

export function capitalize(str: string) {
  return str.substring(0, 1).toUpperCase() + str.substring(1);
}

if (import.meta.main) {
  const outBase = $.path("out");
  const distBase = $.path("dist");
  await distBase.ensureDir();

  const pb = $.progress("Zipping", {
    length: flavors.length * accents.length,
  });
  await pb.with(async () => {
    for (const flavor of flavors)
      for (const accent of accents) {
        const flavorName = capitalize(flavor);
        const accentName = capitalize(accent);
        const schemeName = `Catppuccin ${flavorName} ${accentName}`;
        const basename = `catppuccin-${flavor}-${accent}-cursors`;
        pb.message(`${schemeName} Cursors`);

        const inDir = outBase.join(basename);
        const outZip = distBase.join(`${basename}.zip`);

        const zipWriter = new ZipWriter(
          await outZip.open({ write: true, create: true })
        );
        for await (const file of inDir.readDirFilePaths())
          await zipWriter.add(
            `${basename}/${file.basename()}`,
            await file.open()
          );
        await zipWriter.close();

        // outdir.join(basename).remove({ recursive: true });
        pb.increment();
      }
  });
}
