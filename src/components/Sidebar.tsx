"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/importar", label: "Importar Archivo" },
  { href: "/cargar", label: "Cargar Acción" },
  { href: "/acciones", label: "Acciones Pendientes" },
  { href: "/aprobaciones", label: "Aprobaciones" },
];

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Overlay en móvil */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-white/30 backdrop-blur-sm z-40 sm:hidden"
          onClick={onClose}
          aria-label="Cerrar menú"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed sm:static z-50 sm:z-auto bg-white border-r shadow-sm w-64 h-full transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"
        }`}
        role="navigation"
        aria-label="Navegación principal"
      >
        <Image
          src="/logo.png"
          alt="Logo SAAE"
          width={150}
          height={50}
          className="m-4"
          style={{ height: "auto", width: "auto" }}
          priority
        />

        <nav className="px-4">
          <ul className="space-y-1">
            {navItems.map(({ href, label }) => {
              const isActive = pathname === href;

              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={onClose}
                    className={`block p-3 rounded-md cursor-pointer transition-colors ${
                      isActive
                        ? "bg-blue-200 font-semibold border-l-4 border-blue-600 pl-2"
                        : "hover:bg-blue-100 text-gray-800"
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
}
