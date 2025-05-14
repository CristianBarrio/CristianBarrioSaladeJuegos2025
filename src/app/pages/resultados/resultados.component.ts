import { Component, inject } from '@angular/core';
import { SupabaseService } from '../../services/supabase.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resultados',
  imports: [CommonModule],
  templateUrl: './resultados.component.html',
  styleUrl: './resultados.component.css'
})
export class ResultadosComponent {
  supabase = inject(SupabaseService);

  juegos = ['Ahorcado', 'MayorMenor', 'Preguntados', 'Blackjack'];
  resultados: { [juego:string]: any[] } = {};

  nombresJuegos: { [juego: string]: { titulo: string, icono: string } } = {
    Ahorcado: { titulo: 'Ahorcado', icono: 'ahorcado.png' },
    MayorMenor: { titulo: 'Mayor o Menor', icono: 'mayormenor.png' },
    Preguntados: { titulo: 'Preguntados', icono: 'preguntados.png' },
    Blackjack: { titulo: 'Blackjack', icono: 'blackjack.png' }
  };

  columnas: {
    [juego: string]: { columna: string, nombre: string, color: string }[]
  } = {
    Ahorcado: [
      { columna: 'aciertos', nombre: 'Palabras adivinadas', color: '#a1db3b' },
      { columna: 'tiempoCero', nombre: 'Se acabó el tiempo', color: '#f04343' },
      { columna: 'errores', nombre: 'Palabras fallidas', color: '#f04343' }
    ],
    MayorMenor: [
      { columna: 'aciertos', nombre: 'Aciertos', color: '#a1db3b'},
      { columna: 'errores', nombre: 'Errores', color: '#f04343'}
    ],
    Preguntados: [
      { columna: 'aciertos', nombre: 'Aciertos', color: '#a1db3b'},
      { columna: 'tiempoCero', nombre: 'Se acabó el tiempo', color: '#f04343'},
      { columna: 'errores', nombre: 'Errores', color: '#f04343'}
    ],
    Blackjack: [
      { columna: 'victorias', nombre: 'Victorias', color: '#a1db3b'},
      { columna: 'empates', nombre: 'Empates', color: '#43b6f0'},
      { columna: 'derrotas', nombre: 'Derrotas', color: '#f04343'}
    ]
  };

  async ngOnInit(){
    for (let juego of this.juegos){
      this.resultados[juego] = await this.supabase.traerResultados(juego);
    }
  }
}
