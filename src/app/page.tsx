import DashboardResumen from "@/components/DashboardResumen";

export default function HomePage() {
  return (
    <section className="max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Resumen General</h2>
      <DashboardResumen />
    </section>
  );
}
