import { createServerSupabaseClient } from "@/lib/supabaseServerClient";
import ImportarPageClient from "@/app/importar/ImportarPageClient";
import type { ParsedAccion } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function ImportarPage() {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase.from("acciones").select("*");

  if (error || !data) {
    console.error(
      "🔴 Error al obtener acciones desde Supabase:",
      error?.message
    );

    return (
      <main
        className="max-w-5xl mx-auto px-6 pt-6 pb-12 space-y-4"
        role="alert"
        aria-live="assertive"
      >
        <h1 className="text-2xl font-semibold text-red-700">
          No se pudieron cargar las acciones
        </h1>
        <p className="text-base text-gray-700">
          Ocurrió un error al intentar acceder a la base de datos. Por favor,
          intentá nuevamente más tarde o contactá al soporte.
        </p>
        {process.env.NODE_ENV === "development" && (
          <pre className="text-sm text-red-500 bg-red-50 border border-red-200 p-3 rounded">
            {error?.message}
          </pre>
        )}
      </main>
    );
  }

  const accionesExistentes: ParsedAccion[] = data.map((accion) => ({
    ...accion,
    duplicado: false,
  }));

  return <ImportarPageClient accionesExistentes={accionesExistentes} />;
}
