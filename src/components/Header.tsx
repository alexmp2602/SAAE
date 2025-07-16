"use client";

type HeaderProps = {
  onMenuClick: () => void;
};

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header
      className="bg-gray-50 border-b border-gray-200 shadow-sm p-4"
      role="banner"
      aria-label="Encabezado del sistema"
    >
      <div className="flex justify-between items-center">
        {/* Título + Botón hamburguesa */}
        <div className="flex items-center gap-2">
          <button
            className="sm:hidden p-1 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={onMenuClick}
            aria-label="Abrir menú"
          >
            <IconHamburger />
          </button>
          <h1 className="text-base md:text-lg font-medium text-gray-800 leading-tight">
            Sistema de Administración de Acciones Estatutarias
          </h1>
        </div>

        {/* Info de usuario */}
        <div className="text-xs md:text-sm text-gray-500">
          Usuario: <span className="font-medium text-gray-700">Lasil</span>
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
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  );
}
