"use client";

import { useEffect, useState } from "react";
import TablaFiltradaAcciones from "./TablaFiltradaAcciones";
import { createBrowserSupabaseClient } from "@/lib/supabaseBrowserClient";
import type { Accion } from "@/lib/types";

export default function AccionesPage() {
  const [acciones, setAcciones] = useState<Accion[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fetchAcciones = async () => {
      setCargando(true);
      const supabase = createBrowserSupabaseClient();
      const { data, error } = await supabase
        .from("acciones")
        .select("*")
        .order("fecha", { ascending: false });

      if (error) {
        console.error("Error al obtener acciones:", error.message);
      } else if (data) {
        setAcciones(data as Accion[]);
      }

      setCargando(false);
    };

    fetchAcciones();
  }, []);

  const handleEditar = (accion: Accion) => {
    console.log("Editar:", accion);
    // Acá iría la lógica para mostrar un formulario o similar
  };

  const handleEliminar = async (id: number) => {
    const supabase = createBrowserSupabaseClient();
    const { error } = await supabase.from("acciones").delete().eq("id", id);

    if (!error) {
      setAcciones((prev) => prev.filter((a) => a.id !== id));
    } else {
      console.error("Error al eliminar acción:", error.message);
    }
  };

  return (
    <main className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Panel de Acciones
      </h1>

      {cargando ? (
        <p className="text-gray-600">Cargando acciones...</p>
      ) : (
        <TablaFiltradaAcciones
          acciones={acciones}
          onEditar={handleEditar}
          onEliminar={handleEliminar}
        />
      )}
    </main>
  );
}
