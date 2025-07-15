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
      setMensaje("Por favor, completá todos los campos.");
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
      className="space-y-4 bg-white p-6 rounded shadow"
    >
      <div>
        <label className="block font-medium mb-1">Nombre del docente</label>
        <input
          type="text"
          name="docente"
          value={form.docente}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Acción estatutaria</label>
        <select
          name="accion"
          value={form.accion}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        >
          <option value="">Seleccionar acción</option>
          <option value="MAD">MAD</option>
          <option value="Acrecentamiento">Acrecentamiento</option>
          <option value="Servicio Provisorio">Servicio Provisorio</option>
          <option value="Traslado">Traslado</option>
        </select>
      </div>

      <div>
        <label className="block font-medium mb-1">Escuela</label>
        <input
          type="text"
          name="escuela"
          value={form.escuela}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Fecha</label>
        <input
          type="date"
          name="fecha"
          value={form.fecha}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Puntaje</label>
        <input
          type="number"
          step="0.1"
          name="puntaje"
          value={form.puntaje}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Guardar acción
      </button>

      {mensaje && <p className="text-sm mt-2 text-green-700">{mensaje}</p>}
    </form>
  );
}
