"use client";

import { useState } from "react";
import ArchivoImportador from "./ArchivoImportador";
import ComparadorAcciones from "./ComparadorAcciones";
import type { AccionSinID, ParsedAccion } from "@/lib/types";

type Props = {
  accionesExistentes: ParsedAccion[];
};

export default function ImportarPageClient({ accionesExistentes }: Props) {
  const [nuevasAcciones, setNuevasAcciones] = useState<AccionSinID[]>([]);

  const manejarImportacion = (acciones: AccionSinID[]) => {
    setNuevasAcciones(acciones);
  };

  return (
    <main
      className="max-w-5xl mx-auto px-6 pt-6 pb-12 space-y-10"
      role="main"
      aria-labelledby="importar-titulo"
    >
      <header>
        <h1
          id="importar-titulo"
          className="text-3xl font-semibold mb-4 text-gray-900"
        >
          Importar acciones desde archivo
        </h1>
      </header>

      <ArchivoImportador
        accionesExistentes={accionesExistentes}
        onImportar={manejarImportacion}
      />

      {nuevasAcciones.length > 0 && (
        <section aria-labelledby="nuevas-acciones">
          <div
            className="text-sm text-green-700 font-medium"
            role="status"
            aria-live="polite"
          >
            {nuevasAcciones.length} acciones nuevas importadas con éxito.
          </div>

          <h2
            id="nuevas-acciones"
            className="text-xl font-semibold text-gray-700 mt-6"
          >
            Comparación con acciones existentes
          </h2>

          <ComparadorAcciones
            nuevas={nuevasAcciones}
            existentes={accionesExistentes}
          />
        </section>
      )}
    </main>
  );
}
