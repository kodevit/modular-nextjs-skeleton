export async function loadModules() {
  const modulePaths = [
    import("../modules/crm/module.config"),
  ];

  const importedModules = await Promise.all(modulePaths);

  return importedModules.map((mod) => ({
    name: mod.default.name,
    routes: mod.default.routes.map((route) => ({
      path: route.path,
      componentPath: route.componentPath,
    })),
  }));
}
