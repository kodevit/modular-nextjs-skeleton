// lib/server.ts
import { GlobalModuleSystem } from "@/lib/modules-system";
import { GlobalHookSystem } from "@/lib/hook-system";

// ✅ Log when the server loads
console.log("✅ Server.ts loaded, singletons should persist.");

export { GlobalModuleSystem, GlobalHookSystem };

// ✅ Ensure modules are only registered once (server-side only)
if (typeof window === "undefined") {
  console.log("⚡ Running GlobalModuleSystem.registerModules()...");
  GlobalModuleSystem.registerModules();
}
