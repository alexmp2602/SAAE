"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  Home,
  School,
  FilePlus,
  Upload,
  Clock,
  CheckCircle,
} from "lucide-react";

const navItems = [
  { href: "/", label: "Inicio", icon: Home },
  { href: "/escuelas", label: "Escuelas", icon: School },
  { href: "/cargar", label: "Cargar Acción", icon: FilePlus },
  { href: "/importar", label: "Importar Archivo", icon: Upload },
  { href: "/acciones", label: "Acciones Pendientes", icon: Clock },
  { href: "/aprobaciones", label: "Aprobaciones", icon: CheckCircle },
];

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  const content = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-4 py-6 border-b border-gray-200 flex justify-center">
        <Image
          src="/logo.png"
          alt="Logo del sistema SAAE"
          width={150}
          height={50}
          priority
        />
      </div>

      {/* Navegación */}
      <nav
        className="flex-1 overflow-y-auto p-4"
        role="navigation"
        aria-label="Navegación principal"
      >
        <ul className="space-y-1">
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;

            return (
              <li key={href}>
                <Link
                  href={href}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                    isActive
                      ? "bg-blue-100 font-semibold text-blue-800 border-l-4 border-blue-600 pl-2"
                      : "hover:bg-blue-50 text-gray-800"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  <Icon className="w-5 h-5 shrink-0" aria-hidden="true" />
                  <span>{label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );

  return (
    <>
      {/* Sidebar fijo para desktop */}
      <aside
        className="hidden sm:block w-64 h-full bg-white border-r shadow-sm"
        aria-label="Navegación principal"
      >
        {content}
      </aside>

      {/* Sidebar móvil animado */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 sm:hidden"
              onClick={onClose}
              aria-hidden="true"
              role="presentation"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />

            <motion.aside
              className="fixed z-50 w-64 h-full bg-white border-r shadow-sm sm:hidden"
              aria-label="Navegación principal"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              {content}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
