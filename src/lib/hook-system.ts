// lib/hook-system.ts

import { Hookable, HookCallback } from "hookable";

declare global {
  var __GLOBAL_HOOK_SYSTEM__: HookSystem | undefined;
}

class HookSystem extends Hookable {
  public constructor() {
    super();
    console.log("🔥 HookSystem instance created!");
  }

  public async do(hook_name: string, ...arguments_: unknown[]) {
    await this.callHook(hook_name, ...arguments_);
  }

  public add(hook_name: string, function_: HookCallback) {
    this.hook(hook_name, function_);
  }
}

// ✅ FINAL FIX: Use `globalThis` instead of `global`
const hookInstance = globalThis.__GLOBAL_HOOK_SYSTEM__ ?? new HookSystem();
if (!globalThis.__GLOBAL_HOOK_SYSTEM__) {
  console.log("⚡ Creating global HookSystem instance...");
  globalThis.__GLOBAL_HOOK_SYSTEM__ = hookInstance;
}

export const GlobalHookSystem = globalThis.__GLOBAL_HOOK_SYSTEM__;
export const _do = GlobalHookSystem!.do.bind(GlobalHookSystem);
export const _add = GlobalHookSystem!.add.bind(GlobalHookSystem);
