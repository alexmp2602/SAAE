"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import ArchivoImportador from "@/components/ArchivoImportador";
import ComparadorAcciones from "@/components/ComparadorAcciones";
import type { ParsedAccion } from "@/lib/types";

export default function ImportarPage() {
  const [accionesNuevas, setAccionesNuevas] = useState<ParsedAccion[]>([]);

  return (
    <main
      className="max-w-5xl mx-auto px-6 pt-6 pb-12 space-y-10"
      aria-label="Página de importación de acciones"
    >
      <h1 className="text-3xl font-semibold mb-4">
        Importar Acciones desde archivo
      </h1>

      <ArchivoImportador onProcesar={setAccionesNuevas} />

      {accionesNuevas.length > 0 && (
        <>
          <h2 className="text-xl font-semibold text-gray-700">
            Comparación con acciones existentes
          </h2>
          <ComparadorAcciones nuevas={accionesNuevas} />
        </>
      )}
    </main>
  );
}
