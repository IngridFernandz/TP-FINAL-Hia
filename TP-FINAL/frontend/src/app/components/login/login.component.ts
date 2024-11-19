import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { Usuario } from '../../models/usuario';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  userform: Usuario = new Usuario(); //usuario mapeado al formulario
  returnUrl!: string;
  msglogin!: string; // mensaje que indica si no paso el loguin
  constructor(
  private route: ActivatedRoute,
  private router: Router,
  private loginService:LoginService){
  }
  ngOnInit() {
  this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/inicio';
  }
  login() {
  this.loginService.login(this.userform.usuario, this.userform.password)
  .subscribe(
  (result) => {
  var user = result;
  if (user.status == 1){
    //guardamos el tokek localmente
    sessionStorage.setItem("token", user.token)
    //guardamos el user en cookies en el cliente
    sessionStorage.setItem("user", user.usuario);
    sessionStorage.setItem("userid", user.userid);
    sessionStorage.setItem("perfil", user.perfil);
    sessionStorage.setItem("email", user.email);
    sessionStorage.setItem("perfil", user.activo);
    //redirigimos a home o a pagina que llamo
    this.router.navigateByUrl(this.returnUrl);
    Swal.fire({
      text: 'registrado con exito',
      icon: 'success'
    })
    
  } else {
  //usuario no encontrado muestro mensaje en la vista
  Swal.fire({
    text: 'registro incorrecto',
    icon: 'success'
  })
  }
  },
  error => {
  alert("Error de conexion");
  console.log("error en conexion");
  console.log(error);
  });
  }
} 
