"use client";

export const dynamic = "force-dynamic";

import PanelAprobaciones from "@/components/PanelAprobaciones";

export default function AprobacionesPage() {
  return (
    <section className="max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Panel de Aprobaciones</h2>
      <PanelAprobaciones />
    </section>
  );
}
