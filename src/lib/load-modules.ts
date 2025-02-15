import path from "path";
import fs from "fs";
import vm from "vm";

async function getModulePaths(modulesDir: string): Promise<string[]> {
  if (!fs.existsSync(modulesDir)) {
    console.warn(`⚠️ No modules directory found at ${modulesDir}. Skipping.`);
    return [];
  }

  console.log(`📂 Scanning for modules in: ${modulesDir}`);

  return fs
    .readdirSync(modulesDir)
    .filter((folder) => fs.existsSync(path.join(modulesDir, folder, "module.config.js")))
    .map((folder) => path.join(modulesDir, folder, "module.config.js"));
}

function loadModuleFromFile(modulePath: string) {
  if (!fs.existsSync(modulePath)) {
    console.error(`❌ Module file not found: ${modulePath}`);
    return null;
  }

  try {
    console.log(`📥 Loading module from: ${modulePath}`);

    // Read the file contents
    let scriptContent = fs.readFileSync(modulePath, "utf-8");

    // Automatically convert ES module syntax to CommonJS if needed
    if (scriptContent.includes("export default")) {
      console.warn(`⚠️ Detected 'export default' in ${modulePath}. Converting to CommonJS.`);
      scriptContent = scriptContent.replace("export default", "module.exports =");
    }

    // Use Node.js `vm` to execute the script safely in a new context
    const script = new vm.Script(scriptContent);
    const sandbox: { module: { exports: any }, exports: any } = { module: { exports: {} }, exports: {} }; // Create a clean sandbox
    const context = vm.createContext(sandbox);

    script.runInContext(context);

    return sandbox.module.exports || sandbox.exports; // Handle both module.exports & exports
  } catch (err) {
    console.error(`❌ Failed to load module at ${modulePath}:`, err);
    return null;
  }
}

export async function loadModules() {
  console.log("🔄 Loading Modules...");
  const projectRoot = process.cwd();

  const baseModulesDir = path.resolve(projectRoot, "src/modules");;
  const clientModulesDir = process.env.CLIENT_MODULES_PATH
    ? path.resolve(process.env.CLIENT_MODULES_PATH)
    : "";

  const baseModulePaths = await getModulePaths(baseModulesDir);
  const clientModulePaths = clientModulesDir ? await getModulePaths(clientModulesDir) : [];
  console.log({ baseModulePaths, clientModulePaths });
  const allModulePaths = [...baseModulePaths, ...clientModulePaths];

  console.log(`📦 Found ${allModulePaths.length} modules to load.`);

  const importedModules = allModulePaths
    .map((modulePath) => loadModuleFromFile(modulePath))
    .filter((mod) => mod); // Remove nulls

  const loadedModules = importedModules.map((mod) => ({
    name: mod.name,
    routes: mod.routes.map((route: { path: string; componentPath: string }) => ({
      path: route.path,
      componentPath: route.componentPath,
    })),
  }));

  console.log("✅ Loaded modules:", JSON.stringify(loadedModules, null, 2)); // Debugging output

  return loadedModules;
}
