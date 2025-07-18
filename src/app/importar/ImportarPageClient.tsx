"use client";

import { useState } from "react";
import ArchivoImportador from "./ArchivoImportador";
import ComparadorAcciones from "./ComparadorAcciones";
import ResumenImportacion from "./ResumenImportacion"; // 👈 nuevo import
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
      className="max-w-6xl mx-auto px-6 py-10 space-y-12"
      role="main"
      aria-labelledby="titulo-importar"
    >
      <header className="space-y-2">
        <h1
          id="titulo-importar"
          className="text-3xl font-bold tracking-tight text-gray-900"
        >
          Importar acciones desde archivo
        </h1>
        <p className="text-base text-gray-600">
          Subí un archivo CSV o Excel para agregar nuevas acciones al sistema.
          El sistema detectará duplicados automáticamente.
        </p>
      </header>

      <section aria-label="Subida de archivo">
        <ArchivoImportador
          accionesExistentes={accionesExistentes}
          onImportar={manejarImportacion}
        />
      </section>

      {nuevasAcciones.length > 0 && (
        <section aria-labelledby="subtitulo-comparacion" className="space-y-6">
          <div
            className="text-sm font-medium text-green-700"
            role="status"
            aria-live="polite"
          >
            ✅ Se detectaron {nuevasAcciones.length} acciones nuevas.
          </div>

          <ResumenImportacion
            nuevas={nuevasAcciones}
            existentes={accionesExistentes}
          />

          <h2
            id="subtitulo-comparacion"
            className="text-xl font-semibold text-gray-800"
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
