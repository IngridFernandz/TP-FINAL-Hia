import { Component } from '@angular/core';
import { PagoService } from '../../services/pago.service';
import { Pago } from '../../models/pago';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagos.component.html',
  styleUrl: './pagos.component.css'
})
export class PagosComponent {

  /*misPagos!:Array<Pago>;
  //pago!:Pago;

  constructor(private pagoService:PagoService){
    this.misPagos = new Array<Pago>();
    //this.pago = new Pago();
    this.cargarPagos();
  }

  cargarPagos(){
    this.pagoService.getPagos().subscribe(
      data => {
        console.log(data);
        this.misPagos = data;
      },
      error => {
        console.log(error);
      }
    );
    //this.misPagos = new Array<Pago>();

    
  }*/

}
