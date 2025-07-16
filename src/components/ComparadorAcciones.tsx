"use client";

import { useAcciones } from "@/lib/useAcciones";
import type { ParsedAccion } from "@/lib/types";

type Props = {
  nuevas: ParsedAccion[];
};

export default function ComparadorAcciones({ nuevas }: Props) {
  const { acciones: existentes } = useAcciones();

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
    <div className="bg-white shadow rounded-md overflow-x-auto border">
      <table className="min-w-full text-sm border-collapse">
        <thead className="bg-gray-100 text-gray-700 font-medium">
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
              estado = `🔁 Puntaje cambiado: ${vieja.puntaje} → ${nueva.puntaje}`;
              color = "text-yellow-700";
              bg = "bg-yellow-50";
            }

            return (
              <tr key={idx} className={`border-t ${bg}`}>
                <td className="px-4 py-2">{nueva.docente}</td>
                <td className="px-4 py-2">{nueva.escuela}</td>
                <td className="px-4 py-2">{nueva.accion}</td>
                <td className="px-4 py-2">{nueva.fecha}</td>
                <td className="px-4 py-2">{nueva.puntaje}</td>
                <td className={`px-4 py-2 font-medium ${color}`}>{estado}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
