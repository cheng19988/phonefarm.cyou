import { execSync } from "child_process";
import { getPrismaEnv } from "./ensure-prisma-env.mjs";

execSync("prisma generate", { stdio: "inherit", env: getPrismaEnv() });
