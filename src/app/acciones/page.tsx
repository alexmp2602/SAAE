"use client";

import { useAcciones } from "@/lib/useAcciones";

export default function AccionesPage() {
  const { acciones, loading } = useAcciones();
  const pendientes = acciones.filter((a) => a.estado === "pendiente");

  return (
    <main
      className="max-w-5xl mx-auto px-6 pt-6 pb-12"
      aria-label="Acciones en revisión"
    >
      <h1 className="text-3xl font-semibold mb-8">Acciones Pendientes</h1>

      {loading ? (
        <p className="text-gray-500">Cargando acciones...</p>
      ) : pendientes.length === 0 ? (
        <p className="text-gray-600">
          No hay acciones pendientes en este momento.
        </p>
      ) : (
        <ul className="space-y-4">
          {pendientes.map((accion) => (
            <li key={accion.id} className="p-4 bg-white rounded shadow border">
              <p className="font-medium">{accion.docente}</p>
              <p className="text-sm text-gray-600">
                {accion.accion} en {accion.escuela} - Puntaje: {accion.puntaje}
              </p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
