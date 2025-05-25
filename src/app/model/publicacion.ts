export interface Publicacion {
  id: number;
  nombreMascota: string;
  descripcion: string;
  ultimaVezVisto: string;
  foto: string;
  tipo: 'busqueda' | 'hallazgo'; // NUEVO
  encontrado: boolean;
}
