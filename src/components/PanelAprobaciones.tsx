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
  const { acciones, actualizarEstado, loading, error } = useAcciones();
  const [filtroAccion, setFiltroAccion] =
    useState<(typeof ACCION_OPCIONES)[number]>("Todas");

  const accionesFiltradas = useMemo(
    () =>
      acciones.filter((a) =>
        filtroAccion === "Todas" ? true : a.accion === filtroAccion
      ),
    [acciones, filtroAccion]
  );

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
      a.escuela,
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
    document.body.removeChild(link);
  }, [accionesFiltradas]);

  if (loading) return <p className="p-4 text-gray-500">Cargando acciones...</p>;
  if (error) return <p className="p-4 text-red-500">Error: {error}</p>;

  return (
    <section className="bg-white shadow rounded-md overflow-hidden">
      <header className="p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-2">
          <label
            htmlFor="filtroAccion"
            className="text-sm font-medium text-gray-700"
          >
            Filtrar por acción:
          </label>
          <select
            id="filtroAccion"
            value={filtroAccion}
            onChange={(e) =>
              setFiltroAccion(
                e.target.value as (typeof ACCION_OPCIONES)[number]
              )
            }
            className="border rounded px-2 py-1 text-sm"
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
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={accionesFiltradas.length === 0}
        >
          Descargar archivo para Excel
        </button>
      </header>

      <table className="w-full table-auto text-sm">
        <thead className="bg-gray-100 text-left font-medium text-gray-600">
          <tr>
            <th className="p-3">Docente</th>
            <th className="p-3">Acción</th>
            <th className="p-3">Escuela</th>
            <th className="p-3">Puntaje</th>
            <th className="p-3">Estado</th>
            <th className="p-3">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {accionesFiltradas.map((a) => (
            <tr key={a.id} className="border-t hover:bg-gray-50">
              <td className="p-3">{a.docente}</td>
              <td className="p-3">{a.accion}</td>
              <td className="p-3">{a.escuela}</td>
              <td className="p-3">{a.puntaje}</td>
              <td className="p-3 capitalize">
                {a.estado === "pendiente" && (
                  <span className="text-yellow-600">Pendiente</span>
                )}
                {a.estado === "aprobada" && (
                  <span className="text-green-600 font-medium">Aprobada</span>
                )}
                {a.estado === "rechazada" && (
                  <span className="text-red-600 font-medium">Rechazada</span>
                )}
              </td>
              <td className="p-3 space-x-2">
                {a.estado === "pendiente" ? (
                  <>
                    <button
                      onClick={() => actualizarEstado(a.id, "aprobada")}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      Aprobar
                    </button>
                    <button
                      onClick={() => actualizarEstado(a.id, "rechazada")}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Rechazar
                    </button>
                  </>
                ) : (
                  <span className="text-xs text-gray-400">Sin acciones</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
