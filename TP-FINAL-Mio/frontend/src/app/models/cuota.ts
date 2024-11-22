import { Alquiler } from "./alquiler";
import { Pago } from "./pago";

export class Cuota {
    _id!: string;
  alquiler!: Alquiler;
  mes!: number;
  monto!: number;
  nroCuota!: number;
  adelantos!: Array<Pago>;
  estado!: string;
  /*constructor(estado: string, monto: number, alquiler: Alquiler, nroCuota: number, mes: number) {
    this.estado = estado;
    this.monto = monto;
    this.alquiler = alquiler;
    this.nroCuota = nroCuota;
    this.mes = mes;
    this.adelantos = [];
  }*/
    constructor(estado?: string, monto?: number, alquiler?: Alquiler, nroCuota?: number, mes?: number) {
      this.estado = estado || '';
      this.monto = monto || 0;
      this.alquiler = alquiler || {} as Alquiler;
      this.nroCuota = nroCuota || 0;
      this.mes = mes || 0;
      this.adelantos = [];
    }
}
