import DashboardResumen from "@/components/DashboardResumen";

export default function HomePage() {
  return (
    <main
      className="container mx-auto px-6 pt-8 pb-16"
      aria-label="Resumen general del sistema"
    >
      <section aria-labelledby="resumen-heading" className="space-y-6">
        <header>
          <h1
            id="resumen-heading"
            className="text-3xl font-bold tracking-tight"
          >
            Resumen General del Sistema
          </h1>
        </header>

        <DashboardResumen />
      </section>
    </main>
  );
}
