"use client";

import React, { useState, useMemo, useCallback } from "react";
import { useAcciones } from "@/lib/useAcciones";

const ACCION_OPCIONES = [
  "Todas",
  "MAD",
  "Acrecentamiento",
  "Servicio Provisorio",
  "Traslado",
] as const;

export default function PanelAprobaciones() {
  const { acciones = [], actualizarAccion, loading } = useAcciones();
  const [filtroAccion, setFiltroAccion] =
    useState<(typeof ACCION_OPCIONES)[number]>("Todas");

  const accionesFiltradas = useMemo(() => {
    return acciones.filter((a) =>
      filtroAccion === "Todas" ? true : a.accion === filtroAccion
    );
  }, [acciones, filtroAccion]);

  const exportarAprobadasCSV = useCallback(() => {
    const aprobadas = accionesFiltradas.filter((a) => a.estado === "aprobada");
    if (aprobadas.length === 0) {
      alert("No hay acciones aprobadas con ese filtro para exportar.");
      return;
    }

    const header = ["Docente", "Acción", "Escuela", "Puntaje"];
    const rows = aprobadas.map((a) => [
      a.docente,
      a.accion,
      a.escuela_id,
      a.puntaje.toString(),
    ]);

    const csvContent = [header, ...rows].map((e) => e.join(",")).join("\n");
    const BOM = "\uFEFF";
    const blob = new Blob([BOM + csvContent], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "acciones_aprobadas.csv");
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }, [accionesFiltradas]);

  if (loading) return <p className="p-4 text-gray-500">Cargando acciones...</p>;

  return (
    <section
      className="bg-white shadow rounded-md overflow-hidden"
      aria-label="Panel de Aprobaciones"
    >
      {/* Filtro y botón */}
      <header className="p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <label
            htmlFor="filtroAccion"
            className="text-sm font-medium text-gray-700"
          >
            Filtrar por tipo de acción
          </label>
          <select
            id="filtroAccion"
            value={filtroAccion}
            onChange={(e) =>
              setFiltroAccion(
                e.target.value as (typeof ACCION_OPCIONES)[number]
              )
            }
            className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {ACCION_OPCIONES.map((opcion) => (
              <option key={opcion} value={opcion}>
                {opcion}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={exportarAprobadasCSV}
          disabled={accionesFiltradas.length === 0}
          aria-disabled={accionesFiltradas.length === 0}
          className="bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 transition"
        >
          Descargar aprobadas (.csv)
        </button>
      </header>

      {/* Tabla */}
      <div className="w-full overflow-x-auto">
        <table className="min-w-[640px] w-full table-auto text-sm">
          <thead className="bg-gray-100 text-left font-semibold text-gray-700">
            <tr>
              <th className="p-3">Docente</th>
              <th className="p-3">Acción</th>
              <th className="p-3">Escuela</th>
              <th className="p-3">Puntaje</th>
              <th className="p-3">Estado</th>
              <th className="p-3 text-center">Gestión</th>
            </tr>
          </thead>
          <tbody>
            {accionesFiltradas.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="p-4 text-center text-gray-500 italic"
                >
                  No hay acciones para mostrar.
                </td>
              </tr>
            ) : (
              accionesFiltradas.map((a) => (
                <tr
                  key={a.id}
                  className="border-t border-gray-200 hover:bg-gray-50"
                >
                  <td className="p-3">{a.docente}</td>
                  <td className="p-3">{a.accion}</td>
                  <td className="p-3">{a.escuela_id}</td>
                  <td className="p-3">{a.puntaje}</td>
                  <td className="p-3 capitalize font-medium">
                    {a.estado === "pendiente" && (
                      <span className="text-yellow-600 bg-yellow-100 px-2 py-0.5 rounded-full text-xs font-medium">
                        Pendiente
                      </span>
                    )}
                    {a.estado === "aprobada" && (
                      <span className="text-green-700 bg-green-100 px-2 py-0.5 rounded-full text-xs font-medium">
                        Aprobada
                      </span>
                    )}
                    {a.estado === "rechazada" && (
                      <span className="text-red-700 bg-red-100 px-2 py-0.5 rounded-full text-xs font-medium">
                        Rechazada
                      </span>
                    )}
                  </td>
                  <td className="p-3">
                    {a.estado === "pendiente" ? (
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => actualizarAccion(a.id, "aprobada")}
                          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                          title="Aprobar"
                        >
                          Aprobar
                        </button>
                        <button
                          onClick={() => actualizarAccion(a.id, "rechazada")}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                          title="Rechazar"
                        >
                          Rechazar
                        </button>
                      </div>
                    ) : (
                      <div className="text-center text-xs text-gray-400">
                        Sin acciones
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
