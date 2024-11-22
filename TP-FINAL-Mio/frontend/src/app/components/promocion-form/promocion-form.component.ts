import { Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Promocion } from '../../models/promocion';
import { PromocionService } from '../../services/promocion.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Local } from '../../models/local';
import { LocalService } from '../../services/local.service';
import { AlquilerService } from '../../services/alquiler.service';
import { PropietarioService } from '../../services/propietario.service';
import { Propietario } from '../../models/propietario';
import { LoginService } from '../../services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-promocion-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './promocion-form.component.html',
  styleUrl: './promocion-form.component.css'
})
export class PromocionFormComponent {
  promocion!: Promocion;
  file: { base64: string, safeurl: SafeUrl | null };
  submitted: boolean = false;
  accion: string = '';
  locales: Array<Local> = [];
  constructor(private activatedRoute: ActivatedRoute,
    private domSanitizer: DomSanitizer,
    private promocionService: PromocionService,
    private localService: LocalService,
    private router: Router,
    private alquilerService: AlquilerService,
    private propietarioService: PropietarioService,
    public loginService: LoginService
  ) {
    this.iniciarVariable();
    //this.cargarLocales();
    this.file = { base64: '', safeurl: null }

  }
  volver() {
    Swal.fire({
      text: '¿Desea volver al listado de promociones?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['promocion']);
      }
    }
    )
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['id'] == "0") {
        this.iniciarVariable();
        this.cargarLocales();
        this.accion = 'new'
      } else {
        this.cargarPromocion(params['id']);
        this.cargarLocales();
        this.accion = 'update'
      }
    });
  }
  cargarPromocion(id: string) {
    this.promocionService.getPromocionById(id).subscribe(
      (result) => {
        Object.assign(this.promocion, result);
        this.promocion.local = this.locales.find(local => (local._id === this.promocion.local._id))!
      }
    )
  }
  //LOCALES BY PROPIETARIO--NATALIA 
  cargarLocales() {
    this.locales = new Array<Local>();
    let idUsaurio = sessionStorage.getItem('userid') ?? '';
    this.propietarioService.getPropietarioByIdUsuario(idUsaurio).subscribe
      ((propietario: Propietario) => {
        let idPropietario = propietario._id;
        this.alquilerService.getLocalesByPropietario(idPropietario).subscribe(
          data => {
            data.forEach((element: any) => {
              let vlocal: Local = new Local;
              Object.assign(vlocal, element);
              this.locales.push(vlocal);
              vlocal = new Local;
            }
            )
          }
        )
      })

  }


  // cargarLocales() {
  //   this.locales = new Array<Local>();
  //   this.localService.getLocales().subscribe(
  //     (data) => {
  //       let vlocal: Local = new Local();
  //       data.forEach((element: any) => {
  //         Object.assign(vlocal, element);
  //         this.locales.push(vlocal);
  //         vlocal = new Local();
  //       });
  //     },
  //     (error) => {
  //       console.log(error);
  //     }

  //   )
  // }

  limpiar() {
    this.iniciarVariable();
  }
  procesarForm() {
    this.submitted = true;
  }

  iniciarVariable() {
    this.promocion = new Promocion();
  }


  registrarPromocion() {
    Swal.fire({
      text: '¿Esta seguro que desea registrar  esta Promocion?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.promocionService.addPromocion(this.promocion).subscribe(
          promocion => {
            if (promocion.status == 1) {
              Swal.fire({
                text: 'La promocion ha sido registrada con exito',
                icon: 'success'
              }).then((result) => {
                this.router.navigate(['promocion']);
              }
            )
            }
          },
          (error) => {
            Swal.fire({
              text: 'Ha ocurrido un error',
              icon: 'error'
            }
            )
          }
        )

      }
    }
    )
    
  }
  actualizarPromocion() {
    Swal.fire({
      text: '¿Esta seguro que desea modificar esta Promocion?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.promocionService.updatePromocion(this.promocion).subscribe(
          promocion => {
            if (promocion.status == 1) {
              Swal.fire({
                text: 'La promocion ha sido modificada con exito',
                icon: 'success'
              }).then((result) => {
                this.router.navigate(['promocion']);
              }
            )
            }
          },
          (error) => {
            Swal.fire({
              text: 'Ha ocurrido un error',
              icon: 'error'
            }
            )
          }
        )

      }
    }
    )
  }


  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        let base64 = reader.result as string
        this.promocion.imagen = base64;
        let safeurl: SafeUrl = this.domSanitizer.bypassSecurityTrustUrl(base64);
        this.file.base64 = base64;
        this.file.safeurl = safeurl;
      };
      reader.readAsDataURL(file);
    }
  }

}
