import { Component } from '@angular/core';
import { Router ,ActivatedRoute, RouterModule} from '@angular/router';
import { LocalService } from '../../services/local.service';
import { Local } from '../../models/local';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';
@Component({
  selector: 'app-locales',
  standalone: true,
  imports: [NgFor, NgIf, CommonModule, FormsModule, RouterModule],
  templateUrl: './locales.component.html',
  styleUrl: './locales.component.css'
})
export class LocalesComponent {
  locales: Array<Local>;
  filtro: string = "";
  constructor(private localService: LocalService, private router: Router,private activateRoute: ActivatedRoute,public loginService:LoginService) {
    this.locales = [];
    this.ObtenerLocales();
    
  }
  ngOnInit(): void {
    this.activateRoute.params.subscribe(params=>{
      this.filtro=params['filtro'];
      this.ObtenerLocales();
  });
    this.ObtenerLocales();
  }
  ObtenerLocales() {
    if (this.filtro === "todos") {
      this.localService.getLocales().subscribe(
        (data: any) => {
          this.locales = data;
        },
        error => {
          console.log(error);
        }

      );
    }
    else if (this.filtro === "alquil") {
      this.localService.getLocalesbyAlquilado(true).subscribe(
        (data: any) => {
          this.locales = data;
        },
        error => {
          console.log(error);
        }

      );
    }
    else if (this.filtro === "disp") {
      this.localService.getLocalesbyAlquilado(false).subscribe(
        (data: any) => {
          this.locales = data;
        },
        error => {
          console.log(error);
        }

      );
    }
    else {
      this.localService.getLocalesNoHabilitados().subscribe(
        (data: any) => {
          this.locales = data;
        },
        error => {
          console.log(error);
        }

      );
    }
  }
  agregarLocal() {
    this.router.navigate(['formLocal', 0,this.filtro]);
  }

  ModificarLocal(id: string) {
    this.router.navigate(['formLocal', id,this.filtro]);
  }

  EliminarLocal(id: string) {
    this.localService.deleteLocal(id).subscribe(
      (data: any) => {
        alert("Local eliminado correctamente")
      },
      error => {
        console.log(error);
      }

    );
    this.ObtenerLocales();
  }

}
