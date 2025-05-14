import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'tpsaladejuegos';
  auth = inject(AuthService);
  router = inject(Router);

  mostrarNombre = false;
  nombreUsuario: string | undefined = '';

  ngOnInit() {
    const usuario = this.auth.getUsuarioActual();
    if (usuario) {
      this.nombreUsuario = usuario.nombre;
      this.mostrarNombre = true;
    } else {
      this.mostrarNombre = false;
    }
  }

    cerrarSesion() {
    this.auth.cerrarSesion();
    this.mostrarNombre = false;
  }

}
