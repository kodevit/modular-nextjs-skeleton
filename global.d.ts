// global.d.ts
export {};
// eslint-disable-next-line no-var
declare global {
  var __GLOBAL_HOOK_SYSTEM__: import("./lib/hook-system").HookSystem | undefined;
  var __GLOBAL_MODULE_SYSTEM__: import("./lib/module-system").ModuleSystem | undefined;
}
