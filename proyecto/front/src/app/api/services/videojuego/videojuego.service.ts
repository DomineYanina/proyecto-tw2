import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VideojuegoService {

  http = inject(HttpClient);

  constructor() { }

  listVideojuegos() {
    return this.http.get('/api/videojuegos');
  }



}
