"use client";

type HeaderProps = {
  onMenuClick: () => void;
};

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header
      className="bg-white border-b border-gray-200 shadow-sm p-4"
      role="banner"
      aria-label="Encabezado principal del sistema"
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Botón hamburguesa + Título */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="sm:hidden p-2 rounded-md hover:bg-gray-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            aria-label="Abrir menú de navegación"
            aria-controls="sidebar"
            aria-expanded="false"
          >
            <IconHamburger />
          </button>

          <h1 className="text-base md:text-lg font-semibold text-gray-800 leading-snug">
            Sistema de Administración de Acciones Estatutarias - Región 10
          </h1>
        </div>

        {/* Info del usuario */}
        <div
          className="text-xs md:text-sm text-gray-600"
          role="contentinfo"
          aria-label="Información del usuario actual"
        >
          Usuario:&nbsp;
          <span
            className="font-semibold text-gray-800"
            aria-label="Nombre del usuario"
          >
            Silvina
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
