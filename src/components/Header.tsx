"use client";

type HeaderProps = {
  onMenuClick: () => void;
};

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header
      className="bg-white border-b shadow p-4"
      role="banner"
      aria-label="Encabezado del sistema"
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          {/* Botón de menú hamburguesa (visible solo en móvil) */}
          <button
            className="sm:hidden rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={onMenuClick}
            aria-label="Abrir menú"
          >
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
          </button>
          <h1 className="text-xs md:text-sm lg:text-lg font-semibold text-gray-800">
            Sistema de Administración de Acciones Estatutarias
          </h1>
        </div>

        {/* Usuario */}
        <div className="text-xs md:text-sm text-gray-500">
          Usuario: <span className="font-medium text-gray-700">Lasil</span>
        </div>
      </div>
    </header>
  );
}
