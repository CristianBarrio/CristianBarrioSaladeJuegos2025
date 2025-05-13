import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { SupabaseService } from '../../services/supabase.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-ahorcado',
  imports: [CommonModule],
  templateUrl: './ahorcado.component.html',
  styleUrl: './ahorcado.component.css'
})
export class AhorcadoComponent {  
  supabase = inject(SupabaseService);
  auth = inject(AuthService);

  botones = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ñ'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
  ];

  letrasPresionadas: string[] = [];

  listaDePalabras = ["perro", "gato", "elefante", "jirafa", "tigre", "leon", "raton", "murcielago", "cocodrilo", "hipopotamo"];
  palabraSeleccionada: string = "";
  palabraOculta: string = "";
  errores: number = 0;
  imagen:string = "";
  juegoTerminado:boolean = false;

  tiempoRestante:number = 0;
  intervalo:any;

  constructor(){
    this.obtenerPalabra();
  }

  obtenerPalabra()
  {
    this.palabraSeleccionada = this.listaDePalabras[Math.floor(Math.random() * this.listaDePalabras.length)].toUpperCase();
    this.palabraOculta = this.palabraSeleccionada.replace(/./g, "_");
    this.errores = 0;
    this.juegoTerminado = false;
    this.imagen = 'horca.png';
    this.iniciarTemporizador();
  }

  presionarLetra(letra:string){
      this.letrasPresionadas.push(letra);
      
      if(this.palabraSeleccionada.includes(letra)){
        let palabraOcultaArray = this.palabraOculta.split("");
        for(let i = 0; i < this.palabraSeleccionada.length; i++){
          if(this.palabraSeleccionada[i] == letra){
            palabraOcultaArray[i] = letra;
          }
        }
        this.palabraOculta = palabraOcultaArray.join("");

        if(this.palabraOculta === this.palabraSeleccionada){
          this.juegoTerminado = true;
          if(this.intervalo){
            clearInterval(this.intervalo);
          }
          this.supabase.guardarResultado('Ahorcado', this.auth.getUsuarioActual()?.id, 'aciertos', 1);
        }
      }else{
        this.errores++;
        this.actualizarImagen();
    
        if (this.errores === 6) {
          if(this.intervalo){
            clearInterval(this.intervalo);
          }
          this.palabraOculta = this.palabraSeleccionada;
          this.supabase.guardarResultado('Ahorcado', this.auth.getUsuarioActual()?.id, 'errores', 1);
        }
    }
  }

    iniciarTemporizador() {
    this.tiempoRestante = 20;
    this.intervalo = setInterval(() => {
      this.tiempoRestante--;

      if (this.tiempoRestante === 0) {
        clearInterval(this.intervalo);
        this.supabase.guardarResultado('Ahorcado', this.auth.getUsuarioActual()?.id, 'tiempoCero', 1);
      }
    }, 1000);
  }

  actualizarImagen() {
    const imagenes = [
      "horca.png",
      "cabeza.png",
      "cuerpo.png",
      "brazo_izquierdo.png",
      "brazo_derecho.png",
      "pierna_izquierda.png",
      "muerto.png"
    ];
    this.imagen = imagenes[this.errores];
  }

  reiniciarJuego(){
    if(this.intervalo){
      clearInterval(this.intervalo);
    }
    this.tiempoRestante = 20;
    this.letrasPresionadas = [];
    this.juegoTerminado = false;
    this.obtenerPalabra();
  }
}

