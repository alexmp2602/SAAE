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
        className="max-w-5xl mx-auto px-6 pt-8 pb-12 space-y-4"
        role="alert"
        aria-live="assertive"
      >
        <h1 className="text-2xl font-bold text-red-700">
          Error al cargar acciones
        </h1>
        <p className="text-base text-neutral-700">
          Ocurrió un problema al acceder a la base de datos. Por favor, intentá
          nuevamente más tarde o contactá al equipo de soporte.
        </p>

        {process.env.NODE_ENV === "development" && error?.message && (
          <pre className="text-sm text-red-600 bg-red-50 border border-red-200 p-4 rounded whitespace-pre-wrap">
            {error.message}
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
