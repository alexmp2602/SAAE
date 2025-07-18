"use client";

import TablaFiltradaAcciones from "./TablaFiltradaAcciones";
import { useAcciones } from "@/lib/useAcciones";
import type { AccionConEscuela } from "@/lib/types";

export default function AccionesPage() {
  const { acciones, loading, eliminarAccion } = useAcciones();

  const handleEditar = (accion: AccionConEscuela) => {
    console.log("Editar acción:", accion);
    // Podés abrir un modal o redireccionar a un formulario
  };

  return (
    <main
      className="max-w-7xl mx-auto px-6 py-10 space-y-8"
      role="main"
      aria-labelledby="titulo-acciones"
    >
      <header className="space-y-2">
        <h1
          id="titulo-acciones"
          className="text-3xl font-bold tracking-tight text-gray-900"
        >
          Panel de Acciones Pendientes
        </h1>
        <p className="text-base text-gray-600">
          Aquí podés visualizar, editar o eliminar las acciones cargadas que aún
          no han sido aprobadas.
        </p>
      </header>

      {loading ? (
        <div role="status" aria-live="polite" className="text-gray-600 text-sm">
          Cargando acciones...
        </div>
      ) : acciones.length === 0 ? (
        <div role="alert" className="text-gray-500 text-sm italic">
          No hay acciones pendientes por el momento.
        </div>
      ) : (
        <TablaFiltradaAcciones
          acciones={acciones}
          onEditar={handleEditar}
          onEliminar={eliminarAccion}
        />
      )}
    </main>
  );
}
