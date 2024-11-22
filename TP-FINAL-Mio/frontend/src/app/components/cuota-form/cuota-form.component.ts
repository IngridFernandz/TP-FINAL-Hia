import { Component } from '@angular/core';
import { CuotaService } from '../../services/cuota.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Alquiler } from '../../models/alquiler';
import { Cuota } from '../../models/cuota';

@Component({
  selector: 'app-cuota-form',
  standalone: true,
  imports: [],
  templateUrl: './cuota-form.component.html',
  styleUrl: './cuota-form.component.css'
})
export class CuotaFormComponent {

  accion: string = "";

  alquiler!: Alquiler;
  cuota!: Cuota;
  
  constructor(private cuotaService: CuotaService, private router: Router,
    private activatedRoute: ActivatedRoute){

      this.cuota = new Cuota();
    }

  //crear cuota
  public crearCuota(){
    this.cuota.alquiler = this.alquiler;
    //this.cuota.mes = this.alquiler.plazoMeses
    
  }
  
  //consultar cuota
  public consultarCuota(){
    this.cuotaService.getCuota(this.cuota._id).subscribe(
      data=>{
        console.log(data);
      },
      error=>{
        console.error(error);
      }
    );
  }

}
