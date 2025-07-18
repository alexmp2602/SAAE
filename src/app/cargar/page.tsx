"use client";

import { useState } from "react";
import FormCargarAccion from "@/app/cargar/FormCargarAccion";
import ListaRecientes from "@/app/cargar/ListaRecientes";
import { useAcciones } from "@/lib/useAcciones";
import type { AccionConEscuela } from "@/lib/types";
import { motion, AnimatePresence } from "motion/react";

type AccionForm = {
  docente: string;
  accion: string;
  escuela_id: string;
  fecha: string;
  puntaje: number;
};

const FORM_INICIAL: AccionForm = {
  docente: "",
  accion: "",
  escuela_id: "",
  fecha: "",
  puntaje: 0,
};

export default function CargarAccionPage() {
  const { acciones, agregarAccion, eliminarAccion } = useAcciones();

  const [form, setForm] = useState<AccionForm>(FORM_INICIAL);
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

  const mostrarMensaje = (texto: string, tiempo = 3000) => {
    setMensaje(texto);
    setTimeout(() => setMensaje(""), tiempo);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { docente, accion, escuela_id, fecha, puntaje } = form;

    if (!docente || !accion || !escuela_id || !fecha) {
      mostrarMensaje("⚠️ Por favor, completá todos los campos.");
      return;
    }

    if (isNaN(puntaje) || puntaje < 0) {
      mostrarMensaje("❌ El puntaje debe ser un número válido.");
      return;
    }

    const accionAGuardar = {
      docente,
      accion,
      escuela_id,
      fecha,
      puntaje,
    };

    let exito = false;

    if (editandoId) {
      exito = await eliminarAccion(editandoId);
      if (exito) {
        exito = await agregarAccion(accionAGuardar);
      }
    } else {
      exito = await agregarAccion(accionAGuardar);
    }

    mostrarMensaje(
      exito
        ? `✅ Acción ${editandoId ? "actualizada" : "cargada"} con éxito`
        : "❌ Hubo un error al guardar la acción"
    );

    setForm(FORM_INICIAL);
    setEditandoId(null);
  };

  const handleEditar = (accion: AccionConEscuela) => {
    setForm({
      docente: accion.docente,
      accion: accion.accion,
      escuela_id: accion.escuela_id,
      fecha: accion.fecha,
      puntaje: accion.puntaje,
    });

    setEditandoId(accion.id);
    mostrarMensaje("✏️ Editando acción existente");
  };

  const handleEliminar = async (id: number) => {
    const confirmar = confirm(
      "¿Estás seguro de que querés eliminar esta acción?"
    );
    if (!confirmar) return;

    const exito = await eliminarAccion(id);

    mostrarMensaje(
      exito
        ? "🗑️ Acción eliminada correctamente"
        : "❌ Hubo un error al eliminar la acción"
    );

    if (editandoId === id) {
      setForm(FORM_INICIAL);
      setEditandoId(null);
    }
  };

  return (
    <main className="p-6 max-w-7xl mx-auto space-y-8" role="main">
      <motion.h1
        className="text-2xl font-semibold text-gray-800"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {editandoId ? "Editar acción" : "Cargar nueva acción"}
      </motion.h1>

      <motion.section
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <FormCargarAccion
          form={form}
          mensaje={mensaje}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />

        <AnimatePresence>
          {mensaje && (
            <motion.div
              key="mensaje"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.25 }}
              className="mt-2 text-sm font-medium text-gray-700"
              role="alert"
              aria-live="polite"
            >
              {mensaje}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <ListaRecientes
          acciones={acciones}
          onEditar={handleEditar}
          onEliminar={handleEliminar}
        />
      </motion.section>
    </main>
  );
}
