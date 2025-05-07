import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-juegos',
  imports: [RouterOutlet],
  templateUrl: './juegos.component.html',
  styleUrl: './juegos.component.css'
})
export class JuegosComponent {
  router = inject(Router);

  
}
