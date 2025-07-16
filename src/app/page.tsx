import DashboardResumen from "@/components/DashboardResumen";

export default function HomePage() {
  return (
    <main
      className="container mx-auto px-6 pt-8 pb-16"
      aria-label="Resumen general del sistema"
    >
      <section>
        <h1 className="text-3xl font-bold tracking-tight mb-6">
          Resumen General
        </h1>
        <DashboardResumen />
      </section>
    </main>
  );
}
