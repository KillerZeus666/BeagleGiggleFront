export interface Publicacion {
  id: number;
  nombreMascota: string;
  descripcion: string;
  ultimaVezVisto: string;
  foto: string; // base64
  encontrado: boolean;
}
