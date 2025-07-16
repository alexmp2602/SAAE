"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Home, Upload, FilePlus, Clock, CheckCircle } from "lucide-react";

const navItems = [
  { href: "/", label: "Inicio", icon: Home },
  { href: "/importar", label: "Importar Archivo", icon: Upload },
  { href: "/cargar", label: "Cargar Acción", icon: FilePlus },
  { href: "/acciones", label: "Acciones Pendientes", icon: Clock },
  { href: "/aprobaciones", label: "Aprobaciones", icon: CheckCircle },
];

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-white/30 backdrop-blur-sm z-40 sm:hidden"
          onClick={onClose}
          aria-label="Cerrar menú"
        />
      )}

      <aside
        className={`fixed sm:static z-50 sm:z-auto w-64 h-full transform bg-white border-r shadow-sm transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"
        }`}
        role="navigation"
        aria-label="Navegación principal"
      >
        <div className="px-4 py-6 border-b border-gray-200">
          <Image
            src="/logo.png"
            alt="Logo SAAE"
            width={150}
            height={50}
            style={{ height: "auto", width: "auto" }}
            priority
          />
        </div>

        <nav className="p-4">
          <ul className="space-y-1">
            {navItems.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href;

              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={onClose}
                    className={`flex items-center gap-3 p-3 rounded-md transition-colors ${
                      isActive
                        ? "bg-blue-100 font-semibold text-blue-800 border-l-4 border-blue-600 pl-2"
                        : "hover:bg-blue-50 text-gray-800"
                    }`}
                  >
                    <Icon className="w-5 h-5 shrink-0" />
                    <span>{label}</span>
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
