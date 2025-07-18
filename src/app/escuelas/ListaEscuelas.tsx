"use client";

import { useEffect, useState } from "react";
import { createBrowserSupabaseClient } from "@/lib/supabaseBrowserClient";
import type { Escuela } from "@/lib/types";

type Props = {
  onEdit: (e: Escuela) => void;
  refresh: boolean;
};

const ESCUELAS_POR_PAGINA = 10;

type EscuelaConDistrito = Escuela & {
  distritos: {
    nombre: string;
  } | null;
};

export default function ListaEscuelas({ onEdit, refresh }: Props) {
  const [escuelas, setEscuelas] = useState<EscuelaConDistrito[]>([]);
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
      .select("*, distritos(nombre)", { count: "exact" })
      .order("nombre", { ascending: true })
      .range(desde, hasta);

    if (data) setEscuelas(data as EscuelaConDistrito[]);
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
    <section
      aria-labelledby="lista-escuelas"
      className="max-w-7xl mx-auto mt-8 px-4"
    >
      <h2 id="lista-escuelas" className="sr-only">
        Lista de escuelas registradas
      </h2>

      <div className="overflow-x-auto rounded-md shadow ring-1 ring-gray-200">
        <table className="min-w-full divide-y divide-gray-200 bg-white">
          <thead className="bg-gray-50 text-left text-sm font-semibold text-gray-700">
            <tr>
              <th className="px-4 py-3">Nombre</th>
              <th className="px-4 py-3">Distrito</th>
              <th className="px-4 py-3">CUE</th>
              <th className="px-4 py-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm text-gray-800">
            {escuelas.map((e) => (
              <tr key={e.id}>
                <td className="px-4 py-2 whitespace-nowrap">{e.nombre}</td>
                <td className="px-4 py-2 whitespace-nowrap">
                  {e.distritos?.nombre || "-"}
                </td>
                <td className="px-4 py-2 whitespace-nowrap">{e.cue}</td>
                <td className="px-4 py-2 whitespace-nowrap text-center space-x-2">
                  <button
                    onClick={() => onEdit(e)}
                    className="inline-flex items-center px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md text-xs font-medium transition"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(e.id)}
                    className="inline-flex items-center px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-md text-xs font-medium transition"
                  >
                    Borrar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPaginas > 1 && (
        <nav
          className="flex justify-between items-center mt-6 text-sm"
          aria-label="Paginación de escuelas"
        >
          <button
            disabled={paginaActual === 1 || cargando}
            onClick={() => setPaginaActual((p) => p - 1)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Anterior
          </button>

          <span className="text-gray-600">
            Página {paginaActual} de {totalPaginas}
          </span>

          <button
            disabled={paginaActual === totalPaginas || cargando}
            onClick={() => setPaginaActual((p) => p + 1)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Siguiente
          </button>
        </nav>
      )}
    </section>
  );
}
