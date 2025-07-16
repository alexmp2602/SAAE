import type { Accion } from "@/lib/types";

type Props = {
  acciones: Accion[];
  onEditar: (accion: Accion) => void;
  onEliminar: (id: number) => void;
};

export default function ListaRecientes({
  acciones,
  onEditar,
  onEliminar,
}: Props) {
  return (
    <section className="mt-10">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Acciones recientes
      </h2>

      <div className="overflow-auto rounded-md border border-gray-300">
        <table className="min-w-full text-sm text-left border-collapse">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2">Docente</th>
              <th className="px-4 py-2">Acción</th>
              <th className="px-4 py-2">Escuela</th>
              <th className="px-4 py-2">Fecha</th>
              <th className="px-4 py-2">Puntaje</th>
              <th className="px-4 py-2">Opciones</th>
            </tr>
          </thead>
          <tbody>
            {acciones.map((a) => (
              <tr
                key={a.id}
                className="border-t hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-2 whitespace-nowrap">{a.docente}</td>
                <td className="px-4 py-2 whitespace-nowrap">{a.accion}</td>
                <td className="px-4 py-2 whitespace-nowrap">{a.escuela}</td>
                <td className="px-4 py-2 whitespace-nowrap">{a.fecha}</td>
                <td className="px-4 py-2 whitespace-nowrap">{a.puntaje}</td>
                <td className="px-4 py-2">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => onEditar(a)}
                      className="text-blue-600 hover:underline focus:outline-none"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => onEliminar(a.id)}
                      className="text-red-600 hover:underline focus:outline-none"
                    >
                      Borrar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
