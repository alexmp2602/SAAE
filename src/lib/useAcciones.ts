"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import type { Accion } from "@/lib/types";

export function useAcciones() {
  const [acciones, setAcciones] = useState<Accion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAcciones();
  }, []);

  const fetchAcciones = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("acciones")
      .select("*")
      .order("fecha", { ascending: false });

    if (data) {
      setAcciones(data as Accion[]);
    } else {
      console.error("Error al obtener acciones:", error?.message);
    }

    setLoading(false);
  };

  const agregarAccion = async (accion: Accion): Promise<boolean> => {
    const { error } = await supabase.from("acciones").insert([accion]);
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
  ): Promise<boolean> => {
    const { error } = await supabase
      .from("acciones")
      .update({ estado: nuevoEstado })
      .eq("id", id);

    if (error) {
      console.error("Error al actualizar estado:", error.message);
      return false;
    }

    await fetchAcciones();
    return true;
  };

  return {
    acciones,
    loading,
    agregarAccion,
    actualizarAccion,
    fetchAcciones,
  };
}
