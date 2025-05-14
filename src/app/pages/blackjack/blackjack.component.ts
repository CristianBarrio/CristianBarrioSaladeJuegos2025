import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-blackjack',
  imports: [CommonModule],
  templateUrl: './blackjack.component.html',
  styleUrl: './blackjack.component.css'
})
export class BlackjackComponent {
  auth = inject(AuthService);
  supabase = inject(SupabaseService);

  numeros = ['as', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'sota', 'reina', 'rey'];
  palos = ['corazones', 'diamantes', 'treboles', 'espadas'];

  cartaUnoJugador = '';
  cartaDosJugador = '';
  cartaUnoDealer = '';
  cartaDosDealer = '';

  jugadorEstaPlantado = false;
  sumaCartasJugador = 0;
  sumaCartasDealer = 0;

  cartasUsadas:string[] = [];
  cartasJugador:string[] = [];
  cartasDealer:string[] = [];

  juegoTerminado = false;

  constructor() {
    this.iniciarJuego();
  }


  generarCarta(){
    let palo = this.palos[Math.floor(Math.random() * this.palos.length)];
    let numero = this.numeros[Math.floor(Math.random() * this.numeros.length)];

    let carta = `${numero}de${palo}.png`;

    while(this.cartasUsadas.includes(carta)){
      palo = this.palos[Math.floor(Math.random() * this.palos.length)];
      numero = this.numeros[Math.floor(Math.random() * this.numeros.length)];
      carta = `${numero}de${palo}.png`;
    }

    this.cartasUsadas.push(carta);

    return carta;
  }

  iniciarJuego() {
    this.juegoTerminado = false;
    this.cartasJugador = [];
    this.cartasDealer = [];
    this.cartasUsadas = [];
    this.jugadorEstaPlantado = false;
    this.sumaCartasJugador = 0;
    this.sumaCartasDealer = 0;
  
    this.cartaUnoJugador = this.generarCarta();
    this.cartaDosJugador = this.generarCarta();
  
    this.cartaUnoDealer = this.generarCarta();
    this.cartaDosDealer = this.generarCarta();

    this.cartasJugador = [this.cartaUnoJugador, this.cartaDosJugador];
    this.cartasDealer = [this.cartaUnoDealer, this.cartaDosDealer];

    this.sumaCartasJugador = this.calcularValorMano(this.cartasJugador);
    this.sumaCartasDealer = this.calcularValorMano(this.cartasDealer);
  }

  calcularValorMano(cartas: string[]): number {
    let total = 0;
    let cantidadAses = 0;

    for (const carta of cartas) {
      const nombre = carta.split('de')[0];

      if (nombre === 'as') {
        cantidadAses++;
        total += 11;
      } else if (['sota', 'reina', 'rey'].includes(nombre)) {
        total += 10;
      } else {
        total += this.numeros.indexOf(nombre) + 1;
      }
    }

    while (total > 21 && cantidadAses > 0) {
      total -= 10;
      cantidadAses--;
    }

    return total;
  }


  pedirCarta(){
    const nuevaCarta = this.generarCarta();
    this.cartasJugador.push(nuevaCarta);
    this.sumaCartasJugador = this.calcularValorMano(this.cartasJugador);

    if(this.sumaCartasJugador >= 21){
      this.plantarse();
    }
  }

  plantarse(){
    if(this.sumaCartasJugador < 17){
      Swal.fire({
        icon: 'warning',
        text: 'No podés plantarte con una mano menor a 17.'
      });
    }else{
      this.jugadorEstaPlantado = true;
      this.turnoBanca();
    }
  }

  turnoBanca() {
    if (this.sumaCartasJugador <= 21) {
      let intentos = 0;
      const probabilidades = [0.7, 0.4, 0.15];
      const chance = probabilidades[intentos] ?? 0.05; 
    
      let pedir = Math.random() < chance;

       while (this.sumaCartasDealer < 17) {
        const carta = this.generarCarta();
        this.cartasDealer.push(carta);
        this.sumaCartasDealer = this.calcularValorMano(this.cartasDealer);
      }

      while (this.sumaCartasDealer < this.sumaCartasJugador && this.sumaCartasDealer < 21 && pedir) {
        const carta = this.generarCarta();
        this.cartasDealer.push(carta);
        this.sumaCartasDealer = this.calcularValorMano(this.cartasDealer);
        intentos++;
      }
    }
  
    this.finalizarJuego();
  }

  finalizarJuego(){
    const jugador = this.sumaCartasJugador;
    const dealer = this.sumaCartasDealer;
    this.juegoTerminado = true;
  
    if (jugador > 21 || (jugador < dealer && dealer <= 21)) {
      this.supabase.guardarResultado('Blackjack', this.auth.usuarioActual?.id, 'derrotas', 1);

      Swal.fire({
      icon:'error',
      title: "¡Perdiste!",
      html: `<button id="btnReinicio" class="swal2-confirm swal2-styled">Jugar de nuevo</button>`,
        didOpen: () => {
        const btn = document.getElementById('btnReinicio');
          if (btn) {
            btn.addEventListener('click', () => {
              this.iniciarJuego();
              Swal.close();
            });
          }  
        }
      });

    } else if (dealer > 21 || jugador > dealer) {
     this.supabase.guardarResultado('Blackjack', this.auth.usuarioActual?.id, 'victorias', 1);
     
     Swal.fire({
      icon:'success',
      title: "¡Ganaste!",
      html: `<button id="btnReinicio" class="swal2-confirm swal2-styled">Jugar de nuevo</button>`,
        didOpen: () => {
        const btn = document.getElementById('btnReinicio');
          if (btn) {
            btn.addEventListener('click', () => {
              this.iniciarJuego();
              Swal.close();
            });
          }  
        }
      });

    }else {
      this.supabase.guardarResultado('Blackjack', this.auth.usuarioActual?.id, 'empates', 1);
      
      Swal.fire({
      icon:'info',
      title: "¡Empate!",
      html: `<button id="btnReinicio" class="swal2-confirm swal2-styled">Jugar de nuevo</button>`,
        didOpen: () => {
        const btn = document.getElementById('btnReinicio');
          if (btn) {
            btn.addEventListener('click', () => {
              this.iniciarJuego();
              Swal.close();
            });
          }  
        }
      });

    }
  }

  mostrarReglas(){
    Swal.fire({
      icon: 'question',
      html: `El jugador se enfrenta a la banca, en busca de conseguir 21 puntos, o el número más cercano posible, sin pasarse.
      Para conseguirlos, cada jugador recibe dos cartas al inicio. Si las dos primeras cartas suman 21, es la mejor jugada posible, y recibe el nombre de Blackjack.
      Cuando los jugadores no llegan a 21, pueden pedir cartas extra para llegar, pero si se pasan de los 21 automáticamente pierden.
      Si tenés 16 o menos, estás obligado/a a pedir otra carta. Si tenés 17 o más te podés plantar, así terminando tu turno.
      La banca le gana a todos los jugadores que se pasen de 21, o a todos aquellos que tengan una mano de menor valor que la suya. 
      Si tiene 19 puntos, por ejemplo, le gana a todos los que tengan 18 o menos y 22 o más.
      Pierde con los jugadores que tengan una mano superior, y con todos los que se hayan plantado en el caso de que exceda los 21 puntos.
      El empate en blackjack, se da entre la banca y los jugadores que tengan la misma cantidad de puntos.<br>
      El valor de las cartas es el siguiente:<br>
      <img src='asdeespadas.png' style="height:100px; width:auto;"><br>
      El As tiene dos valores, 1 y 11. Este valor es elegido automáticamente, dependiendo de si la mano se pasa de 21 o no.<br>
      <img src='sotadediamantes.png' style="height:100px; width:auto;">
      <img src='reinadecorazones.png' style="height:100px; width:auto;">
      <img src='reydetreboles.png' style="height:100px; width:auto;"><br>
      La Jota, la Reina y el Rey comparten el valor de 10 puntos.
      Las cartas del 2 al 10 están valuadas de acuerdo a su numeración.`
    });
  }
}
