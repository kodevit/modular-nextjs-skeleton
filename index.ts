import next from "next";
import path from "path";
import fs from "fs";
import { spawn } from "child_process";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function runBaseSystem(clientModulesPath = "") {
  console.log("🚀 Initializing Base System...");

  const baseDir = path.resolve(__dirname);
  const clientRootDir = process.cwd(); // Client system root
  const clientModulesDir = clientModulesPath
    ? path.resolve(clientRootDir, clientModulesPath)
    : "";

  // Store the client modules path in an environment variable
  process.env.CLIENT_MODULES_PATH = clientModulesDir;

  // Ensure client modules exist
  if (clientModulesDir && !fs.existsSync(clientModulesDir)) {
    console.warn(`⚠️ No client modules directory found at ${clientModulesDir}. Proceeding with base system only.`);
  } else {
    console.log("📂 Using Client `modules/` directory:", clientModulesDir);
  }

  console.log("🚀 Starting Next.js from:", baseDir);

  // Start Next.js using spawn
  const nextProcess = spawn("npx", ["next", "dev", "-p", "3000"], {
    cwd: baseDir,
    stdio: "inherit",
    shell: true,
    env: {
      ...process.env, // Pass environment variables
      CLIENT_MODULES_PATH: clientModulesDir, // Ensure it's passed to the Next.js process
    },
  });

  // ✅ Handle `Ctrl+C` to clean up properly
  process.on("SIGINT", () => {
    console.log("🛑 SIGINT received. Terminating Next.js process...");
    nextProcess.kill("SIGINT");
    process.exit();
  });

  process.on("SIGTERM", () => {
    console.log("🛑 SIGTERM received. Shutting down Next.js...");
    nextProcess.kill("SIGTERM");
    process.exit();
  });

  nextProcess.on("exit", (code) => {
    console.log(`🔚 Next.js process exited with code ${code}`);
    process.exit(code);
  });

  console.log("✅ Server running at http://localhost:3000");
}
