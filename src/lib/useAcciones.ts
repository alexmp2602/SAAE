"use client";

import { useEffect, useState } from "react";
import type { AccionConEscuela, EstadoAccion, AccionSinID } from "@/lib/types";
import { createBrowserSupabaseClient } from "@/lib/supabaseBrowserClient";

export function useAcciones() {
  const [acciones, setAcciones] = useState<AccionConEscuela[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAcciones(); // por defecto, trae todas
  }, []);

  const fetchAcciones = async (soloPendientes = false) => {
    setLoading(true);
    const supabase = createBrowserSupabaseClient();

    let query = supabase
      .from("acciones")
      .select("*, escuelas(*)")
      .order("fecha", { ascending: false });

    if (soloPendientes) {
      query = query.eq("estado", "pendiente");
    }

    const { data, error } = await query;

    if (data) setAcciones(data as AccionConEscuela[]);
    else console.error("Error al obtener acciones:", error?.message);

    setLoading(false);
  };

  const agregarAccion = async (accion: AccionSinID) => {
    const supabase = createBrowserSupabaseClient();

    const { error } = await supabase
      .from("acciones")
      .insert([{ ...accion, estado: "pendiente" }]);

    if (error) {
      console.error("Error al insertar acción:", error.message);
      return false;
    }

    await fetchAcciones();
    return true;
  };

  const actualizarAccion = async (id: number, nuevoEstado: EstadoAccion) => {
    const supabase = createBrowserSupabaseClient();

    const { error } = await supabase
      .from("acciones")
      .update({ estado: nuevoEstado })
      .eq("id", id);

    if (error) {
      console.error("Error al actualizar estado:", error.message);
      return false;
    }

    return true;
  };

  const eliminarAccion = async (id: number) => {
    const supabase = createBrowserSupabaseClient();

    const { error } = await supabase.from("acciones").delete().eq("id", id);

    if (error) {
      console.error("Error al eliminar acción:", error.message);
      return false;
    }

    setAcciones((prev) => prev.filter((a) => a.id !== id));
    return true;
  };

  return {
    acciones,
    setAcciones,
    loading,
    agregarAccion,
    actualizarAccion,
    eliminarAccion,
    fetchAcciones,
  };
}
