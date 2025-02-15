import { loadModules } from "@/lib/load-modules";

export default async function DynamicPage({ params }: { params: Promise<{ slug: string }> }) {
  const modulesData = await loadModules(); // ✅ Load modules on the server
  const { slug } = await params;

  const path = slug ? `/${slug}` : "/"; // ✅ Handle root path `/`
  const ActiveRoute = modulesData
    .flatMap((mod) => mod.routes)
    .find((route) => route.path === path);

  if (!ActiveRoute) {
    if (path === "/") {
      return (
        <div>
          <h1>Welcome to SaaSForge</h1>
          <p>Available Modules:</p>
          <ul>
            {modulesData.flatMap((mod) =>
              mod.routes.map((route) => (
                <li key={route.path}>
                  <a href={route.path}>{route.path}</a>
                </li>
              ))
            )}
          </ul>
        </div>
      );
    }
    return <h1>404 - Page Not Found</h1>;
  }

  const ImportedModule = (await import(`@/modules/${ActiveRoute.componentPath}`)).default;
  return <ImportedModule />;
}
