"use client";

import { useState } from "react";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import { CheckCircle, XCircle } from "lucide-react";
import { motion } from "motion/react";
import { AnimatePresence } from "motion/react";
import DropFileInput from "./DropFileInput";
import { createBrowserSupabaseClient } from "@/lib/supabaseBrowserClient";
import type { AccionAInsertar, ParsedAccion } from "@/lib/types";

type Props = {
  accionesExistentes: ParsedAccion[];
  onImportar: (nuevas: AccionAInsertar[]) => void;
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

  const handleFile = (file: File) => {
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
    const supabase = createBrowserSupabaseClient();

    const { data: escuelas, error: errorEscuelas } = await supabase
      .from("escuelas")
      .select("id, nombre");

    if (errorEscuelas || !escuelas) {
      setMensaje("❌ No se pudo obtener la lista de escuelas.");
      return;
    }

    const nuevas: AccionAInsertar[] = [];

    for (const accion of acciones.filter((a) => !a.duplicado)) {
      const escuela = escuelas.find(
        (e) =>
          e.nombre.trim().toLowerCase() === accion.escuela.trim().toLowerCase()
      );

      if (!escuela) {
        console.warn("Escuela no encontrada:", accion.escuela);
        continue;
      }

      nuevas.push({
        docente: accion.docente,
        accion: accion.accion,
        escuela_id: escuela.id,
        fecha: accion.fecha,
        puntaje: accion.puntaje,
        estado: "pendiente",
      });
    }

    if (nuevas.length === 0) {
      setMensaje("❌ No se encontraron acciones válidas para importar.");
      return;
    }

    const { data, error } = await supabase
      .from("acciones")
      .insert(nuevas)
      .select();

    if (error) {
      setMensaje("❌ Error al importar acciones: " + error.message);
      return;
    }

    setMensaje(
      `✅ Se importaron ${data?.length || nuevas.length} nuevas acciones. ${
        acciones.length - nuevas.length
      } fueron omitidas.`
    );

    setAcciones([]);
    onImportar(nuevas);
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md p-6 space-y-6 border border-gray-200"
      role="region"
      aria-labelledby="importar-archivo"
    >
      <h2 id="importar-archivo" className="text-xl font-semibold text-gray-800">
        Subir archivo de acciones
      </h2>

      <DropFileInput onFileSelect={handleFile} />

      {acciones.length > 0 && (
        <motion.section
          className="space-y-4"
          aria-labelledby="tabla-previa"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <h3 id="tabla-previa" className="text-lg font-medium text-gray-800">
            Acciones detectadas
          </h3>

          <div className="overflow-x-auto border rounded-md">
            <table
              className="min-w-full text-sm text-gray-800"
              role="table"
              aria-label="Tabla con acciones importadas"
            >
              <thead className="bg-gray-100 border-b text-left">
                <tr>
                  <th className="px-4 py-2">Docente</th>
                  <th className="px-4 py-2">Acción</th>
                  <th className="px-4 py-2">Escuela</th>
                  <th className="px-4 py-2">Fecha</th>
                  <th className="px-4 py-2">Puntaje</th>
                  <th className="px-4 py-2">Duplicado</th>
                </tr>
              </thead>
              <tbody>
                {acciones.map((a, idx) => (
                  <tr
                    key={idx}
                    className={`${
                      a.duplicado
                        ? "bg-red-50 text-red-700"
                        : "bg-white hover:bg-gray-50"
                    }`}
                  >
                    <td className="px-4 py-2">{a.docente}</td>
                    <td className="px-4 py-2">{a.accion}</td>
                    <td className="px-4 py-2">{a.escuela}</td>
                    <td className="px-4 py-2">{a.fecha}</td>
                    <td className="px-4 py-2">{a.puntaje}</td>
                    <td className="px-4 py-2">
                      <span className="inline-flex items-center gap-1">
                        {a.duplicado ? (
                          <>
                            <XCircle className="w-4 h-4 text-red-500" />
                            Sí
                          </>
                        ) : (
                          <>
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            No
                          </>
                        )}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end">
            <button
              onClick={importarAcciones}
              className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              Importar nuevas acciones
            </button>
          </div>
        </motion.section>
      )}

      <AnimatePresence>
        {mensaje && (
          <motion.div
            key="mensaje"
            role="status"
            className={`text-sm px-4 py-2 rounded font-medium ${
              mensaje.startsWith("✅")
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-700"
            }`}
            aria-live="polite"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {mensaje}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
