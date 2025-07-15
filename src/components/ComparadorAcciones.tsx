type Accion = {
  docente: string;
  escuela: string;
  accion: string;
  puntaje: number;
};

const datosViejos: Accion[] = [
  { docente: "María López", escuela: "Esc. 5", accion: "MAD", puntaje: 8.5 },
  {
    docente: "Javier Gómez",
    escuela: "Esc. 3",
    accion: "Acrecentamiento",
    puntaje: 7.2,
  },
];

const datosNuevos: Accion[] = [
  { docente: "María López", escuela: "Esc. 5", accion: "MAD", puntaje: 9.1 }, // cambio
  {
    docente: "Javier Gómez",
    escuela: "Esc. 3",
    accion: "Acrecentamiento",
    puntaje: 7.2,
  }, // igual
  {
    docente: "Ana Torres",
    escuela: "Esc. 9",
    accion: "Servicio Provisorio",
    puntaje: 6.0,
  }, // nuevo
];

function compararAcciones() {
  return datosNuevos.map((nueva) => {
    const vieja = datosViejos.find((v) => v.docente === nueva.docente);
    return { nueva, vieja };
  });
}

export default function ComparadorAcciones() {
  const comparaciones = compararAcciones();

  return (
    <div className="bg-white shadow rounded-md overflow-hidden">
      <table className="w-full table-auto text-sm">
        <thead className="bg-gray-100 text-left font-medium text-gray-600">
          <tr>
            <th className="p-3">Docente</th>
            <th className="p-3">Escuela</th>
            <th className="p-3">Acción</th>
            <th className="p-3">Puntaje</th>
            <th className="p-3">Diferencia</th>
          </tr>
        </thead>
        <tbody>
          {comparaciones.map(({ nueva, vieja }, idx) => {
            const cambioPuntaje = vieja && nueva.puntaje !== vieja.puntaje;
            const esNuevo = !vieja;

            return (
              <tr
                key={idx}
                className={`border-t ${
                  cambioPuntaje
                    ? "bg-yellow-100"
                    : esNuevo
                    ? "bg-green-100"
                    : ""
                }`}
              >
                <td className="p-3">{nueva.docente}</td>
                <td className="p-3">{nueva.escuela}</td>
                <td className="p-3">{nueva.accion}</td>
                <td className="p-3">{nueva.puntaje}</td>
                <td className="p-3">
                  {esNuevo
                    ? "🆕 Nueva acción"
                    : cambioPuntaje
                    ? `Cambió de ${vieja?.puntaje} a ${nueva.puntaje}`
                    : "Sin cambios"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
