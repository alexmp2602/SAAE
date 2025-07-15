"use client";

import { useState } from "react";
import { useAcciones } from "@/lib/useAcciones";

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
      docente,
      accion,
      escuela,
      fecha,
      puntaje: parseFloat(puntaje),
      estado: "pendiente",
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

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-xl font-semibold mb-4 text-gray-800">
        Cargar nueva acción
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-700 mb-1">Docente</label>
          <input
            type="text"
            value={docente}
            onChange={(e) => setDocente(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            placeholder="Ej. Juan Pérez"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">Acción</label>
          <select
            value={accion}
            onChange={(e) => setAccion(e.target.value)}
            className="w-full border px-3 py-2 rounded"
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
          <label className="block text-sm text-gray-700 mb-1">Escuela</label>
          <input
            type="text"
            value={escuela}
            onChange={(e) => setEscuela(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            placeholder="Ej. Esc. N° 25"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">Fecha</label>
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">Puntaje</label>
          <input
            type="number"
            step="0.1"
            value={puntaje}
            onChange={(e) => setPuntaje(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            placeholder="Ej. 7.5"
          />
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Cargar acción
        </button>

        {mensaje && <p className="text-sm mt-2">{mensaje}</p>}
      </form>
    </div>
  );
}
