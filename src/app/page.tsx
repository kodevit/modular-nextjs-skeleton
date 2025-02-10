import Sidebar from "@/components/Sidebar";
import Image from "next/image";

import { ReactNode } from "react";

interface HomeProps {
  children: ReactNode;
}

export default function Home({ children }: HomeProps) {
  return (
    <div className="h-full relative">
    <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 bg-gray-900">
      <Sidebar 
       />
    </div>
    <main className="md:pl-72">
      {children}
    </main>
  </div>
  );
}
