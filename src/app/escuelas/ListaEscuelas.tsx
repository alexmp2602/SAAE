"use client";

import { useEffect, useState } from "react";
import { createBrowserSupabaseClient } from "@/lib/supabaseBrowserClient";
import type { Escuela } from "@/lib/types";

type Props = {
  onEdit: (e: Escuela) => void;
  refresh: boolean;
};

const ESCUELAS_POR_PAGINA = 10;

export default function ListaEscuelas({ onEdit, refresh }: Props) {
  const [escuelas, setEscuelas] = useState<Escuela[]>([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalEscuelas, setTotalEscuelas] = useState(0);
  const [cargando, setCargando] = useState(false);

  const totalPaginas = Math.ceil(totalEscuelas / ESCUELAS_POR_PAGINA);

  const fetchEscuelas = async (pagina: number) => {
    setCargando(true);
    const supabase = createBrowserSupabaseClient();

    const desde = (pagina - 1) * ESCUELAS_POR_PAGINA;
    const hasta = desde + ESCUELAS_POR_PAGINA - 1;

    const { data, count } = await supabase
      .from("escuelas")
      .select("*", { count: "exact" })
      .order("nombre", { ascending: true })
      .range(desde, hasta);

    if (data) setEscuelas(data);
    if (typeof count === "number") setTotalEscuelas(count);

    setCargando(false);
  };

  useEffect(() => {
    fetchEscuelas(paginaActual);
  }, [paginaActual, refresh]);

  const handleDelete = async (id: string) => {
    const supabase = createBrowserSupabaseClient();
    await supabase.from("escuelas").delete().eq("id", id);
    fetchEscuelas(paginaActual);
  };

  return (
    <div className="max-w-7xl mx-auto mt-6 px-4">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border shadow">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Nombre</th>
              <th className="p-2">Región</th>
              <th className="p-2">Distrito</th>
              <th className="p-2">CUE</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {escuelas.map((e) => (
              <tr key={e.id}>
                <td className="border px-2">{e.nombre}</td>
                <td className="border px-2">{e.region}</td>
                <td className="border px-2">{e.distrito}</td>
                <td className="border px-2">{e.cue}</td>
                <td className="border px-2 space-x-2">
                  <button
                    onClick={() => onEdit(e)}
                    className="text-sm bg-yellow-500 text-white px-2 py-1 rounded"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(e.id)}
                    className="text-sm bg-red-600 text-white px-2 py-1 rounded"
                  >
                    Borrar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      {totalPaginas > 1 && (
        <div className="flex justify-between items-center mt-4">
          <button
            disabled={paginaActual === 1 || cargando}
            onClick={() => setPaginaActual((p) => p - 1)}
            className="px-3 py-1 bg-blue-600 text-white rounded disabled:opacity-50"
          >
            Anterior
          </button>

          <span className="text-sm">
            Página {paginaActual} de {totalPaginas}
          </span>

          <button
            disabled={paginaActual === totalPaginas || cargando}
            onClick={() => setPaginaActual((p) => p + 1)}
            className="px-3 py-1 bg-blue-600 text-white rounded disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
}
