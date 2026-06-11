import { execSync } from "child_process";
import { getPrismaEnv } from "./ensure-prisma-env.mjs";

execSync("node scripts/check-build-env.mjs", { stdio: "inherit" });

const env = getPrismaEnv();

execSync("prisma generate", { stdio: "inherit", env });
execSync("npx tsx scripts/generate-ai-files.ts", { stdio: "inherit", env });
execSync("prisma migrate deploy", { stdio: "inherit", env });
execSync("prisma db seed", { stdio: "inherit", env });
execSync("next build", { stdio: "inherit", env });
