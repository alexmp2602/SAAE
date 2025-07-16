"use client";

import { useState } from "react";
import { useAcciones } from "@/lib/useAcciones";
import { PlusIcon } from "@heroicons/react/24/solid";

const accionesDisponibles = [
  "MAD",
  "Acrecentamiento",
  "Servicio Provisorio",
  "Traslado",
];

export default function CargarAccionPage() {
  const { agregarAccion } = useAcciones();

  const [docente, setDocente] = useState("");
  const [accion, setAccion] = useState("");
  const [escuela, setEscuela] = useState("");
  const [fecha, setFecha] = useState("");
  const [puntaje, setPuntaje] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!docente || !accion || !escuela || !fecha || !puntaje) {
      setMensaje("⚠️ Completá todos los campos.");
      return;
    }

    const resultado = await agregarAccion({
      id: Date.now(),
      docente,
      accion,
      escuela,
      fecha,
      puntaje: parseFloat(puntaje),
      estado: "pendiente",
      created_at: new Date().toISOString(),
    });

    if (resultado) {
      setMensaje("✅ Acción cargada correctamente.");
      setDocente("");
      setAccion("");
      setEscuela("");
      setFecha("");
      setPuntaje("");
    } else {
      setMensaje("❌ Hubo un error al guardar la acción.");
    }
  };

  const camposIncompletos =
    !docente || !accion || !escuela || !fecha || !puntaje;

  return (
    <main
      className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-md"
      aria-label="Formulario para cargar acción"
    >
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">
        Cargar nueva acción
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="docente"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Docente
          </label>
          <input
            id="docente"
            type="text"
            value={docente}
            onChange={(e) => setDocente(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Ej. Juan Pérez"
          />
        </div>

        <div>
          <label
            htmlFor="accion"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Acción
          </label>
          <select
            id="accion"
            value={accion}
            onChange={(e) => setAccion(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Seleccionar acción</option>
            {accionesDisponibles.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="escuela"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Escuela
          </label>
          <input
            id="escuela"
            type="text"
            value={escuela}
            onChange={(e) => setEscuela(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Ej. Esc. N° 25"
          />
        </div>

        <div>
          <label
            htmlFor="fecha"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Fecha
          </label>
          <input
            id="fecha"
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label
            htmlFor="puntaje"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Puntaje
          </label>
          <input
            id="puntaje"
            type="number"
            step="0.1"
            value={puntaje}
            onChange={(e) => setPuntaje(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Ej. 7.5"
          />
        </div>

        <button
          type="submit"
          disabled={camposIncompletos}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <PlusIcon className="w-5 h-5" />
          Cargar acción
        </button>

        {mensaje && (
          <div
            className={`text-sm px-4 py-2 rounded mt-2 ${
              mensaje.startsWith("✅")
                ? "bg-green-100 text-green-800"
                : mensaje.startsWith("⚠️")
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-700"
            }`}
          >
            {mensaje}
          </div>
        )}
      </form>
    </main>
  );
}
