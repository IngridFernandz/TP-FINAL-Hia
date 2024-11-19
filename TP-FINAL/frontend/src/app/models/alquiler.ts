import { Local } from "./local";
import { Propietario } from "./propietario";

export class Alquiler {
  _id!: string;
  plazoMeses: number;
  costoalquiler: number;
  fecha: Date | string;
  local: Local;
  propietario: Propietario;

  constructor() {
      this.plazoMeses = 0;
      this.costoalquiler = 0;
      this.fecha = new Date();
      this.local = new Local(); 
      this.propietario = new Propietario(); 
  }
}
