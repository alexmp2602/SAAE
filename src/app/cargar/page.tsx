"use client";

import { useState } from "react";
import FormCargarAccion from "@/app/cargar/FormCargarAccion";
import ListaRecientes from "@/app/cargar/ListaRecientes";
import { useAcciones } from "@/lib/useAcciones";
import type { Accion } from "@/lib/types";

const formInicial = {
  docente: "",
  accion: "",
  escuela: "",
  fecha: "",
  puntaje: 0,
  created_at: new Date().toISOString(),
};

export default function CargarAccionPage() {
  const { acciones, agregarAccion, eliminarAccion } =
    useAcciones();

  const [form, setForm] = useState<Omit<Accion, "id" | "estado">>(formInicial);
  const [mensaje, setMensaje] = useState("");
  const [editandoId, setEditandoId] = useState<number | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "puntaje" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.docente || !form.accion || !form.escuela || !form.fecha) {
      setMensaje("⚠️ Por favor, completá todos los campos.");
      return;
    }

    if (isNaN(form.puntaje) || form.puntaje < 0) {
      setMensaje("❌ El puntaje debe ser un número válido.");
      return;
    }

    const accionAGuardar = {
      ...form,
      created_at: new Date().toISOString(),
    };

    let exito = false;

    if (editandoId) {
      // Actualizar acción existente
      exito = await eliminarAccion(editandoId);
      if (exito) {
        exito = await agregarAccion(accionAGuardar);
      }
    } else {
      // Nueva acción
      exito = await agregarAccion(accionAGuardar);
    }

    setMensaje(
      exito
        ? `✅ Acción ${editandoId ? "actualizada" : "cargada"} con éxito`
        : "❌ Hubo un error al guardar la acción"
    );

    setForm(formInicial);
    setEditandoId(null);
  };

  const handleEditar = (accion: Accion) => {
    const { id, ...resto } = accion;
    setForm(resto);
    setEditandoId(id);
    setMensaje("✏️ Editando acción existente");
  };

  const handleEliminar = async (id: number) => {
    const confirmado = confirm(
      "¿Estás seguro de que querés eliminar esta acción?"
    );
    if (!confirmado) return;

    const exito = await eliminarAccion(id);
    setMensaje(
      exito
        ? "🗑️ Acción eliminada correctamente"
        : "❌ Hubo un error al eliminar la acción"
    );

    if (editandoId === id) {
      setForm(formInicial);
      setEditandoId(null);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">
        {editandoId ? "Editar acción" : "Cargar nueva acción"}
      </h1>

      <FormCargarAccion
        form={form}
        mensaje={mensaje}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />

      <ListaRecientes
        acciones={acciones}
        onEditar={handleEditar}
        onEliminar={handleEliminar}
      />
    </div>
  );
}
