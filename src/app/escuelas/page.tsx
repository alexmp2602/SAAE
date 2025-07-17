"use client";

import { useState } from "react";
import FormEscuela from "./FormEscuela";
import ListaEscuelas from "./ListaEscuelas";
import type { Escuela } from "@/lib/types"; // asegurate de importar el tipo correcto

export default function EscuelasPage() {
  const [editando, setEditando] = useState<Escuela | undefined>(undefined);
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="p-4 space-y-6">
      <FormEscuela
        escuela={editando}
        onFinish={() => {
          setEditando(undefined);
          setRefresh(!refresh);
        }}
      />

      <ListaEscuelas
        onEdit={(escuela) => setEditando(escuela)}
        refresh={refresh}
      />
    </div>
  );
}
