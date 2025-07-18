"use client";

import { useState, useEffect } from "react";
import { createBrowserSupabaseClient } from "@/lib/supabaseBrowserClient";

type Escuela = {
  id?: string;
  nombre: string;
  cue: string;
  distrito_id: string;
  activo?: boolean;
};

type Distrito = {
  id: string;
  nombre: string;
};

type Props = {
  escuela?: Escuela;
  onFinish: () => void;
};

export default function FormEscuela({ escuela, onFinish }: Props) {
  const [form, setForm] = useState<Escuela>({
    nombre: "",
    cue: "",
    distrito_id: "",
  });

  const [distritos, setDistritos] = useState<Distrito[]>([]);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    if (escuela) setForm(escuela);
  }, [escuela]);

  useEffect(() => {
    const fetchDistritos = async () => {
      const supabase = createBrowserSupabaseClient();
      const { data } = await supabase
        .from("distritos")
        .select("id, nombre")
        .order("nombre", { ascending: true });

      if (data) setDistritos(data);
    };

    fetchDistritos();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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
      setMensaje("❌ Error al guardar los datos.");
    } else {
      setMensaje("✅ Escuela guardada correctamente.");
      onFinish();
      setForm({ nombre: "", cue: "", distrito_id: "" });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      aria-labelledby="form-escuela"
      className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-white p-8 rounded-2xl border border-neutral-300 shadow-md max-w-3xl "
    >
      {/* Nombre */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="nombre"
          className="text-sm font-semibold text-neutral-700"
        >
          Nombre de la Escuela
        </label>
        <input
          id="nombre"
          name="nombre"
          placeholder="Ej: Escuela Primaria Nº 25"
          value={form.nombre}
          onChange={handleChange}
          required
          className="w-full rounded-md border border-neutral-300 px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {/* Distrito */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="distrito_id"
          className="text-sm font-semibold text-neutral-700"
        >
          Distrito
        </label>
        <select
          id="distrito_id"
          name="distrito_id"
          value={form.distrito_id}
          onChange={handleChange}
          required
          className="w-full rounded-md border border-neutral-300 px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="">Seleccionar distrito</option>
          {distritos.map((d) => (
            <option key={d.id} value={d.id}>
              {d.nombre}
            </option>
          ))}
        </select>
      </div>

      {/* CUE */}
      <div className="flex flex-col gap-2 sm:col-span-2">
        <label htmlFor="cue" className="text-sm font-semibold text-neutral-700">
          CUE
        </label>
        <input
          id="cue"
          name="cue"
          placeholder="Ej: 060123400"
          value={form.cue}
          onChange={handleChange}
          required
          className="w-full rounded-md border border-neutral-300 px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {/* Botón */}
      <div className="sm:col-span-2 flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {form.id ? "Actualizar Escuela" : "Guardar Escuela"}
        </button>
      </div>

      {/* Mensaje */}
      {mensaje && (
        <div className="sm:col-span-2">
          <p
            className={`text-sm font-medium ${
              mensaje.startsWith("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {mensaje}
          </p>
        </div>
      )}
    </form>
  );
}
