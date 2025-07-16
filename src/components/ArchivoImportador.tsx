"use client";

import { ChangeEvent, useState } from "react";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import { useAcciones } from "@/lib/useAcciones";
import type { AccionSinID, ParsedAccion } from "@/lib/types";

export default function ArchivoImportador({
  onProcesar,
}: {
  onProcesar: (acciones: ParsedAccion[]) => void;
}) {
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
      onProcesar(transformados); // enviar al padre
      setMensaje(
        `✅ Se detectaron ${
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
      const accionSinID: AccionSinID = {
        docente: a.docente,
        accion: a.accion,
        escuela: a.escuela,
        fecha: a.fecha,
        puntaje: a.puntaje,
        estado: "pendiente",
      };

      // Proveer valores dummy para id y created_at para cumplir con el tipo Accion
      const accionCompleta = {
        ...accionSinID,
        id: 0, // El ID será generado por la base de datos
        created_at: new Date().toISOString(),
      };

      const ok = await agregarAccion(accionCompleta);
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
        <label
          htmlFor="file-upload"
          className="relative cursor-pointer w-full flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 text-gray-600 hover:border-blue-400 hover:bg-blue-50 transition"
        >
          <svg
            className="w-10 h-10 mb-2 text-blue-500"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 15a4 4 0 01.88-7.91A4.5 4.5 0 0112 6v0a4.5 4.5 0 013.12 1.09A4 4 0 1121 15h-1"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 12v9m0 0l-3-3m3 3l3-3"
            />
          </svg>
          <span className="text-sm">
            Arrastrá un archivo o hacé clic para subir
          </span>
          <span className="text-xs text-gray-400">(Formato .csv o .xlsx)</span>
          <input
            id="file-upload"
            type="file"
            accept=".csv, .xlsx"
            onChange={handleFileUpload}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </label>
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
