"use client";

import { CheckCircle, Repeat, Sparkles } from "lucide-react";
import type { AccionSinID, ParsedAccion } from "@/lib/types";

type Props = {
  nuevas: AccionSinID[];
  existentes: ParsedAccion[];
};

export default function ResumenImportacion({ nuevas, existentes }: Props) {
  let nuevasCount = 0;
  let cambiadasCount = 0;
  let sinCambiosCount = 0;

  nuevas.forEach((nueva) => {
    const coincidencia = existentes.find(
      (existente) =>
        existente.docente === nueva.docente &&
        existente.accion === nueva.accion &&
        existente.escuela === nueva.escuela_id &&
        existente.fecha === nueva.fecha
    );

    if (!coincidencia) {
      nuevasCount++;
    } else if (coincidencia.puntaje !== nueva.puntaje) {
      cambiadasCount++;
    } else {
      sinCambiosCount++;
    }
  });

  const total = nuevas.length;

  return (
    <div
      className="bg-gray-50 border rounded-lg p-4 text-sm text-gray-800 flex flex-col gap-2"
      aria-label="Resumen de comparación"
    >
      <p className="font-medium text-base">Resumen de la comparación:</p>

      <div className="flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-green-600" />
        <span className="font-medium">{nuevasCount}</span> nuevas acciones
      </div>

      <div className="flex items-center gap-2">
        <Repeat className="w-4 h-4 text-yellow-600" />
        <span className="font-medium">{cambiadasCount}</span> con cambios de
        puntaje
      </div>

      <div className="flex items-center gap-2">
        <CheckCircle className="w-4 h-4 text-gray-600" />
        <span className="font-medium">{sinCambiosCount}</span> sin cambios
      </div>

      <div className="mt-2 font-semibold">
        Total: {total} acciones detectadas
      </div>
    </div>
  );
}
