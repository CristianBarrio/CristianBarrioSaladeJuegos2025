import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root', 
})
export class UtilsService {

  router = inject(Router);
  mensaje = inject(MessageService);

  mostrarMensaje(tipo:string, titulo:string, detalle:string, duracion:number){
    this.mensaje.add({
      severity: tipo,
      summary: titulo,
      detail: detalle,
      life: duracion
    });
  }

  navegar(url:string)
  {
    return this.router.navigateByUrl(url);
  }
}
