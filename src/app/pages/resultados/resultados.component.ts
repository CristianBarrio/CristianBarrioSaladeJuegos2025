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

  async ngOnInit(){
    for (let juego of this.juegos){
      this.resultados[juego] = await this.supabase.traerResultados(juego);
    }
  }

  getColumnKeys(result: any): string[] {
    return Object.keys(result).filter(key => key !== 'id' && key !== 'usuarios');
  }

}
