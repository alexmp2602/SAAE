"use client";

import { motion, AnimatePresence } from "motion/react";
import type { AccionConEscuela } from "@/lib/types";

type Props = {
  acciones: AccionConEscuela[];
  onEditar: (accion: AccionConEscuela) => void;
  onEliminar: (id: number) => void;
};

export default function ListaRecientes({
  acciones,
  onEditar,
  onEliminar,
}: Props) {
  return (
    <section className="mt-12" aria-labelledby="acciones-recientes">
      <h2
        id="acciones-recientes"
        className="text-xl font-bold text-neutral-800 mb-5"
      >
        📋 Acciones recientes
      </h2>

      <div className="overflow-x-auto rounded-lg border border-neutral-300 shadow-sm bg-white">
        <table className="min-w-full divide-y divide-neutral-200 text-sm">
          <thead className="bg-neutral-100 text-neutral-700 sticky top-0 z-10">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Docente</th>
              <th className="px-4 py-3 text-left font-medium">Acción</th>
              <th className="px-4 py-3 text-left font-medium">Escuela</th>
              <th className="px-4 py-3 text-left font-medium">Fecha</th>
              <th className="px-4 py-3 text-left font-medium">Puntaje</th>
              <th className="px-4 py-3 text-center font-medium">Opciones</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-neutral-200">
            <AnimatePresence initial={false}>
              {acciones.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="py-6 text-center text-neutral-500 italic"
                  >
                    📭 No hay acciones cargadas aún.
                  </td>
                </tr>
              ) : (
                acciones.map((a) => (
                  <motion.tr
                    key={a.id}
                    layout
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25 }}
                    className="hover:bg-neutral-50 transition-colors"
                  >
                    <td className="px-4 py-3 whitespace-nowrap">{a.docente}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{a.accion}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {a.escuelas?.nombre ?? a.escuela_id}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">{a.fecha}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{a.puntaje}</td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex justify-center gap-4">
                        <button
                          onClick={() => onEditar(a)}
                          title="Editar acción"
                          className="text-indigo-600 hover:text-indigo-800 text-sm font-medium transition"
                        >
                          ✏️ Editar
                        </button>
                        <button
                          onClick={() => onEliminar(a.id)}
                          title="Eliminar acción"
                          className="text-rose-600 hover:text-rose-800 text-sm font-medium transition"
                        >
                          🗑️ Borrar
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </section>
  );
}
