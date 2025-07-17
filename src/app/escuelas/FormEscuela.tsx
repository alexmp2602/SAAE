"use client";

import { useState, useEffect } from "react";
import { createBrowserSupabaseClient } from "@/lib/supabaseBrowserClient";

type Escuela = {
  id?: string;
  nombre: string;
  region: string;
  distrito: string;
  cue: string;
  activo?: boolean;
};

type Props = {
  escuela?: Escuela;
  onFinish: () => void;
};

export default function FormEscuela({ escuela, onFinish }: Props) {
  const [form, setForm] = useState<Escuela>({
    nombre: "",
    region: "",
    distrito: "",
    cue: "",
  });
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    if (escuela) setForm(escuela);
  }, [escuela]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createBrowserSupabaseClient();
    const tabla = supabase.from("escuelas");

    let result;
    if (form.id) {
      result = await tabla.update(form).eq("id", form.id);
    } else {
      result = await tabla.insert({ ...form, activo: true });
    }

    if (result.error) {
      setMensaje("❌ Error al guardar");
    } else {
      setMensaje("✅ Guardado correctamente");
      onFinish();
      setForm({ nombre: "", region: "", distrito: "", cue: "" });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 bg-white p-4 rounded shadow max-w-xl mx-auto"
    >
      <h2 className="text-lg font-semibold">
        {form.id ? "Editar escuela" : "Agregar nueva escuela"}
      </h2>

      <input
        name="nombre"
        placeholder="Nombre"
        value={form.nombre}
        onChange={handleChange}
        className="form-input w-full"
        required
      />
      <input
        name="region"
        placeholder="Región"
        value={form.region}
        onChange={handleChange}
        className="form-input w-full"
        required
      />
      <input
        name="distrito"
        placeholder="Distrito"
        value={form.distrito}
        onChange={handleChange}
        className="form-input w-full"
        required
      />
      <input
        name="cue"
        placeholder="CUE"
        value={form.cue}
        onChange={handleChange}
        className="form-input w-full"
        required
      />

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        {form.id ? "Actualizar" : "Guardar"}
      </button>

      {mensaje && <p className="text-sm">{mensaje}</p>}
    </form>
  );
}
