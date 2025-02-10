import { Hookable, HookCallback } from 'hookable'

class HookSystem extends Hookable {
  private static instance: HookSystem;

  private constructor() {
    super();
  }

  public static getInstance(): HookSystem {
    if (!HookSystem.instance) {
      console.log("new hook system instance")
      HookSystem.instance = new HookSystem();
    }
    return HookSystem.instance;
  }

  public async do(hook_name: string, ...arguments_: any[]) {
    await this.callHook(hook_name, ...arguments_);
  }

  public add(hook_name: string, function_: HookCallback) {
    this.hook(hook_name, function_);
  }
}

const hookSystemInstance = HookSystem.getInstance();

export const _do = hookSystemInstance.do.bind(hookSystemInstance);
export const _add = hookSystemInstance.add.bind(hookSystemInstance);
