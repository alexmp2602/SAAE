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

  const manejarImportacion = (nuevas: AccionSinID[]) => {
    setNuevasAcciones(nuevas);
  };

  return (
    <main className="max-w-5xl mx-auto px-6 pt-6 pb-12 space-y-10">
      <h1 className="text-3xl font-semibold mb-4">
        Importar Acciones desde archivo
      </h1>

      <ArchivoImportador
        accionesExistentes={accionesExistentes}
        onImportar={manejarImportacion}
      />

      {nuevasAcciones.length > 0 && (
        <>
          <h2 className="text-xl font-semibold text-gray-700">
            Comparación con acciones existentes
          </h2>
          <ComparadorAcciones
            nuevas={nuevasAcciones}
            existentes={accionesExistentes}
          />
        </>
      )}
    </main>
  );
}
