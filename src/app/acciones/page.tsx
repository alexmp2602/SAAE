"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import { useAcciones } from "@/lib/useAcciones";
import toast from "react-hot-toast";

export default function AccionesPage() {
  const { acciones, loading, actualizarAccion, setAcciones } = useAcciones();
  const [procesando, setProcesando] = useState<number | null>(null);

  const pendientes = acciones;

  const manejarEstado = async (
    id: number,
    nuevoEstado: "aprobada" | "rechazada"
  ) => {
    setProcesando(id);

    const exito = await actualizarAccion(id, nuevoEstado);
    if (exito) {
      setAcciones((prev) => prev.filter((a) => a.id !== id));
      toast.success(
        `Acción ${
          nuevoEstado === "aprobada" ? "aprobada" : "rechazada"
        } correctamente`
      );
    } else {
      toast.error("Hubo un error al actualizar el estado");
    }

    setProcesando(null);
  };

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
              <div className="flex justify-between items-start gap-4 flex-wrap">
                <div>
                  <p className="font-medium">{accion.docente}</p>
                  <p className="text-sm text-gray-600">
                    {accion.accion} en {accion.escuela} – Puntaje:{" "}
                    {accion.puntaje}
                  </p>
                </div>
                <div className="flex gap-2 mt-2 sm:mt-0">
                  <button
                    disabled={procesando === accion.id}
                    onClick={() => manejarEstado(accion.id, "aprobada")}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm disabled:opacity-50"
                  >
                    {procesando === accion.id ? "Procesando..." : "Aprobar"}
                  </button>
                  <button
                    disabled={procesando === accion.id}
                    onClick={() => manejarEstado(accion.id, "rechazada")}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm disabled:opacity-50"
                  >
                    Rechazar
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
