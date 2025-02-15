// lib/module-system.ts
import { register as Module1 } from "@/modules/crm";
import { register as Module2 } from "@/modules/analytics";

declare global {
  var __GLOBAL_MODULE_SYSTEM__: ModuleSystem | undefined;
}

class ModuleSystem {
  private modulesRegistered: boolean = false;

  public constructor() {
    console.log("🔥 ModuleSystem instance created!");
  }

  registerModules() {
    if (this.modulesRegistered) return;
    console.log("⚡ Registering modules...");
    Module1();
    Module2();
    this.modulesRegistered = true;
  }
}

// ✅ FINAL FIX: Use `globalThis` instead of `global`
const moduleInstance = globalThis.__GLOBAL_MODULE_SYSTEM__ ?? new ModuleSystem();
if (!globalThis.__GLOBAL_MODULE_SYSTEM__) {
  console.log("⚡ Creating global ModuleSystem instance...");
  globalThis.__GLOBAL_MODULE_SYSTEM__ = moduleInstance;
}

export const GlobalModuleSystem = globalThis.__GLOBAL_MODULE_SYSTEM__;
