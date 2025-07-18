import DashboardResumen from "@/components/DashboardResumen";

export default function HomePage() {
  return (
    <main
      className="max-w-7xl mx-auto px-6 pt-10 pb-16"
      aria-label="Resumen general del sistema"
    >
      <section
        aria-labelledby="resumen-heading"
        className="space-y-8 sm:space-y-10"
      >
        <header>
          <h1
            id="resumen-heading"
            className="text-2xl sm:text-3xl font-semibold tracking-tight text-gray-900"
          >
            Resumen general del sistema
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-600">
            Accedé a un vistazo rápido del estado actual de las acciones
            estatutarias y actividad por escuela.
          </p>
        </header>

        <DashboardResumen />
      </section>
    </main>
  );
}
