import { Component } from '@angular/core';
import { AlquilerService } from '../../services/alquiler.service';
import { Router, RouterModule } from '@angular/router';
import { Alquiler } from '../../models/alquiler';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PropietarioService } from '../../services/propietario.service';
import { LocalService } from '../../services/local.service';
import { Propietario } from '../../models/propietario';
import { Local } from '../../models/local';
import { CuotaService } from '../../services/cuota.service';
import { Cuota } from '../../models/cuota';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alquiler-create',
  standalone: true,
  imports: [RouterModule,CommonModule,FormsModule],
  templateUrl: './alquiler-create.component.html',
  styleUrl: './alquiler-create.component.css'
})
export class AlquilerCreateComponent {
  alquiler: Alquiler = new Alquiler();
  locales: Local[] = [];
  propietarios: Propietario[] = [];

  constructor(
    private alquilerService: AlquilerService,
    private localService: LocalService,
    private propietarioService: PropietarioService,
private cuotaService: CuotaService
  ) { 
    this.getLocales();

  }

  ngOnInit(): void {
    this.getLocales();
    this.getPropietarios();
  }
//Obtuve los locales Disponibles-Cambio 
  getLocales() {
    this.localService.getLocalesbyAlquilado(false).subscribe(
      (result) => {
        this.locales = result;
      },
      (error) => {
        console.error('Error obteniendo locales:', error);
      }
    );
  }

  getPropietarios() {
    this.propietarioService.getPropietarios().subscribe(
      (result) => {
        this.propietarios = result;
      },
      (error) => {
        console.error('Error obteniendo propietarios:', error);
      }
    );
  }

  crearAlquiler() {
    this.alquilerService.createAlquiler(this.alquiler).subscribe(
      (result) => {
        this.alquiler=result.newAlquiler;
        this.AlquilarLocal(this.alquiler._id,true);
        this.crearCuotas();
        console.log('Alquiler creado exitosamente:', result);
        Swal.fire({
          text: 'registro con exito',
          icon: 'success'
        })
        this.getLocales();

      },
      (error) => {
        console.error('Error al crear alquiler:', error);
      }
    );
  }
  crearCuotas() {
    const montoCuota = this.alquiler.costoalquiler / this.alquiler.plazoMeses;
    for (let i = 1; i <= this.alquiler.plazoMeses; i++) {
      const cuota = new Cuota("Pendiente", montoCuota,  { _id: this.alquiler._id } as Alquiler, i, i);
      this.cuotaService.createCuota(cuota).subscribe(
        (result) => {
          console.log('Cuota creada exitosamente:', result);
          Swal.fire({
            text: 'cuota creada con exito',
            icon: 'success'
          })
        },
        (error) => {
          console.error('Error al crear cuota:', error);
        }
      );
    }
     this.ObtnerCuotasByID();
  }
  cuotas: Cuota[] = [];
  ObtnerCuotasByID(){
    this.cuotaService.getCuotasAlquiler(this.alquiler._id).subscribe(
      (data:any) => {
        this.cuotas = data;  
      },
      (error) => {
        console.error('Error al obtener cuotas:', error);
    
      }
    );}
  
  AlquilarLocal(id:string,estado:boolean){
    this.localService.cambiarEstado(id,estado).subscribe(
      (data: any) => {
        alert("Local Alquilado")
      },
      error => {
        console.log(error);
      }

    );
  }


}
