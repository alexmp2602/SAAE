"use client";

import { useState } from "react";

type FormData = {
  docente: string;
  accion: string;
  escuela: string;
  fecha: string;
  puntaje: number;
};

export default function FormCargarAccion() {
  const [form, setForm] = useState<FormData>({
    docente: "",
    accion: "",
    escuela: "",
    fecha: "",
    puntaje: 0,
  });

  const [mensaje, setMensaje] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "puntaje" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.docente || !form.accion || !form.escuela || !form.fecha) {
      setMensaje("⚠️ Por favor, completá todos los campos.");
      return;
    }

    if (form.puntaje < 0 || isNaN(form.puntaje)) {
      setMensaje("❌ El puntaje debe ser un número válido.");
      return;
    }

    console.log("Acción cargada:", form);
    setMensaje("✅ Acción cargada con éxito");

    setForm({
      docente: "",
      accion: "",
      escuela: "",
      fecha: "",
      puntaje: 0,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      aria-label="Formulario de carga de acción estatutaria"
      className="space-y-5 bg-white p-6 rounded-md shadow border max-w-xl mx-auto"
    >
      <div>
        <label
          htmlFor="docente"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Nombre del docente
        </label>
        <input
          type="text"
          id="docente"
          name="docente"
          value={form.docente}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div>
        <label
          htmlFor="accion"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Acción estatutaria
        </label>
        <select
          id="accion"
          name="accion"
          value={form.accion}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Seleccionar acción</option>
          <option value="MAD">MAD</option>
          <option value="Acrecentamiento">Acrecentamiento</option>
          <option value="Servicio Provisorio">Servicio Provisorio</option>
          <option value="Traslado">Traslado</option>
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
          type="text"
          id="escuela"
          name="escuela"
          value={form.escuela}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
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
          type="date"
          id="fecha"
          name="fecha"
          value={form.fecha}
          onChange={handleChange}
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
          type="number"
          step="0.1"
          id="puntaje"
          name="puntaje"
          value={form.puntaje}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
      >
        Guardar acción
      </button>

      {mensaje && (
        <p
          className={`text-sm mt-2 px-4 py-2 rounded ${
            mensaje.startsWith("✅")
              ? "bg-green-100 text-green-800"
              : mensaje.startsWith("⚠️")
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-700"
          }`}
        >
          {mensaje}
        </p>
      )}
    </form>
  );
}
