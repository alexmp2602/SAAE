"use client";

import { useEffect, useState } from "react";
import type { Accion } from "@/lib/types";
import { createBrowserSupabaseClient } from "@/lib/supabaseBrowserClient";

export function useAcciones() {
  const [acciones, setAcciones] = useState<Accion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAcciones();
  }, []);

  const fetchAcciones = async () => {
    setLoading(true);
    const supabase = createBrowserSupabaseClient();

    const { data, error } = await supabase
      .from("acciones")
      .select("*")
      .eq("estado", "pendiente") // ✅ solo pendientes
      .order("fecha", { ascending: false });

    if (data) setAcciones(data);
    else console.error("Error al obtener acciones:", error?.message);

    setLoading(false);
  };

  const agregarAccion = async (accion: Omit<Accion, "id" | "estado">) => {
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

  const actualizarAccion = async (
    id: number,
    nuevoEstado: "pendiente" | "aprobada" | "rechazada"
  ) => {
    const supabase = createBrowserSupabaseClient();
    const { error } = await supabase
      .from("acciones")
      .update({ estado: nuevoEstado })
      .eq("id", id);

    if (error) {
      console.error("Error al actualizar estado:", error.message);
      return false;
    }

    return true; // No hace refetch
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
