// Estados posibles para una acción
export type EstadoAccion = "pendiente" | "aprobada" | "rechazada";

// Modelo base de Escuela
export type Escuela = {
  id: string;
  created_at: string;
  nombre: string;
  cue: string;
  distrito_id: string;
  activo: boolean;
};

// Escuela con join a distritos (para mostrar el nombre legible)
export type EscuelaConDistrito = Escuela & {
  distritos: {
    nombre: string;
  } | null;
};

// Acción completa almacenada en la base de datos
export type Accion = {
  id: number;
  docente: string;
  accion: string;
  fecha: string;
  puntaje: number;
  estado: EstadoAccion;
  created_at: string;
  escuela_id: string;
};

// Acción unida con la tabla de escuelas (join)
export type AccionConEscuela = Accion & {
  escuelas: Escuela;
};

// Acción sin campos generados por el sistema (para edición)
export type AccionSinID = Omit<Accion, "id" | "created_at" | "estado">;

// Acción a insertar en Supabase (sin ID ni created_at)
export type AccionAInsertar = Omit<Accion, "id" | "created_at">;

// Acción nueva parseada desde CSV o carga manual (solo texto)
export type ParsedAccion = {
  docente: string;
  accion: string;
  escuela: string;
  fecha: string;
  puntaje: number;
  duplicado: boolean;
};

// Acción utilizada en formularios con campos auxiliares
export type AccionForm = {
  docente: string;
  accion: string;
  fecha: string;
  puntaje: number;
  escuela: string;
  escuela_id?: string;
};

// Acción usada para carga directa básica (sin control de IDs)
export type NuevaAccion = {
  docente: string;
  accion: string;
  escuela: string;
  fecha: string;
  puntaje: number;
};
