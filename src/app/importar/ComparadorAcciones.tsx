"use client";

import { motion, AnimatePresence } from "motion/react";
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

    return { nueva, vieja: coincidencia };
  });

  return (
    <AnimatePresence>
      <motion.section
        className="overflow-x-auto rounded-lg border shadow-sm bg-white"
        aria-labelledby="titulo-comparacion"
        role="table"
        key="tabla-comparacion"
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <h2 id="titulo-comparacion" className="sr-only">
          Comparación de acciones nuevas con existentes
        </h2>

        <table className="min-w-full border-collapse text-sm">
          <thead className="bg-gray-50 text-gray-700 font-semibold sticky top-0 z-10">
            <tr>
              <th className="px-4 py-3 text-left">Docente</th>
              <th className="px-4 py-3 text-left">Escuela</th>
              <th className="px-4 py-3 text-left">Acción</th>
              <th className="px-4 py-3 text-left">Fecha</th>
              <th className="px-4 py-3 text-center">Puntaje</th>
              <th className="px-4 py-3 text-left">Estado</th>
            </tr>
          </thead>
          <tbody>
            {comparaciones.map(({ nueva, vieja }, idx) => {
              const esNuevo = !vieja;
              const cambioPuntaje = vieja && nueva.puntaje !== vieja.puntaje;

              const estado = esNuevo
                ? "🆕 Nueva acción"
                : cambioPuntaje
                ? `🔁 Puntaje: ${vieja.puntaje} → ${nueva.puntaje}`
                : "✅ Sin cambios";

              const rowColor = esNuevo
                ? "bg-green-50 text-green-800"
                : cambioPuntaje
                ? "bg-yellow-50 text-yellow-800"
                : "text-gray-700";

              return (
                <motion.tr
                  key={idx}
                  className={`border-t ${rowColor}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.02, duration: 0.3 }}
                >
                  <td className="px-4 py-2 whitespace-nowrap">
                    {nueva.docente}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {nueva.escuela}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {nueva.accion}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">{nueva.fecha}</td>
                  <td className="px-4 py-2 text-center">{nueva.puntaje}</td>
                  <td className="px-4 py-2 font-medium">{estado}</td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </motion.section>
    </AnimatePresence>
  );
}
