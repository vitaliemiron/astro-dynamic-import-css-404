// Lists /_astro/*.css files referenced by built JS chunks that are not in dist/.
import { readdirSync, readFileSync, existsSync } from "node:fs";
const dir = "dist/_astro";
let missing = 0;
for (const f of readdirSync(dir).filter((f) => f.endsWith(".js"))) {
  for (const [ref] of readFileSync(`${dir}/${f}`, "utf8").matchAll(/[\w.-]+\.css/g)) {
    if (!existsSync(`${dir}/${ref}`)) { console.log(`${f} references missing ${ref}`); missing++; }
  }
}
console.log(missing ? `${missing} missing` : "no missing CSS");
process.exit(missing ? 1 : 0);
