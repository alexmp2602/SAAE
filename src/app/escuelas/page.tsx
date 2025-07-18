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
      className="container mx-auto px-6 py-8 space-y-10"
      aria-label="Gestión de Escuelas"
    >
      <section aria-labelledby="form-escuela">
        <header className="mb-4">
          <h1
            id="form-escuela"
            className="text-2xl sm:text-3xl font-bold text-gray-800"
          >
            {editando ? "Editar Escuela" : "Registrar Nueva Escuela"}
          </h1>
        </header>

        <FormEscuela
          escuela={editando}
          onFinish={() => {
            setEditando(undefined);
            setRefresh(!refresh);
          }}
        />
      </section>

      <section aria-labelledby="lista-escuelas" className="space-y-4">
        <header>
          <h2
            id="lista-escuelas"
            className="text-xl sm:text-2xl font-semibold text-gray-700"
          >
            Listado de Escuelas
          </h2>
        </header>

        <ListaEscuelas
          onEdit={(escuela) => setEditando(escuela)}
          refresh={refresh}
        />
      </section>
    </main>
  );
}
