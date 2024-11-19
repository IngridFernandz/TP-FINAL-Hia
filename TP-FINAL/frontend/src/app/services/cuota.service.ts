import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cuota } from '../models/cuota';

@Injectable({
  providedIn: 'root'
})
export class CuotaService {

  hostBase: string;
  constructor(private _http:HttpClient) {
    this.hostBase = "http://localhost:3000/api/cuota";
    // this.hostBase = "http://backend:3000/api/cuota";
  }

  createCuota(cuota: Cuota): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    let body: any = JSON.stringify(cuota);
    return this._http.post(this.hostBase + '/', body, httpOptions);
  }

  getCuotas():Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this._http.get(this.hostBase, httpOptions);
  }

  getCuota(id:string): Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this._http.get(this.hostBase + '/' + id, httpOptions);
  }

  updateCuota(cuota: Cuota): Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    let body: any = JSON.stringify(cuota);
    return this._http.put(this.hostBase + '/' + cuota._id, body, httpOptions);
  }

  deleteCuota(id: string): Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this._http.delete(this.hostBase + '/' + id, httpOptions);
  }
  getCuotasAlquiler(id:string):Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this._http.get(this.hostBase+/Cuotalquileres/+id, httpOptions);
  }
  getPrimerCuota(id:string):Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this._http.get(this.hostBase+/primera/+id, httpOptions);
  }

}
