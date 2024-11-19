import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Propietario } from '../models/propietario';

@Injectable({
  providedIn: 'root',
})
export class PropietarioService {
  constructor(private http: HttpClient) {}

  getPropietarios(): Observable<any> {
    return this.http.get('http://localhost:3000/api/propietario');
  }

  addPropietario(propietario: Propietario): Observable<any> {
    return this.http.post(
      'http://localhost:3000/api/propietario/',
      propietario
    );
  }

  deletePropietario(id: String): Observable<any> {
    return this.http.delete('http://localhost:3000/api/propietario/' + id);
  }

  editPropietario(propietario: Propietario): Observable<any> {
    return this.http.put('http://localhost:3000/api/propietario/', propietario);
  }

  getPropietario(id: String): Observable<any> {
    return this.http.get('http://localhost:3000/api/propietario/' + id);
  }

  obtenerEspectadores(): Observable<any> {
    return this.http.get('http://localhost:3000/api/propietario');
  }

  getPropietarioByIdUsuario(id: string): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.get(
      'http://localhost:3000/api/propietario/filteruser/' + id,
      httpOptions
    );
  }
}
