import DashboardResumen from "@/components/DashboardResumen";

export default function HomePage() {
  return (
    <main
      className="max-w-5xl mx-auto px-6 pt-6 pb-12"
      aria-label="Resumen general del sistema"
    >
      <h1 className="text-3xl font-semibold mb-8">Resumen General</h1>
      <DashboardResumen />
    </main>
  );
}
