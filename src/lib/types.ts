export type EstadoAccion = "pendiente" | "aprobada" | "rechazada";

export type Accion = {
  id: number;
  docente: string;
  accion: string;
  escuela: string;
  fecha: string;
  puntaje: number;
  estado: EstadoAccion;
  created_at: string;
};

export type AccionSinID = Omit<Accion, "id" | "created_at">;

export type ParsedAccion = {
  docente: string;
  accion: string;
  escuela: string;
  fecha: string;
  puntaje: number;
  duplicado: boolean;
};

export type NuevaAccion = {
  docente: string;
  accion: string;
  escuela: string;
  fecha: string;
  puntaje: number;
};
