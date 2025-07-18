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
      (existente) =>
        existente.docente === nueva.docente &&
        existente.accion === nueva.accion &&
        existente.escuela === nueva.escuela_id &&
        existente.fecha === nueva.fecha
    );

    return { nueva, vieja: coincidencia };
  });

  return (
    <AnimatePresence>
      <motion.section
        role="region"
        aria-labelledby="titulo-comparacion"
        key="tabla-comparacion"
        className="overflow-x-auto rounded-lg border shadow-sm bg-white"
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <h2 id="titulo-comparacion" className="sr-only">
          Comparación de acciones nuevas con existentes
        </h2>

        <table className="min-w-full text-sm border-collapse">
          <thead className="bg-gray-50 text-gray-700 font-semibold sticky top-0 z-10">
            <tr>
              <th scope="col" className="px-4 py-3 text-left">
                Docente
              </th>
              <th scope="col" className="px-4 py-3 text-left">
                Escuela
              </th>
              <th scope="col" className="px-4 py-3 text-left">
                Acción
              </th>
              <th scope="col" className="px-4 py-3 text-left">
                Fecha
              </th>
              <th scope="col" className="px-4 py-3 text-center">
                Puntaje
              </th>
              <th scope="col" className="px-4 py-3 text-left">
                Estado
              </th>
            </tr>
          </thead>

          <tbody>
            {comparaciones.map(({ nueva, vieja }, idx) => {
              const esNuevo = !vieja;
              const cambioPuntaje = !!vieja && nueva.puntaje !== vieja.puntaje;

              const estado = esNuevo
                ? "🆕 Nueva acción"
                : cambioPuntaje
                ? `🔁 Puntaje: ${vieja.puntaje} → ${nueva.puntaje}`
                : "✅ Sin cambios";

              const rowClass = esNuevo
                ? "bg-green-50 text-green-800"
                : cambioPuntaje
                ? "bg-yellow-50 text-yellow-800"
                : "text-gray-700";

              return (
                <motion.tr
                  key={idx}
                  className={`border-t ${rowClass}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.01, duration: 0.25 }}
                >
                  <td className="px-4 py-2 whitespace-nowrap">
                    {nueva.docente}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {nueva.escuela_id}
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
