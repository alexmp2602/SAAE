"use client";

import ArchivoImportador from "@/components/ArchivoImportador";

export default function ImportarPage() {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">
        Importar Acciones desde archivo
      </h1>
      <ArchivoImportador />
    </div>
  );
}
