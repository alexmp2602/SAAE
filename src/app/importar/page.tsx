import { createServerSupabaseClient } from "@/lib/supabaseServerClient";
import ImportarPageClient from "@/components/ImportarPageClient";

export const dynamic = "force-dynamic";

export default async function ImportarPage() {
  const supabase = await createServerSupabaseClient();
  const { data: accionesExistentes, error } = await supabase
    .from("acciones")
    .select("*");

  if (error || !accionesExistentes) {
    console.error("Error al obtener acciones:", error?.message);
    return (
      <main className="max-w-5xl mx-auto px-6 pt-6 pb-12 space-y-10">
        <h1 className="text-3xl font-semibold mb-4">
          Error al cargar las acciones existentes
        </h1>
      </main>
    );
  }

  return <ImportarPageClient accionesExistentes={accionesExistentes} />;
}
