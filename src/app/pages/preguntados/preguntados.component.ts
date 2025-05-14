import { Component, inject } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../../services/supabase.service';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-preguntados',
  imports: [CommonModule],
  templateUrl: './preguntados.component.html',
  styleUrl: './preguntados.component.css'
})
export class PreguntadosComponent {
  http = inject(HttpService);
  supabase = inject(SupabaseService);
  auth = inject(AuthService);

  pregunta:any;
  respuestas:string[] = [];
  respuestaSeleccionada: string = '';
  tiempoRestante: number = 0;
  esCorrecta:boolean = false;
  respondio:boolean = false;
  intervalo:any;

  constructor() {
    this.iniciarJuego();
  }

  iniciarJuego() {
     this.pregunta = null;
    this.respuestaSeleccionada = '';
    this.esCorrecta = false;
    this.respondio = false;
    this.respuestas = [];

    this.http.traerPreguntas().subscribe(preguntas => {
      console.log(preguntas);
      this.pregunta = preguntas[0];

      this.respuestas = [...this.pregunta.incorrectAnswers, this.pregunta.correctAnswer];
      this.respuestas.sort(() => Math.random() - 0.5);

      this.iniciarTemporizador();
    });
  }

  iniciarTemporizador() {
    this.tiempoRestante = 20;
    this.intervalo = setInterval(() => {
      this.tiempoRestante--;

      if (this.tiempoRestante === 0) {
        clearInterval(this.intervalo);

        if(!this.respondio){
          this.respondio = true;
          this.esCorrecta = false;
          this.supabase.guardarResultado('Preguntados', this.auth.getUsuarioActual()?.id, 'tiempoCero', 1);

          Swal.fire({
          icon:'error',
          title: "¡Se acabó el tiempo!",
          html: `<button id="btnReinicio" class="swal2-confirm swal2-styled">Jugar de nuevo</button>`,
            didOpen: () => {
            const btn = document.getElementById('btnReinicio');
              if (btn) {
                btn.addEventListener('click', () => {
                  this.reiniciar();
                  Swal.close();
                });
              }  
            }
          });
        }
      }
    }, 1000);
  }

  seleccionarRespuesta(respuesta: string) {
    if(this.intervalo){
      clearInterval(this.intervalo);
    }

    this.respuestaSeleccionada = respuesta;
    this.respondio = true;
    if (respuesta === this.pregunta.correctAnswer) {
      this.esCorrecta = true;
      this.supabase.guardarResultado('Preguntados', this.auth.getUsuarioActual()?.id, 'aciertos', 1);

      Swal.fire({
      icon:'success',
      title: "¡Respuesta Correcta!",
      html: `<button id="btnReinicio" class="swal2-confirm swal2-styled">Jugar de nuevo</button>`,
        didOpen: () => {
        const btn = document.getElementById('btnReinicio');
          if (btn) {
            btn.addEventListener('click', () => {
              this.reiniciar();
              Swal.close();
            });
          }  
        }
      });
    }else{
      this.supabase.guardarResultado('Preguntados', this.auth.getUsuarioActual()?.id, 'errores', 1);

      Swal.fire({
      icon:'error',
      title: "¡Respuesta Incorrecta!",
      html: `<button id="btnReinicio" class="swal2-confirm swal2-styled">Jugar de nuevo</button>`,
        didOpen: () => {
        const btn = document.getElementById('btnReinicio');
          if (btn) {
            btn.addEventListener('click', () => {
              this.reiniciar();
              Swal.close();
            });
          }  
        }
      });
    }
  }


  reiniciar() {
    if(this.intervalo){
      clearInterval(this.intervalo);
    }

    this.iniciarJuego();
  }

  tipoRespuesta(opcion:string){
    if(!this.respondio){
      return '';
    }else{
      if(this.pregunta.correctAnswer === opcion){
        return 'correcta';
      }else{
        return 'incorrecta';
      }
    }
  }

}
