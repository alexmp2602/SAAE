// Estados posibles para una acción
export type EstadoAccion = "pendiente" | "aprobada" | "rechazada";

// Modelo base de Escuela
export type Escuela = {
  id: string; // UUID generado por Supabase
  created_at: string;
  nombre: string;
  region: string;
  distrito: string;
  cue: string;
  activo: boolean;
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
  escuelas: Escuela; // resultado del join: escuelas(*)
};

// Acción sin campos generados por el sistema (para edición)
export type AccionSinID = Omit<Accion, "id" | "created_at" | "estado">;

// Acción a insertar en Supabase (sin ID ni created_at)
export type AccionAInsertar = Omit<Accion, "id" | "created_at">;

// Acción nueva parseada desde CSV o carga manual (solo texto)
export type ParsedAccion = {
  docente: string;
  accion: string;
  escuela: string; // nombre visible, luego se convierte a escuela_id
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
  escuela: string; // nombre legible (para el select)
  escuela_id?: string; // ID real de Supabase (relación)
};

// Acción usada para carga directa básica (sin control de IDs)
export type NuevaAccion = {
  docente: string;
  accion: string;
  escuela: string;
  fecha: string;
  puntaje: number;
};
