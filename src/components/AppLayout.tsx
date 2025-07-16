"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Toaster } from "react-hot-toast";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <div className="flex h-dvh bg-gray-100 text-gray-900 antialiased">
      <Sidebar isOpen={menuAbierto} onClose={() => setMenuAbierto(false)} />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Header onMenuClick={() => setMenuAbierto((prev) => !prev)} />
        <Toaster position="top-right" />

        <main className="p-6 overflow-y-auto flex-1">{children}</main>

        {/* Footer */}
        <footer className="bg-white border-t p-4 text-center text-sm text-gray-500">
          Versión Beta - Sistema en desarrollo. Para sugerencias o errores,
          escribí a{" "}
          <a
            href="mailto:alexmp.2602@gmail.com"
            className="text-blue-600 hover:underline"
          >
            alexmp.2602@gmail.com
          </a>
        </footer>
      </div>
    </div>
  );
}
