import { VeterinarioCL } from './veterinario-cl';
import { MascotaCL } from './mascota-cl';
import { ServicioCL } from './servicio-cl';
import { TratamientoMedicamentoCL } from './tratamiento-medicamento-cl';

export class TratamientoCL {
  public idTratamiento: number;
  public codigo: string;
  public fecha: Date;
  public detalles: string;
  public veterinario?: VeterinarioCL;
  public mascota?: MascotaCL;
  public servicio?: ServicioCL;
  public tratamientoMedicamentos?: TratamientoMedicamentoCL[];

  constructor(
    idTratamiento: number = 0,
    codigo: string = '',
    fecha: Date = new Date(),
    detalles: string = '',
    veterinario?: VeterinarioCL,
    mascota?: MascotaCL,
    servicio?: ServicioCL,
    tratamientoMedicamentos?: TratamientoMedicamentoCL[]
  ) {
    this.idTratamiento = idTratamiento;
    this.codigo = codigo;
    this.fecha = fecha;
    this.detalles = detalles;
    this.veterinario = veterinario;
    this.mascota = mascota;
    this.servicio = servicio;
    this.tratamientoMedicamentos = tratamientoMedicamentos;
  }

  public static fromBackendData(data: any): TratamientoCL {
    return new TratamientoCL(
      data.idTratamiento,
      data.codigo,
      new Date(data.fecha),
      data.detalles,
      data.veterinario
        ? VeterinarioCL.fromBackendData(data.veterinario)
        : undefined,
      data.mascota ? MascotaCL.fromBackendData(data.mascota) : undefined,
      data.servicio ? ServicioCL.fromBackendData(data.servicio) : undefined,
      data.tratamientoMedicamentos?.map((m: any) =>
        TratamientoMedicamentoCL.fromBackendData(m)
      )
    );
  }

  public toBackendFormat(): any {
    return {
      idTratamiento: this.idTratamiento,
      codigo: this.codigo,
      fecha: this.fecha.toISOString().split('T')[0],
      detalles: this.detalles,
      veterinario: this.veterinario?.idVeterinario,
      mascota: this.mascota?.idMascota,
      servicio: this.servicio?.idServicio,
      tratamientoMedicamentos: this.tratamientoMedicamentos?.map((m) =>
        m.toBackendFormat()
      ),
    };
  }
}