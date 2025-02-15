"use client";

import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { Suspense, useState, useEffect } from "react";
import { ReactNode } from "react";
// ModuleSystem.registerModules()

interface MyAppProps {
  children: ReactNode;
  modulesData: { routes: { path: string; componentPath: string }[] }[];
}

export default function MyApp({ children, modulesData }: MyAppProps) {
  const pathname = usePathname();
  const [ActiveComponent, setActiveComponent] = useState<React.ComponentType | null>(null);
  // ModuleSystem.registerModules()

  useEffect(() => {

    const ActiveRoute = modulesData
      .flatMap((mod) => mod.routes)
      .find((route) => pathname.startsWith(route.path));

    if (ActiveRoute && !ActiveRoute.componentPath.includes("server")) {
      const DynamicComponent = dynamic(() => import(`@/modules/${ActiveRoute.componentPath}`));

      setActiveComponent(() => DynamicComponent);
    } else {
      setActiveComponent(null);
    }
  }, [pathname, modulesData]);

  return (
    <>
      {ActiveComponent ? (
        <Suspense fallback={<p>Loading module...</p>}>
          {ActiveComponent && <ActiveComponent />}
        </Suspense>
      ) : (
        children
      )}
    </>
  );
}
