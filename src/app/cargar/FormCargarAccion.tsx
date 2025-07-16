"use client";

import React from "react";

type FormData = {
  docente: string;
  accion: string;
  escuela: string;
  fecha: string;
  puntaje: number;
};

type Props = {
  form: FormData;
  mensaje: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
};

export default function FormCargarAccion({
  form,
  mensaje,
  onChange,
  onSubmit,
}: Props) {
  return (
    <form
      onSubmit={onSubmit}
      aria-label="Formulario de carga de acción estatutaria"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-white p-6 rounded-md shadow border max-w-7xl mx-auto"
    >
      {/* Docente */}
      <div>
        <label htmlFor="docente" className="form-label">
          Nombre del docente
        </label>
        <input
          type="text"
          id="docente"
          name="docente"
          value={form.docente}
          onChange={onChange}
          placeholder="Ej. María González"
          className="form-input"
          required
        />
      </div>

      {/* Acción */}
      <div>
        <label htmlFor="accion" className="form-label">
          Acción estatutaria
        </label>
        <select
          id="accion"
          name="accion"
          value={form.accion}
          onChange={onChange}
          className="form-input"
          required
        >
          <option value="">Seleccionar acción...</option>
          <option value="MAD">MAD</option>
          <option value="Acrecentamiento">Acrecentamiento</option>
          <option value="Servicio Provisorio">Servicio Provisorio</option>
          <option value="Traslado">Traslado</option>
        </select>
      </div>

      {/* Escuela */}
      <div>
        <label htmlFor="escuela" className="form-label">
          Escuela
        </label>
        <input
          type="text"
          id="escuela"
          name="escuela"
          value={form.escuela}
          onChange={onChange}
          placeholder="Ej. EP N°12 - Mercedes"
          className="form-input"
          required
        />
      </div>

      {/* Fecha */}
      <div>
        <label htmlFor="fecha" className="form-label">
          Fecha
        </label>
        <input
          type="date"
          id="fecha"
          name="fecha"
          value={form.fecha}
          onChange={onChange}
          className="form-input"
          required
        />
      </div>

      {/* Puntaje */}
      <div>
        <label htmlFor="puntaje" className="form-label">
          Puntaje
        </label>
        <input
          type="number"
          step="0.1"
          id="puntaje"
          name="puntaje"
          value={form.puntaje}
          onChange={onChange}
          placeholder="Ej. 12.5"
          className="form-input"
          required
        />
      </div>

      {/* Botón + Mensaje */}
      <div className="lg:col-span-3 md:col-span-2 flex flex-wrap items-center gap-4 mt-2">
        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2.5 rounded hover:bg-blue-700 transition-colors"
        >
          Guardar acción
        </button>

        {mensaje && (
          <p
            className={`text-sm px-4 py-2 rounded ${
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
      </div>
    </form>
  );
}
