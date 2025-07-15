"use client";

import { ChangeEvent, useState } from "react";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import { useAcciones } from "@/lib/useAcciones";

type ParsedAccion = {
  docente: string;
  accion: string;
  escuela: string;
  fecha: string;
  puntaje: number;
  duplicado: boolean;
};

export default function ArchivoImportador() {
  const { acciones: accionesExistentes, agregarAccion } = useAcciones();
  const [acciones, setAcciones] = useState<ParsedAccion[]>([]);
  const [mensaje, setMensaje] = useState("");

  const procesarDatos = (datos: Record<string, string>[]) => {
    try {
      const transformados: ParsedAccion[] = datos.map((row) => {
        const accionLimpia = {
          docente: row["Docente"]?.trim(),
          accion: row["Acción"]?.trim(),
          escuela: row["Escuela"]?.trim(),
          fecha: row["Fecha"]?.trim(),
          puntaje: parseFloat(row["Puntaje"]),
        };

        const esDuplicado = accionesExistentes.some(
          (existente) =>
            existente.docente === accionLimpia.docente &&
            existente.accion === accionLimpia.accion &&
            existente.escuela === accionLimpia.escuela &&
            existente.fecha === accionLimpia.fecha
        );

        return {
          ...accionLimpia,
          duplicado: esDuplicado,
        };
      });

      setAcciones(transformados);
      setMensaje(
        `Se detectaron ${
          transformados.filter((a) => !a.duplicado).length
        } nuevas acciones.`
      );
    } catch {
      setMensaje("❌ Error al procesar los datos.");
    }
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const extension = file.name.split(".").pop()?.toLowerCase();

    if (extension === "csv") {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          procesarDatos(result.data as Record<string, string>[]);
        },
      });
    } else if (extension === "xlsx") {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const data = new Uint8Array(evt.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const json = XLSX.utils.sheet_to_json(sheet) as Record<
          string,
          string
        >[];
        procesarDatos(json);
      };
      reader.readAsArrayBuffer(file);
    } else {
      setMensaje("❌ Formato no soportado. Usá .csv o .xlsx");
    }
  };

  const importarAcciones = async () => {
    const nuevas = acciones.filter((a) => !a.duplicado);
    let exitos = 0;

    for (const a of nuevas) {
      const ok = await agregarAccion({
        ...a,
        estado: "pendiente",
      });
      if (ok) exitos++;
    }

    setMensaje(
      `✅ Se importaron ${exitos} nuevas acciones. ${
        acciones.length - exitos
      } duplicadas fueron ignoradas.`
    );
    setAcciones([]);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-6 border border-gray-200">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Subí un archivo{" "}
          <span className="text-gray-500 text-xs">(CSV o Excel)</span>
        </label>
        <input
          type="file"
          accept=".csv, .xlsx"
          onChange={handleFileUpload}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {acciones.length > 0 && (
        <>
          <div className="overflow-auto border rounded-md">
            <table className="min-w-full text-sm border-collapse">
              <thead className="bg-gray-50 text-gray-700 font-medium">
                <tr>
                  <th className="px-4 py-2 text-left">Docente</th>
                  <th className="px-4 py-2 text-left">Acción</th>
                  <th className="px-4 py-2 text-left">Escuela</th>
                  <th className="px-4 py-2 text-left">Fecha</th>
                  <th className="px-4 py-2 text-left">Puntaje</th>
                  <th className="px-4 py-2 text-left">Estado</th>
                </tr>
              </thead>
              <tbody>
                {acciones.map((a, i) => (
                  <tr
                    key={i}
                    className={`border-t ${
                      a.duplicado ? "bg-red-50" : "bg-green-50"
                    }`}
                  >
                    <td className="px-4 py-2">{a.docente}</td>
                    <td className="px-4 py-2">{a.accion}</td>
                    <td className="px-4 py-2">{a.escuela}</td>
                    <td className="px-4 py-2">{a.fecha}</td>
                    <td className="px-4 py-2">{a.puntaje}</td>
                    <td className="px-4 py-2">
                      {a.duplicado ? (
                        <span className="text-sm text-red-600 font-semibold">
                          Duplicado
                        </span>
                      ) : (
                        <span className="text-sm text-green-700 font-semibold">
                          Nuevo
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end">
            <button
              onClick={importarAcciones}
              className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition-colors"
            >
              Importar nuevas acciones
            </button>
          </div>
        </>
      )}

      {mensaje && (
        <div
          className={`text-sm px-4 py-2 rounded ${
            mensaje.startsWith("✅")
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-700"
          }`}
        >
          {mensaje}
        </div>
      )}
    </div>
  );
}
