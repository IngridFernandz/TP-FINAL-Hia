import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  hostBase: string;
  constructor(private _http:HttpClient) { 
  this.hostBase = "http://localhost:3000/api/usuario/";
  //this.hostBase = "http://backend:3000/api/usuario/";
  
  }
  perfilUsuario:string|null = null;
  public login(usuario: string, password: string): Observable<any> {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  
    const body = JSON.stringify({ usuario: usuario, password: password });
    console.log('Solicitud de login:', body);
  
    return this._http.post(this.hostBase + 'login', body, httpOption).pipe(
      tap((response: any) => {
        this.perfilUsuario = response.perfil;
        sessionStorage.setItem('user', response.usuario);
        sessionStorage.setItem('perfil', response.perfil);
        sessionStorage.setItem('userid', response.userid);
        sessionStorage.setItem('token', response.token);
        console.log('Datos almacenados en sessionStorage:', {
          user: sessionStorage.getItem('user'),
          perfil: sessionStorage.getItem('perfil'),
          userid: sessionStorage.getItem('userid'),
          token: sessionStorage.getItem('token')
        });
      }),
      catchError(error => {
        console.error('Error al iniciar sesión:', error);
        throw error;
      })
    );
  }
  public logout() {
  //borro el vble almacenado mediante el storage
  sessionStorage.removeItem("user");
  sessionStorage.removeItem("perfil");
  sessionStorage.removeItem("userid");
  sessionStorage.removeItem("email");
  sessionStorage.removeItem("activo");
   //borro el token almacenado mediante el storage
  sessionStorage.removeItem("token");
  this.perfilUsuario = null;
  } 
  public userLoggedIn(){
    var resultado = false;
    var usuario = sessionStorage.getItem("user");
    if(usuario!=null){
    resultado = true;
    }
    return resultado;
    }
    public userLogged(){
    var usuario = sessionStorage.getItem("user");
    return usuario;
    }
    public idLogged(){
    var id = sessionStorage.getItem("userid");
    return id;
    }
    getToken():string{
      if (sessionStorage.getItem("token")!= null){
      return sessionStorage.getItem("token")!;
      }else{
      return "";
      }
      }
      public getUserRole(): string {
        const perfil = this.perfilUsuario
      
        return perfil || ''; // Devolver una cadena vacía si el perfil es null
      }
      
      
      
   }