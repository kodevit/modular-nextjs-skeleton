const crmModuleConfig = {
  name: "CRM Module",
  routes: [
    { path: "/crm", componentPath: "crm/server/dashboard" },
    { path: "/crm/settings", componentPath: "crm/server/settings" },
  ]
};

export default crmModuleConfig;