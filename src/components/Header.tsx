"use client";

type HeaderProps = {
  onMenuClick: () => void;
};

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header
      className="bg-gray-50 border-b border-gray-200 shadow-sm p-4"
      role="banner"
      aria-label="Encabezado principal del sistema"
    >
      <div className="flex justify-between items-center">
        {/* Título + Botón hamburguesa */}
        <div className="flex items-center gap-2">
          <button
            className="sm:hidden p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={onMenuClick}
            aria-label="Abrir menú de navegación"
            aria-controls="sidebar"
            aria-expanded="false"
          >
            <IconHamburger />
          </button>

          <p className="text-base md:text-lg font-medium text-gray-800 leading-tight">
            Sistema de Administración de Acciones Estatutarias
          </p>
        </div>

        {/* Info de sesión del usuario */}
        <div
          className="text-xs md:text-sm text-gray-500"
          role="contentinfo"
          aria-label="Información del usuario"
        >
          Usuario:{" "}
          <span
            className="font-medium text-gray-700"
            aria-label="Nombre de usuario"
          >
            Lasil
          </span>
        </div>
      </div>
    </header>
  );
}

function IconHamburger() {
  return (
    <svg
      className="w-6 h-6 text-gray-700"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  );
}
