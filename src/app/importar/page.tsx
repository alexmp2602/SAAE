// src/app/importar/page.tsx
import { createServerSupabaseClient } from "@/lib/supabaseServerClient";
import ImportarPageClient from "@/app/importar/ImportarPageClient";
import type { ParsedAccion } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function ImportarPage() {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase.from("acciones").select("*");

  if (error || !data) {
    console.error("Error al obtener acciones:", error?.message);
    return (
      <main className="max-w-5xl mx-auto px-6 pt-6 pb-12 space-y-4">
        <h1 className="text-3xl font-semibold text-red-700">
          Error al cargar las acciones existentes
        </h1>
        <p className="text-sm text-gray-600">
          Por favor, intentá nuevamente más tarde o contactá al soporte si el
          problema persiste.
        </p>
      </main>
    );
  }

  // Convertimos las acciones agregando el flag `duplicado`
  const accionesExistentes: ParsedAccion[] = data.map((accion) => ({
    ...accion,
    duplicado: false,
  }));

  return <ImportarPageClient accionesExistentes={accionesExistentes} />;
}
