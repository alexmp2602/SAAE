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
  escuela_id: string;
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
    ? "bg-green-100 text-green-700 border-green-300"
    : mensaje.startsWith("⚠️")
    ? "bg-yellow-100 text-yellow-800 border-yellow-300"
    : "bg-red-100 text-red-700 border-red-300";

  return (
    <form
      onSubmit={handleSubmit}
      aria-label="Formulario de carga de acción estatutaria"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-white p-8 rounded-xl shadow-md border max-w-7xl mx-auto transition-all"
    >
      <FormInput
        id="docente"
        label="Nombre del docente"
        placeholder="Ej. María González"
        value={form.docente}
        onChange={onChange}
        required
      />

      <SelectInput
        id="accion"
        label="Acción estatutaria"
        value={form.accion}
        onChange={onChange}
        required
        options={[
          { value: "", label: "Seleccionar acción..." },
          { value: "MAD", label: "MAD" },
          { value: "Acrecentamiento", label: "Acrecentamiento" },
          { value: "Servicio Provisorio", label: "Servicio Provisorio" },
          { value: "Traslado", label: "Traslado" },
        ]}
      />

      <SelectInput
        id="escuela_id"
        label="Escuela"
        value={form.escuela_id}
        onChange={onChange}
        required
        options={[
          { value: "", label: "Seleccionar escuela..." },
          ...escuelas.map((e) => ({ value: e.id, label: e.nombre })),
        ]}
      />

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

      <div className="lg:col-span-3 md:col-span-2 flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-2">
        <button
          type="submit"
          disabled={enviando}
          className={`px-6 py-2.5 font-medium rounded-lg text-white transition-all ${
            enviando
              ? "bg-blue-300 cursor-not-allowed"
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
              className={`text-sm px-4 py-2 border rounded-md ${colorMensaje}`}
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
      <label htmlFor={id} className="block mb-1 font-medium text-gray-700">
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
        required={required}
        className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
      />
    </div>
  );
}

type SelectInputProps = {
  id: string;
  label: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  required?: boolean;
  options: { value: string; label: string }[];
};

function SelectInput({
  id,
  label,
  value,
  onChange,
  required,
  options,
}: SelectInputProps) {
  return (
    <div>
      <label htmlFor={id} className="block mb-1 font-medium text-gray-700">
        {label}
      </label>
      <select
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
      >
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}
