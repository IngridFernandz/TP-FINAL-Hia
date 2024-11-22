import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pago } from '../models/pago';
import { Cuota } from '../models/cuota';

@Injectable({
  providedIn: 'root'
})
export class PagoService {

  private apiMercadoPago = 'http://localhost:3000/api/mercado-pago';
    private apiPago = 'http://localhost:3000/api/pagos';

    //private apiMercadoPago = 'http://backend:3000/api/mercado-pago';
    //private apiPago = 'http://backend:3000/api/pagos';

    private pagoKey = 'pago';
    private alquilerKey = 'alquiler';
    private cuotaKey = 'cuota';
    guardarAlquiler(idAlquiler: string) {
      localStorage.setItem(this.alquilerKey, idAlquiler);
    }
  
    obtenerAlquiler(): string | null {
      return localStorage.getItem(this.alquilerKey);
    }
  
    guardarCuota(cuota: Cuota) {
      localStorage.setItem(this.cuotaKey, JSON.stringify(cuota));
    }
  
    obtenerCuota(): Cuota | null {
      const cuotaString = localStorage.getItem(this.cuotaKey);
      return cuotaString ? JSON.parse(cuotaString) : null;
    }


  guardarPago(pago: Pago) {
    localStorage.setItem(this.pagoKey, JSON.stringify(pago));
  }

  obtenerPago(): Pago  {
    const pagoString = localStorage.getItem(this.pagoKey);
    return pagoString ? JSON.parse(pagoString) : null;
  }

    constructor(private http: HttpClient) { }
    generarLinkDePago(items: any[], backUrls: any): Observable<any> {
      const body = { items, back_urls: backUrls };
      return this.http.post<any>(this.apiMercadoPago+'/generar-link-de-pago', body);
    }

    createPago(cuotaId: string,pago:Pago): Observable<any> {
      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
      let body = {
        idcuota: cuotaId ,
        fechaDePago: pago.fechaDePago,
        monto: pago.monto,
        medioDePago: pago.medioDePago
      };
      return this.http.post(this.apiPago+'/', body, httpOptions);
    }
  
  getPagos(): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.http.get(this.apiPago + '/', httpOptions);
  }
  
}
