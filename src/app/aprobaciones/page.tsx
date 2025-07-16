"use client";

export const dynamic = "force-dynamic";

import PanelAprobaciones from "@/app/aprobaciones/PanelAprobaciones";

export default function AprobacionesPage() {
  return (
    <main
      className="max-w-5xl mx-auto px-6 pt-8 pb-12"
      aria-labelledby="panel-aprobaciones-heading"
    >
      <header className="mb-6">
        <h1
          id="panel-aprobaciones-heading"
          className="text-3xl font-bold tracking-tight text-gray-900"
        >
          Panel de Aprobaciones
        </h1>
        <p className="text-gray-600 mt-1 text-sm">
          Revisión y gestión de acciones pendientes para su aprobación o
          rechazo.
        </p>
      </header>

      <PanelAprobaciones />
    </main>
  );
}
