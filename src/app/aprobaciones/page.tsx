"use client";

export const dynamic = "force-dynamic";

import PanelAprobaciones from "@/app/aprobaciones/PanelAprobaciones";

export default function AprobacionesPage() {
  return (
    <main
      className="max-w-7xl mx-auto px-6 pt-8 pb-16"
      aria-labelledby="aprobaciones-heading"
    >
      <header className="mb-10">
        <h1
          id="aprobaciones-heading"
          className="text-3xl font-bold tracking-tight text-gray-900"
        >
          Panel de Aprobaciones
        </h1>
        <p className="text-base text-gray-600 mt-2 max-w-2xl">
          Revisá y gestioná las acciones pendientes para aprobar o rechazar
          según corresponda. Usá los filtros para facilitar tu revisión.
        </p>
      </header>

      <section
        aria-label="Listado de acciones pendientes de aprobación"
        className="space-y-6"
      >
        <PanelAprobaciones />
      </section>
    </main>
  );
}
