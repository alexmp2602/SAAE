"use client";

export const dynamic = "force-dynamic";

import PanelAprobaciones from "@/app/aprobaciones/PanelAprobaciones";

export default function AprobacionesPage() {
  return (
    <main
      className="max-w-5xl mx-auto px-6 pt-8 pb-12"
      aria-labelledby="panel-aprobaciones-heading"
    >
      <header className="mb-8">
        <h1
          id="panel-aprobaciones-heading"
          className="text-3xl font-bold tracking-tight text-gray-900"
        >
          Panel de Aprobaciones
        </h1>
        <p className="text-gray-600 mt-2 text-base">
          Revisá y gestioná las acciones pendientes para aprobar o rechazar.
        </p>
      </header>

      <section aria-label="Listado de acciones pendientes">
        <PanelAprobaciones />
      </section>
    </main>
  );
}
