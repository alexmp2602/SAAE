"use client";

import { useEffect, useMemo, useState } from "react";

type Accion = {
  id: number;
  docente: string;
  accion: string;
  escuela: string;
  puntaje: number;
  estado: "pendiente" | "aprobada" | "rechazada";
};

const ACCIONES_KEY = "acciones-aprobaciones";

const CardResumen = ({
  label,
  value,
  bg,
  text,
}: {
  label: string;
  value: number;
  bg: string;
  text: string;
}) => (
  <div
    className={`rounded-lg shadow p-4 ${bg}`}
    aria-label={`${label}: ${value}`}
  >
    <p className="text-sm text-gray-700">{label}</p>
    <p className={`text-3xl font-bold ${text}`}>{value}</p>
  </div>
);

export default function DashboardResumen() {
  const [acciones, setAcciones] = useState<Accion[]>([]);

  useEffect(() => {
    const datosGuardados = localStorage.getItem(ACCIONES_KEY);
    if (datosGuardados) {
      setAcciones(JSON.parse(datosGuardados));
    }
  }, []);

  const resumen = useMemo(() => {
    return {
      total: acciones.length,
      pendientes: acciones.filter((a) => a.estado === "pendiente").length,
      aprobadas: acciones.filter((a) => a.estado === "aprobada").length,
      rechazadas: acciones.filter((a) => a.estado === "rechazada").length,
    };
  }, [acciones]);

  return (
    <section
      className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
      aria-label="Resumen de acciones"
    >
      <CardResumen
        label="Total de acciones"
        value={resumen.total}
        bg="bg-white"
        text="text-gray-900"
      />
      <CardResumen
        label="Pendientes"
        value={resumen.pendientes}
        bg="bg-yellow-100"
        text="text-yellow-700"
      />
      <CardResumen
        label="Aprobadas"
        value={resumen.aprobadas}
        bg="bg-green-100"
        text="text-green-700"
      />
      <CardResumen
        label="Rechazadas"
        value={resumen.rechazadas}
        bg="bg-red-100"
        text="text-red-700"
      />
    </section>
  );
}
