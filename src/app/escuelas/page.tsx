"use client";

import { useState } from "react";
import FormEscuela from "./FormEscuela";
import ListaEscuelas from "./ListaEscuelas";
import type { Escuela } from "@/lib/types";

export default function EscuelasPage() {
  const [editando, setEditando] = useState<Escuela | undefined>(undefined);
  const [refresh, setRefresh] = useState(false);

  return (
    <main
      aria-label="Gestión de Escuelas"
      className="max-w-6xl mx-auto px-6 py-10 space-y-12"
    >
      {/* Sección: Formulario */}
      <section aria-labelledby="form-escuela" className="space-y-6">
        <header className="border-b border-neutral-300 pb-4">
          <h1
            id="form-escuela"
            className="text-3xl font-bold text-neutral-800 tracking-tight"
          >
            {editando ? "✏️ Editar Escuela" : "🏫 Registrar Nueva Escuela"}
          </h1>
          <p className="text-sm text-neutral-500 mt-1">
            Completá el formulario para registrar una nueva escuela o editar una
            existente.
          </p>
        </header>

        <FormEscuela
          escuela={editando}
          onFinish={() => {
            setEditando(undefined);
            setRefresh(!refresh);
          }}
        />
      </section>

      {/* Sección: Lista */}
      <section aria-labelledby="lista-escuelas" className="space-y-6">
        <header className="border-b border-neutral-300 pb-4">
          <h2
            id="lista-escuelas"
            className="text-2xl font-semibold text-neutral-800"
          >
            📋 Listado de Escuelas
          </h2>
          <p className="text-sm text-neutral-500 mt-1">
            Visualizá y gestioná las escuelas registradas en el sistema.
          </p>
        </header>

        <ListaEscuelas
          onEdit={(escuela) => setEditando(escuela)}
          refresh={refresh}
        />
      </section>
    </main>
  );
}
