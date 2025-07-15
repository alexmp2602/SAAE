"use client";

import { useEffect, useState } from "react";

type Accion = {
  id: number;
  docente: string;
  accion: string;
  escuela: string;
  puntaje: number;
  estado: "pendiente" | "aprobada" | "rechazada";
};

const ACCIONES_KEY = "acciones-aprobaciones";

const accionesIniciales: Accion[] = [
  {
    id: 1,
    docente: "María López",
    accion: "MAD",
    escuela: "Esc. 5",
    puntaje: 9.1,
    estado: "pendiente",
  },
  {
    id: 2,
    docente: "Ana Torres",
    accion: "Servicio Provisorio",
    escuela: "Esc. 9",
    puntaje: 6.0,
    estado: "pendiente",
  },
  {
    id: 3,
    docente: "Laura Pérez",
    accion: "Traslado",
    escuela: "Esc. 7",
    puntaje: 8.0,
    estado: "pendiente",
  },
  {
    id: 4,
    docente: "Javier Gómez",
    accion: "Acrecentamiento",
    escuela: "Esc. 3",
    puntaje: 7.2,
    estado: "pendiente",
  },
];

export default function PanelAprobaciones() {
  const [acciones, setAcciones] = useState<Accion[]>([]);
  const [filtroAccion, setFiltroAccion] = useState<string>("Todas");

  // Cargar datos desde localStorage
  useEffect(() => {
    const datosGuardados = localStorage.getItem(ACCIONES_KEY);
    if (datosGuardados) {
      setAcciones(JSON.parse(datosGuardados));
    } else {
      setAcciones(accionesIniciales);
      localStorage.setItem(ACCIONES_KEY, JSON.stringify(accionesIniciales));
    }
  }, []);

  // Actualizar estado y guardar en localStorage
  const actualizarEstado = (
    id: number,
    nuevoEstado: "aprobada" | "rechazada"
  ) => {
    const nuevasAcciones = acciones.map((a) =>
      a.id === id ? { ...a, estado: nuevoEstado } : a
    );
    setAcciones(nuevasAcciones);
    localStorage.setItem(ACCIONES_KEY, JSON.stringify(nuevasAcciones));
  };

  // Filtrar acciones por tipo
  const accionesFiltradas = acciones.filter((a) =>
    filtroAccion === "Todas" ? true : a.accion === filtroAccion
  );

  // Exportar CSV de aprobadas
  const exportarAprobadasCSV = () => {
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
    const BOM = "\uFEFF"; // Marca de orden de bytes UTF-8
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
  };

  return (
    <div className="bg-white shadow rounded-md overflow-hidden">
      <div className="p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">
            Filtrar por acción:
          </label>
          <select
            value={filtroAccion}
            onChange={(e) => setFiltroAccion(e.target.value)}
            className="border rounded px-2 py-1 text-sm"
          >
            <option value="Todas">Todas</option>
            <option value="MAD">MAD</option>
            <option value="Acrecentamiento">Acrecentamiento</option>
            <option value="Servicio Provisorio">Servicio Provisorio</option>
            <option value="Traslado">Traslado</option>
          </select>
        </div>

        <button
          onClick={exportarAprobadasCSV}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Descargar archivo para Excel
        </button>
      </div>

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
    </div>
  );
}
