"use client";

import { useState, ChangeEvent } from "react";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import { createBrowserSupabaseClient } from "@/lib/supabaseBrowserClient";
import type { AccionSinID, ParsedAccion } from "@/lib/types";
import type { Accion } from "@/lib/types";

type Props = {
  accionesExistentes: ParsedAccion[];
  onImportar: (nuevas: AccionSinID[]) => void;
};

export default function ArchivoImportador({
  accionesExistentes,
  onImportar,
}: Props) {
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
    const nuevas = acciones
      .filter((a) => !a.duplicado)
      .map(
        (a): AccionSinID => ({
          docente: a.docente,
          accion: a.accion,
          escuela: a.escuela,
          fecha: a.fecha,
          puntaje: a.puntaje,
          estado: "pendiente",
        })
      );

    const res = await createBrowserSupabaseClient().from("acciones").insert(nuevas).select();

    const data = res.data as Accion[] | null;
    const error = res.error;

    if (error) {
      setMensaje("❌ Error al importar acciones: " + error.message);
      return;
    }

    setMensaje(
      `✅ Se importaron ${data?.length || nuevas.length} nuevas acciones. ${
        acciones.length - nuevas.length
      } duplicadas fueron ignoradas.`
    );
    setAcciones([]);
    onImportar(nuevas); // Notificamos al componente padre
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-6 border border-gray-200">
      <input
        type="file"
        accept=".csv, .xlsx"
        onChange={handleFileUpload}
        className="block w-full text-sm text-gray-700 border border-gray-300 rounded cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      />

      {acciones.length > 0 && (
        <div className="flex justify-end">
          <button
            onClick={importarAcciones}
            className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition-colors"
          >
            Importar nuevas acciones
          </button>
        </div>
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
