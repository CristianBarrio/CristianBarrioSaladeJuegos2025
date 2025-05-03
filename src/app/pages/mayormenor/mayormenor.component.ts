import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-mayormenor',
  imports: [CommonModule],
  templateUrl: './mayormenor.component.html',
  styleUrl: './mayormenor.component.css'
})
export class MayormenorComponent {
  numeros = ['as', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'sota', 'reina', 'rey'];
  palos = ['corazones', 'diamantes', 'treboles', 'espadas'];
  paloCartaUno = '';
  paloCartaDos = '';
  numeroCartaUno = '';
  numeroCartaDos = '';
  cartaElegida = '';
  cartaUno = '';
  cartaDos = '';

  mostrarCartaDos = false;
  nuevaRonda = false;

  constructor() {
    this.generarCartas();
  }

  generarCartas(){
    
    this.paloCartaUno = this.palos[Math.floor(Math.random() * this.palos.length)];
    this.numeroCartaUno = this.numeros[Math.floor(Math.random() * this.numeros.length)];
    
    this.paloCartaDos = this.palos[Math.floor(Math.random() * this.palos.length)];
    this.numeroCartaDos = this.numeros[Math.floor(Math.random() * this.numeros.length)];

    while(this.numeroCartaUno === this.numeroCartaDos){
      this.numeroCartaDos = this.numeros[Math.floor(Math.random() * this.numeros.length)];
    }
    
    this.cartaUno = `${this.numeroCartaUno}de${this.paloCartaUno}.png`;
    this.cartaDos = `${this.numeroCartaDos}de${this.paloCartaDos}.png`;
    
    this.mostrarCartaDos = false;
    this.nuevaRonda = true;
  }

  esMayorOMenor():boolean{
    if(this.numeros.indexOf(this.numeroCartaUno) + 1 > this.numeros.indexOf(this.numeroCartaDos) + 1){
      return true;
    }else{
      return false;
    }
  }

  jugar(esMayor:boolean){
    
    this.mostrarCartaDos = true;

    let resultado = this.esMayorOMenor();

    if(esMayor === resultado){
      console.log('Ganaste!');
    }else{
      console.log('perdiste!');
    }
  }

}
