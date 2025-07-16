"use client";

import type { AccionSinID, ParsedAccion } from "@/lib/types";

type Props = {
  nuevas: AccionSinID[];
  existentes: ParsedAccion[];
};

export default function ComparadorAcciones({ nuevas, existentes }: Props) {
  const comparaciones = nuevas.map((nueva) => {
    const coincidencia = existentes.find(
      (v) =>
        v.docente === nueva.docente &&
        v.accion === nueva.accion &&
        v.escuela === nueva.escuela &&
        v.fecha === nueva.fecha
    );

    return {
      nueva,
      vieja: coincidencia,
    };
  });

  return (
    <div className="overflow-x-auto rounded-lg border shadow-sm bg-white">
      <table className="min-w-full border-collapse text-sm">
        <thead className="bg-gray-50 text-gray-700 font-semibold sticky top-0 z-10">
          <tr>
            <th className="px-4 py-3 text-left">Docente</th>
            <th className="px-4 py-3 text-left">Escuela</th>
            <th className="px-4 py-3 text-left">Acción</th>
            <th className="px-4 py-3 text-left">Fecha</th>
            <th className="px-4 py-3 text-left">Puntaje</th>
            <th className="px-4 py-3 text-left">Estado</th>
          </tr>
        </thead>
        <tbody>
          {comparaciones.map(({ nueva, vieja }, idx) => {
            const esNuevo = !vieja;
            const cambioPuntaje = vieja && nueva.puntaje !== vieja.puntaje;

            let estado = "Sin cambios";
            let color = "text-gray-600";
            let bg = "";

            if (esNuevo) {
              estado = "🆕 Nueva acción";
              color = "text-green-700";
              bg = "bg-green-50";
            } else if (cambioPuntaje) {
              estado = `🔁 Puntaje: ${vieja.puntaje} → ${nueva.puntaje}`;
              color = "text-yellow-700";
              bg = "bg-yellow-50";
            }

            return (
              <tr key={idx} className={`border-t ${bg}`}>
                <td className="px-4 py-2 whitespace-nowrap">{nueva.docente}</td>
                <td className="px-4 py-2 whitespace-nowrap">{nueva.escuela}</td>
                <td className="px-4 py-2 whitespace-nowrap">{nueva.accion}</td>
                <td className="px-4 py-2 whitespace-nowrap">{nueva.fecha}</td>
                <td className="px-4 py-2 text-center">{nueva.puntaje}</td>
                <td className={`px-4 py-2 font-medium ${color}`}>{estado}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
