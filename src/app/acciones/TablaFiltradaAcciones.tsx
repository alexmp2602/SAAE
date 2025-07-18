"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { AccionConEscuela } from "@/lib/types";

type Props = {
  acciones?: AccionConEscuela[];
  onEditar: (accion: AccionConEscuela) => void;
  onEliminar: (id: number) => void;
};

const FILAS_POR_PAGINA = 10;

export default function TablaFiltradaAcciones({
  acciones = [],
  onEditar,
  onEliminar,
}: Props) {
  const [busqueda, setBusqueda] = useState("");
  const [accionFiltro, setAccionFiltro] = useState("");
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");
  const [pagina, setPagina] = useState(1);

  const accionesFiltradas = useMemo(() => {
    return acciones
      .filter((a) =>
        a.docente?.toLowerCase().includes(busqueda.trim().toLowerCase())
      )
      .filter((a) => (accionFiltro ? a.accion === accionFiltro : true))
      .filter((a) => (desde ? new Date(a.fecha) >= new Date(desde) : true))
      .filter((a) => (hasta ? new Date(a.fecha) <= new Date(hasta) : true));
  }, [acciones, busqueda, accionFiltro, desde, hasta]);

  const totalPaginas = Math.ceil(accionesFiltradas.length / FILAS_POR_PAGINA);
  const inicio = (pagina - 1) * FILAS_POR_PAGINA;
  const visibles = accionesFiltradas.slice(inicio, inicio + FILAS_POR_PAGINA);

  const cambiarPagina = (delta: number) => {
    setPagina((prev) => Math.min(Math.max(prev + delta, 1), totalPaginas));
  };

  return (
    <section
      className="mt-10 space-y-6"
      aria-label="Listado de acciones recientes"
    >
      <h2 className="text-xl font-bold text-gray-800">Acciones recientes</h2>

      {/* Filtros */}
      <fieldset className="flex flex-wrap gap-4 items-end">
        <input
          type="text"
          placeholder="Buscar docente..."
          value={busqueda}
          onChange={(e) => {
            setBusqueda(e.target.value);
            setPagina(1);
          }}
          className="form-input w-full sm:w-auto"
          aria-label="Buscar por docente"
        />

        <select
          value={accionFiltro}
          onChange={(e) => {
            setAccionFiltro(e.target.value);
            setPagina(1);
          }}
          className="form-input w-full sm:w-auto"
          aria-label="Filtrar por acción"
        >
          <option value="">Todas las acciones</option>
          <option value="MAD">MAD</option>
          <option value="Acrecentamiento">Acrecentamiento</option>
          <option value="Servicio Provisorio">Servicio Provisorio</option>
          <option value="Traslado">Traslado</option>
        </select>

        <input
          type="date"
          value={desde}
          onChange={(e) => {
            setDesde(e.target.value);
            setPagina(1);
          }}
          className="form-input w-full sm:w-auto"
          aria-label="Filtrar desde fecha"
        />

        <input
          type="date"
          value={hasta}
          onChange={(e) => {
            setHasta(e.target.value);
            setPagina(1);
          }}
          className="form-input w-full sm:w-auto"
          aria-label="Filtrar hasta fecha"
        />
      </fieldset>

      {/* Tabla */}
      <div className="overflow-auto rounded-md border border-gray-300">
        <table className="min-w-full text-sm border-collapse text-left">
          <thead className="bg-gray-100 text-gray-700">
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
            <AnimatePresence>
              {visibles.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-4 text-gray-500 italic"
                  >
                    No hay acciones que coincidan con los filtros.
                  </td>
                </tr>
              ) : (
                visibles.map((a) => (
                  <motion.tr
                    key={a.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="border-t hover:bg-gray-50"
                  >
                    <td className="px-4 py-2 whitespace-nowrap">{a.docente}</td>
                    <td className="px-4 py-2 whitespace-nowrap">{a.accion}</td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      {a.escuelas?.nombre ?? "—"}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">{a.fecha}</td>
                    <td className="px-4 py-2 whitespace-nowrap">{a.puntaje}</td>
                    <td className="px-4 py-2">
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() => onEditar(a)}
                          className="text-blue-600 hover:text-blue-800 transition"
                          title="Editar"
                          aria-label={`Editar acción de ${a.docente}`}
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => onEliminar(a.id)}
                          className="text-red-600 hover:text-red-800 transition"
                          title="Eliminar"
                          aria-label={`Eliminar acción de ${a.docente}`}
                        >
                          🗑️
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

      {/* Paginación */}
      {totalPaginas > 1 && (
        <nav
          className="flex justify-center items-center gap-4 mt-4"
          aria-label="Paginación"
        >
          <button
            onClick={() => cambiarPagina(-1)}
            disabled={pagina === 1}
            aria-disabled={pagina === 1}
            className="px-3 py-1 rounded bg-gray-100 text-sm disabled:opacity-50 hover:bg-gray-200"
          >
            ← Anterior
          </button>
          <span className="text-sm text-gray-600">
            Página {pagina} de {totalPaginas}
          </span>
          <button
            onClick={() => cambiarPagina(1)}
            disabled={pagina === totalPaginas}
            aria-disabled={pagina === totalPaginas}
            className="px-3 py-1 rounded bg-gray-100 text-sm disabled:opacity-50 hover:bg-gray-200"
          >
            Siguiente →
          </button>
        </nav>
      )}
    </section>
  );
}
