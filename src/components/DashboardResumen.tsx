"use client";

import { useEffect, useState } from "react";

type Accion = {
  id: number;
  docente: string;
  accion: string;
  escuela: string;
  puntaje: number;
  estado: "pendiente" | "aprobada" | "rechazada";
};

const ACCIONES_KEY = "acciones-aprobaciones";

export default function DashboardResumen() {
  const [acciones, setAcciones] = useState<Accion[]>([]);

  useEffect(() => {
    const datosGuardados = localStorage.getItem(ACCIONES_KEY);
    if (datosGuardados) {
      setAcciones(JSON.parse(datosGuardados));
    }
  }, []);

  const total = acciones.length;
  const pendientes = acciones.filter((a) => a.estado === "pendiente").length;
  const aprobadas = acciones.filter((a) => a.estado === "aprobada").length;
  const rechazadas = acciones.filter((a) => a.estado === "rechazada").length;

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      <div className="bg-white shadow rounded p-4">
        <p className="text-gray-600 text-sm">Total de acciones</p>
        <p className="text-2xl font-bold">{total}</p>
      </div>
      <div className="bg-yellow-100 shadow rounded p-4">
        <p className="text-gray-700 text-sm">Pendientes</p>
        <p className="text-2xl font-bold text-yellow-700">{pendientes}</p>
      </div>
      <div className="bg-green-100 shadow rounded p-4">
        <p className="text-gray-700 text-sm">Aprobadas</p>
        <p className="text-2xl font-bold text-green-700">{aprobadas}</p>
      </div>
      <div className="bg-red-100 shadow rounded p-4">
        <p className="text-gray-700 text-sm">Rechazadas</p>
        <p className="text-2xl font-bold text-red-700">{rechazadas}</p>
      </div>
    </div>
  );
}
