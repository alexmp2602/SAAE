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
      className="space-y-6 bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto border border-gray-200"
      aria-labelledby="form-escuela"
    >
      <h2
        id="form-escuela"
        className="text-xl font-bold text-gray-800 tracking-tight"
      >
        {form.id ? "Editar Escuela" : "Agregar Nueva Escuela"}
      </h2>

      <div className="space-y-2">
        <label
          htmlFor="nombre"
          className="block text-sm font-medium text-gray-700"
        >
          Nombre de la Escuela
        </label>
        <input
          id="nombre"
          name="nombre"
          placeholder="Ej: Escuela Primaria Nº 25"
          value={form.nombre}
          onChange={handleChange}
          className="form-input w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="distrito_id"
          className="block text-sm font-medium text-gray-700"
        >
          Distrito
        </label>
        <select
          id="distrito_id"
          name="distrito_id"
          value={form.distrito_id}
          onChange={handleChange}
          className="form-select w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          required
        >
          <option value="">Seleccionar distrito</option>
          {distritos.map((d) => (
            <option key={d.id} value={d.id}>
              {d.nombre}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="cue"
          className="block text-sm font-medium text-gray-700"
        >
          CUE
        </label>
        <input
          id="cue"
          name="cue"
          placeholder="Ej: 060123400"
          value={form.cue}
          onChange={handleChange}
          className="form-input w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      <div className="pt-2">
        <button
          type="submit"
          className="w-full sm:w-auto inline-flex justify-center items-center px-5 py-2.5 text-white bg-blue-600 hover:bg-blue-700 font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
        >
          {form.id ? "Actualizar Escuela" : "Guardar Escuela"}
        </button>
      </div>

      {mensaje && (
        <p
          className={`text-sm font-medium ${
            mensaje.startsWith("✅") ? "text-green-600" : "text-red-600"
          }`}
        >
          {mensaje}
        </p>
      )}
    </form>
  );
}
