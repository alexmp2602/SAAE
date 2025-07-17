"use client";

import { useState, useCallback } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Toaster } from "react-hot-toast";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const toggleMenu = useCallback(() => {
    setMenuAbierto((prev) => !prev);
  }, []);

  return (
    <div className="flex min-h-screen h-dvh bg-gray-100 text-gray-900 antialiased transition-colors duration-300">
      <Sidebar
        isOpen={menuAbierto}
        onClose={() => setMenuAbierto(false)}
        aria-hidden={!menuAbierto}
      />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Header
          onMenuClick={toggleMenu}
          aria-expanded={menuAbierto}
          aria-controls="sidebar"
        />

        <Toaster position="top-right" />

        <main
          id="main-content"
          role="main"
          className="flex-1 overflow-y-auto px-6 py-4 sm:px-8 sm:py-6"
        >
          {children}
        </main>

        <footer
          role="contentinfo"
          className="bg-white border-t border-gray-200 p-4 text-center text-sm text-gray-500"
        >
          Versión Beta - Sistema en desarrollo. Para sugerencias o errores,
          escribí a{" "}
          <a
            href="mailto:alexmp.2602@gmail.com"
            className="text-blue-600 hover:underline focus:outline-none focus:ring focus:ring-blue-400"
          >
            alexmp.2602@gmail.com
          </a>
        </footer>
      </div>
    </div>
  );
}
