import { Component, inject } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tpsaladejuegos';
  auth = inject(AuthService)
  router = inject(Router);

  mostrarNombre = false;
  nombreUsuario: string | undefined = "";

  async ngOnInit() {
    const usuario = this.auth.getUsuarioActual();

    if (usuario) {
      this.mostrarNombre = true;
    } else {
      this.mostrarNombre = false;
    }
  }

}
