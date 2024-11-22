import { Component, OnInit } from '@angular/core';
import { Alquiler } from '../../models/alquiler';
import { AlquilerService } from '../../services/alquiler.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Propietario } from '../../models/propietario';
import { Local } from '../../models/local';
import { LocalService } from '../../services/local.service';
import { PropietarioService } from '../../services/propietario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alquiler-edit',
  standalone: true,
  imports: [FormsModule,RouterModule,CommonModule],
  templateUrl: './alquiler-edit.component.html',
  styleUrl: './alquiler-edit.component.css'
})
export class AlquilerEditComponent implements OnInit{
  alquiler: Alquiler;
  locales: Local[] = []; // Inicializamos como arreglo vacío
  propietarios: Propietario[] = []; // Inicializamos como arreglo vacío

  constructor(
    private route: ActivatedRoute,
    private alquilerService: AlquilerService,
    private router: Router,
    private localService: LocalService,
    private propietarioService: PropietarioService
  ) {
    this.alquiler = new Alquiler();
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.alquilerService.getAlquiler(id).subscribe(
        (data) => {
          this.alquiler = data;
        },
        (error) => {
          console.error('Error al obtener alquiler:', error);
        }
      );
    }

    this.getLocales(); // Llamamos a la función para obtener locales
    this.getPropietarios(); // Llamamos a la función para obtener propietarios
  }

  getLocales() {
    this.localService.getLocales().subscribe(
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
  guardarCambios(): void {
    this.alquilerService.updateAlquiler(this.alquiler).subscribe(
      (data) => {
        console.log('Alquiler actualizado correctamente:', data);
        Swal.fire({
          text: 'actualizacion con exito',
          icon: 'success'
        })
        this.router.navigate(['/alquileres']); // Redirige al listado después de actualizar
      },
      (error) => {
        console.error('Error al actualizar alquiler:', error);
      }
    );
  }
}