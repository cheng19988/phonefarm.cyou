import { writeFileSync } from "fs";
import { join } from "path";
import {
  buildAiCatalogJson,
  buildAiTxt,
  buildLlmsFullTxt,
  buildLlmsTxt,
} from "../src/lib/ai-discovery";

const publicDir = join(process.cwd(), "public");

writeFileSync(join(publicDir, "llms.txt"), buildLlmsTxt(), "utf8");
writeFileSync(join(publicDir, "llms-full.txt"), buildLlmsFullTxt(), "utf8");
writeFileSync(join(publicDir, "ai.txt"), buildAiTxt(), "utf8");
writeFileSync(
  join(publicDir, "ai-catalog.json"),
  JSON.stringify(buildAiCatalogJson(), null, 2),
  "utf8"
);

console.log("[ai-files] Generated llms.txt, llms-full.txt, ai.txt, ai-catalog.json");
