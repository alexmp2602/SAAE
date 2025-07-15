"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/acciones", label: "Acciones Pendientes" },
  { href: "/cargar", label: "Cargar Acción" },
  { href: "/aprobaciones", label: "Aprobaciones" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r shadow-sm min-h-screen">
      <div className="p-6 font-bold text-xl text-blue-700 flex items-center gap-2">
        <Image src="/logo.png" alt="Logo" width={24} height={24} />
        SAAE
      </div>
      <nav className="px-4">
        {navItems.map(({ href, label }) => (
          <Link key={href} href={href}>
            <div
              className={`p-3 my-2 rounded-md cursor-pointer hover:bg-blue-100 transition-colors ${
                pathname === href ? "bg-blue-200 font-semibold" : ""
              }`}
            >
              {label}
            </div>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
