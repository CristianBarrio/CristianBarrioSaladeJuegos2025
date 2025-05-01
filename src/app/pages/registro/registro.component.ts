import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UtilsService } from '../../services/utils.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-registro',
  imports: [CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  auth = inject(AuthService);
  utilsSvc = inject(UtilsService);

  form = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required]),
    nombre: new FormControl('',[Validators.required]),
    apellido: new FormControl('',[Validators.required]),
    age: new FormControl('',[Validators.required])
  })

  // async login() {
  //   if (this.form.valid) {
  //     try {
  //       await this.auth.crearCuenta(this.form.value.email ?? '', this.form.value.password ?? '');
  //       console.log('Inicio de sesión exitoso');
  //       this.utilsSvc.navegar('/');
  //     } catch (error) {
  //       console.error('Error al iniciar sesión:', error);
  //       this.utilsSvc.mostrarMensaje('error', 'Error', 'Correo o contraseña incorrectos', 3000);
  //     }
  //   }
  // }
}
