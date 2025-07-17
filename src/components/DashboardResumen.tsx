"use client";

import { useMemo } from "react";
import { useAcciones } from "@/lib/useAcciones";
import { CheckCircle, XCircle, Clock, FileText } from "lucide-react";
import { motion } from "motion/react";

type CardVariant = "default" | "warning" | "success" | "error";

const variantStyles: Record<
  CardVariant,
  { bg: string; text: string; Icon: React.ElementType }
> = {
  default: {
    bg: "bg-white",
    text: "text-gray-900",
    Icon: FileText,
  },
  warning: {
    bg: "bg-yellow-100",
    text: "text-yellow-700",
    Icon: Clock,
  },
  success: {
    bg: "bg-green-100",
    text: "text-green-700",
    Icon: CheckCircle,
  },
  error: {
    bg: "bg-red-100",
    text: "text-red-700",
    Icon: XCircle,
  },
};

function CardResumen({
  label,
  value,
  variant = "default",
}: {
  label: string;
  value: number;
  variant?: CardVariant;
}) {
  const { bg, text, Icon } = variantStyles[variant];

  return (
    <motion.article
      className={`rounded-lg shadow p-4 ${bg}`}
      role="status"
      aria-labelledby={`resumen-${label.toLowerCase().replace(/\s/g, "-")}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="flex justify-between items-start mb-1">
        <h3
          id={`resumen-${label.toLowerCase().replace(/\s/g, "-")}`}
          className={`text-base font-medium ${text}`}
        >
          {label}
        </h3>
        <Icon className={`w-5 h-5 ${text}`} aria-hidden="true" />
      </div>
      <p className={`text-2xl font-bold ${text}`}>{value}</p>
    </motion.article>
  );
}

export default function DashboardResumen() {
  const { acciones } = useAcciones();

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
      className="grid gap-y-6 gap-x-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
      aria-labelledby="resumen-acciones"
      role="region"
    >
      <h2 id="resumen-acciones" className="sr-only">
        Resumen de acciones
      </h2>

      <CardResumen
        label="Total de acciones"
        value={resumen.total}
        variant="default"
      />
      <CardResumen
        label="Pendientes"
        value={resumen.pendientes}
        variant="warning"
      />
      <CardResumen
        label="Aprobadas"
        value={resumen.aprobadas}
        variant="success"
      />
      <CardResumen
        label="Rechazadas"
        value={resumen.rechazadas}
        variant="error"
      />
    </section>
  );
}
