import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-ahorcado',
  imports: [CommonModule],
  templateUrl: './ahorcado.component.html',
  styleUrl: './ahorcado.component.css'
})
export class AhorcadoComponent {
  // "assets": [
   //   {
   //     "glob": "**/*",
   //     "input": "public"
   //   }

  
  botones = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
  ];

  letrasPresionadas: string[] = [];

  listaDePalabras = ["perro", "gato", "elefante", "jirafa", "tigre", "león", "ratón", "murciélago", "cocodrilo", "hipopótamo"];
  palabraSeleccionada: string = "";
  palabraOculta: string = "";
  errores: number = 0;
  imagen:string = "";

  constructor(){
    this.obtenerPalabra();
  }

  obtenerPalabra()
  {
    this.palabraSeleccionada = this.listaDePalabras[Math.floor(Math.random() * this.listaDePalabras.length)].toUpperCase();
    this.palabraOculta = this.palabraSeleccionada.replace(/./g, "_");
    this.errores = 0;
    this.imagen = 'horca.png';
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

        }
      }else{
        this.errores++;
        this.actualizarImagen();
    
        if (this.errores === 6) {
          this.palabraOculta = this.palabraSeleccionada;
        }
    }
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
    this.letrasPresionadas = [];
    this.obtenerPalabra();
  }
}

