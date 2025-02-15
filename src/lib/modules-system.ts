import { register as Module1 } from "@/modules/crm";
import { register as Module2 } from "@/modules/analytics";

export class ModuleSystem {
  static modulesRegistered: boolean = false;

  static registerModules() {
    if (this.modulesRegistered) return;
    console.log("register modules..")
    Module1();
    Module2();
    this.modulesRegistered = true;
  }
  
}

