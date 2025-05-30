import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';


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
  router = inject(Router);

  form = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
    nombre: new FormControl('',[Validators.required]),
    apellido: new FormControl('',[Validators.required]),
    edad: new FormControl(0,[Validators.required, Validators.min(10), Validators.max(100)])
  })

  async registrarse(){
    if(this.form.valid){
      try{
        await this.auth.crearCuenta(this.form.value.email ?? '', this.form.value.password ?? '', this.form.value.nombre ?? '', this.form.value.apellido ?? '', this.form.value.edad ?? 0);
        console.log('Registro exitoso');
        this.auth.iniciarSesion(this.form.value.email ?? '', this.form.value.password ?? '');
        this.router.navigateByUrl('');
        this.form.reset();
      } catch(error){
        console.error('Error al registrarse:', error);
      }
    }
  }

}
