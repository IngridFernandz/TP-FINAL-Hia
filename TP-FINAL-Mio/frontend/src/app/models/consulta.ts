export class Consulta {
  _id!: string;
  nombreCompleto: string;
  email: string;
  consulta: string;
  estado: boolean;

  constructor(
    _id: string = '',
    nombreCompleto: string = '',
    consulta: string = '',
    email: string = '',
    estado: boolean = false
  ) {
    this._id = _id;
    this.nombreCompleto = nombreCompleto;
    this.email = email;
    this.consulta = consulta;
    this.estado = estado;
  }
}
