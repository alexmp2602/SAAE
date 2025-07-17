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
    <section className="mt-10" aria-label="Listado de acciones recientes">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Acciones recientes
      </h2>

      <div className="overflow-x-auto rounded-md border border-gray-300 bg-white">
        <table className="min-w-full text-sm text-left border-collapse">
          <thead className="bg-gray-100 text-gray-700 sticky top-0 z-10">
            <tr>
              <th className="px-4 py-2">Docente</th>
              <th className="px-4 py-2">Acción</th>
              <th className="px-4 py-2">Escuela</th>
              <th className="px-4 py-2">Fecha</th>
              <th className="px-4 py-2">Puntaje</th>
              <th className="px-4 py-2 text-center">Opciones</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence initial={false}>
              {acciones.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-4 text-gray-500 italic"
                  >
                    No hay acciones cargadas aún.
                  </td>
                </tr>
              ) : (
                acciones.map((a) => (
                  <motion.tr
                    key={a.id}
                    layout
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="border-t hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-2 whitespace-nowrap">{a.docente}</td>
                    <td className="px-4 py-2 whitespace-nowrap">{a.accion}</td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      {a.escuela_id}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">{a.fecha}</td>
                    <td className="px-4 py-2 whitespace-nowrap">{a.puntaje}</td>
                    <td className="px-4 py-2 text-center">
                      <div className="flex justify-center items-center gap-3">
                        <button
                          onClick={() => onEditar(a)}
                          title="Editar acción"
                          className="text-blue-600 hover:text-blue-800 focus:outline-none transition-colors"
                        >
                          ✏️ Editar
                        </button>
                        <button
                          onClick={() => onEliminar(a.id)}
                          title="Eliminar acción"
                          className="text-red-600 hover:text-red-800 focus:outline-none transition-colors"
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
