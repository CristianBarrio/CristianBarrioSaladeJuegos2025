import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  http = inject(HttpClient);

  traerPreguntas(): Observable<any> {
    return this.http.get<any>('https://the-trivia-api.com/v2/questions?limit=1');
  }
}
