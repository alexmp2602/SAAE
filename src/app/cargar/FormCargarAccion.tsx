"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { createBrowserSupabaseClient } from "@/lib/supabaseBrowserClient";

type Escuela = {
  id: string;
  nombre: string;
};

type FormData = {
  docente: string;
  accion: string;
  escuela: string; // Guarda el id
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
  const [enviando, setEnviando] = useState(false);
  const [escuelas, setEscuelas] = useState<Escuela[]>([]);

  useEffect(() => {
    const fetchEscuelas = async () => {
      const supabase = createBrowserSupabaseClient();
      const { data, error } = await supabase
        .from("escuelas")
        .select("id, nombre")
        .order("nombre", { ascending: true });

      if (data) setEscuelas(data);
      else console.error("Error al cargar escuelas:", error);
    };

    fetchEscuelas();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    setEnviando(true);
    await onSubmit(e);
    setTimeout(() => setEnviando(false), 300);
  };

  const colorMensaje = mensaje.startsWith("✅")
    ? "bg-green-100 text-green-800"
    : mensaje.startsWith("⚠️")
    ? "bg-yellow-100 text-yellow-800"
    : "bg-red-100 text-red-700";

  return (
    <form
      onSubmit={handleSubmit}
      aria-label="Formulario de carga de acción estatutaria"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-white p-6 rounded-md shadow border max-w-7xl mx-auto"
    >
      <FormInput
        id="docente"
        label="Nombre del docente"
        placeholder="Ej. María González"
        value={form.docente}
        onChange={onChange}
        required
      />

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

      <div>
        <label htmlFor="escuela" className="form-label">
          Escuela
        </label>
        <select
          id="escuela"
          name="escuela"
          value={form.escuela}
          onChange={onChange}
          className="form-input"
          required
        >
          <option value="">Seleccionar escuela...</option>
          {escuelas.map((e) => (
            <option key={e.id} value={e.id}>
              {e.nombre}
            </option>
          ))}
        </select>
      </div>

      <FormInput
        id="fecha"
        label="Fecha"
        type="date"
        value={form.fecha}
        onChange={onChange}
        required
      />

      <FormInput
        id="puntaje"
        label="Puntaje"
        type="number"
        step="0.1"
        placeholder="Ej. 12.5"
        value={form.puntaje}
        onChange={onChange}
        required
      />

      <div className="lg:col-span-3 md:col-span-2 flex flex-wrap items-center gap-4 mt-2">
        <button
          type="submit"
          disabled={enviando}
          className={`px-5 py-2.5 rounded text-white transition-colors ${
            enviando
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {enviando ? "Guardando..." : "Guardar acción"}
        </button>

        <AnimatePresence>
          {mensaje && (
            <motion.p
              key="mensaje"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.3 }}
              className={`text-sm px-4 py-2 rounded ${colorMensaje}`}
              role="alert"
              aria-live="polite"
            >
              {mensaje}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}

type FormInputProps = {
  id: string;
  label: string;
  placeholder?: string;
  type?: string;
  step?: string;
  value: string | number;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  required?: boolean;
};

function FormInput({
  id,
  label,
  placeholder,
  type = "text",
  step,
  value,
  onChange,
  required,
}: FormInputProps) {
  return (
    <div>
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        step={step}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="form-input"
        required={required}
      />
    </div>
  );
}
