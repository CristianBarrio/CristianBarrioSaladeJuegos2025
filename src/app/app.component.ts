import { Component, inject } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { UtilsService } from './services/utils.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tpsaladejuegos';
  router = inject(UtilsService);
  auth = inject(AuthService)

  constructor() {
    this.router.navegar('/login');
  }

  async ngOnInit(){
    await this.auth.recuperarUsuarioActual();
  }
}
