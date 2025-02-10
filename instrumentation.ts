import {register as Module1 } from "@/modules/test-module-1"
// const modules = [Module1, Module2];

export function register() {
  console.log("Register Modules");
  Module1()
}