"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export type Accion = {
  id: number;
  created_at: string;
  docente: string;
  accion: string;
  escuela: string;
  fecha: string;
  puntaje: number;
  estado: "pendiente" | "aprobada" | "rechazada";
};

export function useAcciones() {
  const [acciones, setAcciones] = useState<Accion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 🔁 Cargar todas las acciones al montar
  useEffect(() => {
    fetchAcciones();
  }, []);

  async function fetchAcciones() {
    setLoading(true);
    const { data, error } = await supabase
      .from("acciones")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error al obtener acciones:", error.message);
      setError(error.message);
    } else {
      setAcciones(data as Accion[]);
    }
    setLoading(false);
  }

  async function agregarAccion(nueva: Omit<Accion, "id" | "created_at">) {
    const { data, error } = await supabase.from("acciones").insert([nueva]);

    if (error) {
      console.error("Error al agregar acción:", error.message);
      setError(error.message);
      return false;
    } else {
      fetchAcciones(); // refresca lista
      return true;
    }
  }

  async function actualizarEstado(id: number, nuevoEstado: Accion["estado"]) {
    const { error } = await supabase
      .from("acciones")
      .update({ estado: nuevoEstado })
      .eq("id", id);

    if (error) {
      console.error("Error al actualizar estado:", error.message);
      setError(error.message);
      return false;
    } else {
      fetchAcciones(); // refresca lista
      return true;
    }
  }

  return {
    acciones,
    loading,
    error,
    fetchAcciones,
    agregarAccion,
    actualizarEstado,
  };
}
