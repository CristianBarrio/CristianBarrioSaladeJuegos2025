import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-mayormenor',
  imports: [CommonModule],
  templateUrl: './mayormenor.component.html',
  styleUrl: './mayormenor.component.css'
})
export class MayormenorComponent {
  supabase = inject(SupabaseService);
  auth = inject(AuthService);
  usuarioActual = this.auth.getUsuarioActual();

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
  resultado: boolean | null = null;

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
    this.resultado = null;
  }

  esMayorOMenor():boolean{
    return this.numeros.indexOf(this.numeroCartaDos) + 1 > this.numeros.indexOf(this.numeroCartaUno) + 1;
  }

  jugar(esMayor:boolean){
    
    this.mostrarCartaDos = true;

    this.resultado = this.esMayorOMenor();

    if(esMayor === this.resultado){
      this.supabase.guardarResultado('MayorMenor', this.usuarioActual?.id, 'aciertos', 1);
      Swal.fire({
        icon: 'success',
        title: '¡Ganaste!'
      });
      console.log('Ganaste!');

    }else{
      this.supabase.guardarResultado('MayorMenor', this.usuarioActual?.id, 'errores', 1);
      Swal.fire({
        icon: 'error',
        title: '¡Perdiste!'
      });
      console.log('Perdiste!');
    }
  }

  mostrarValores(){
    Swal.fire({
      icon: 'info',
      html: `El valor de las cartas es el siguiente:<br><br>
      <img src='asdeespadas.png' style="height:100px; width:auto;">
      <img src='asdecorazones.png' style="height:100px; width:auto;">
      <img src='asdetreboles.png' style="height:100px; width:auto;">
      <img src='asdediamantes.png' style="height:100px; width:auto;"><br>
      VALOR: 1<br><br>
      <img src='sotadeespadas.png' style="height:100px; width:auto;">
      <img src='sotadecorazones.png' style="height:100px; width:auto;">
      <img src='sotadetreboles.png' style="height:100px; width:auto;">
      <img src='sotadediamantes.png' style="height:100px; width:auto;"><br>
      VALOR: 11<br><br>
      <img src='reinadeespadas.png' style="height:100px; width:auto;">
      <img src='reinadecorazones.png' style="height:100px; width:auto;">
      <img src='reinadetreboles.png' style="height:100px; width:auto;">
      <img src='reinadediamantes.png' style="height:100px; width:auto;"><br>
      VALOR: 12<br><br>
      <img src='reydeespadas.png' style="height:100px; width:auto;">
      <img src='reydecorazones.png' style="height:100px; width:auto;">
      <img src='reydetreboles.png' style="height:100px; width:auto;">
      <img src='reydediamantes.png' style="height:100px; width:auto;"><br>
      VALOR: 13`
    });
  }

}
