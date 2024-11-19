/*import { Component } from '@angular/core';
import { Pago } from '../../models/pago';
import { CuotaService } from '../../services/cuota.service';
import { Cuota } from '../../models/cuota';
import { Alquiler } from '../../models/alquiler';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LocalService } from '../../services/local.service';
import { Local } from '../../models/local';

@Component({
  selector: 'app-cuota',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './cuota.component.html',
  styleUrl: './cuota.component.css'
})
export class CuotaComponent {

  alquiler!:Alquiler;
  misLocales!: Array<Local>;

  //aquí se almacenaran los adelantos 
  adelantos!: Array<Pago>;
  esAdelanto!:boolean;

  cuota!:Cuota;

  listadoCuotas!:Array<Number>;

  constructor(private cuotaService: CuotaService, 
    private localService: LocalService){
    this.adelantos = new Array<Pago>();
    this.misLocales = new Array<Local>();
    this.listadoCuotas = new Array<Number>();
    this.cargarCuotas();
  }

  //cargo la lista de coutas con el total de meses que durará el alquiler
  cargarCuotas(){
    let i;
    for (i = 1; i <= 12; i++){
      this.listadoCuotas.push(i);
    }
  }

  listadoLocales(){
    this.localService.getLocales().subscribe(
      (data) => {
        this.misLocales = data;
        console.log(this.misLocales);
      },
      (error) => {
        console.error('Error al obtener locales:', error);
      }
    );
  }




}*/
