import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Novedad } from '../models/novedad';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root',
})
export class NovedadService {
  hostBase: string;
  private unreadCount = new BehaviorSubject<number>(0);
  // Observable que los componentes pueden suscribirse para obtener actualizaciones en tiempo real
  unreadCount$ = this.unreadCount.asObservable();

  constructor(private _http: HttpClient) {
    this.hostBase = 'http://localhost:3000/api/novedad';
   // this.hostBase = 'http://backend:3000/api/novedad';
  }

  getNovedades(): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this._http.get(this.hostBase + '/', httpOptions);
  }

  createNovedad(novedad: Novedad): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    let body: any = JSON.stringify(novedad);
    return this._http.post(this.hostBase + '/', body, httpOptions);
  }

  updateNovedad(novedad: Novedad): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    let body: any = JSON.stringify(novedad);
    return this._http.put(this.hostBase + '/' + novedad._id, body, httpOptions);
  }

  // Método para actualizar el número de notificaciones no leídas
  updateUnreadCount(count: number) {
    this.unreadCount.next(count);
  }
}
