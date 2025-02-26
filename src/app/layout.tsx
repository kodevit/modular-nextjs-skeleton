import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import { GlobalModuleSystem } from "@/lib/server";
import { _do } from "@/lib/hook-system";

GlobalModuleSystem.registerModules();


const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
_do("basic:html_head", metadata);
export { metadata };

export default async function RootLayout({ children }: { children: ReactNode }) {
  // const modulesData = await loadModules(); // ✅ Load modules on the server


  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
