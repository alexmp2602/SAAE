export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      acciones: {
        Row: {
          id: number;
          docente: string;
          escuela: string;
          accion: string;
          fecha: string; // formato YYYY-MM-DD
          puntaje: number;
          estado: "pendiente" | "aprobada" | "rechazada";
          created_at: string; // timestamp ISO
        };
        Insert: {
          docente: string;
          escuela: string;
          accion: string;
          fecha: string;
          puntaje: number;
          estado?: "pendiente" | "aprobada" | "rechazada";
          created_at?: string;
        };
        Update: {
          docente?: string;
          escuela?: string;
          accion?: string;
          fecha?: string;
          puntaje?: number;
          estado?: "pendiente" | "aprobada" | "rechazada";
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
