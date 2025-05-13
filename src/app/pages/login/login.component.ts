import { inject, Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  imports: [CommonModule,
    ReactiveFormsModule,
    ToastModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  auth = inject(AuthService);
  router = inject(Router);

  form = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required, Validators.minLength(6), Validators.maxLength(20)])
  })

  // ngOnInit(){
  //   this.auth.alCerrarSesion.subscribe(() => {
  //     this.form.reset();
  //   });
  // }

  async login() {
    if (this.form.valid) {
      try {
        await this.auth.iniciarSesion(this.form.value.email ?? '', this.form.value.password ?? '');
        console.log('Inicio de sesión exitoso.' + this.auth.usuarioActual?.nombre);

        this.router.navigateByUrl('');
        this.form.reset();
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
        this.mostrarMensaje();
      }
    }
  }
  

  usuariosRegistrados = [
    {correo: 'admin@admin.com', contraseña: '111111'},
    {correo: 'invitado@invitado.com', contraseña: '222222'},
    {correo: 'usuario@usuario.com', contraseña: '333333'}
  ];

  autocompletarUsuario(usuario: {correo:string, contraseña:string})
  {
    this.form.patchValue({
      email: usuario.correo,
      password: usuario.contraseña
    });
  }

  mostrarMensaje(){
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: "Error",
      text: "¡Correo o contraseña incorrectos!",
      timer: 2000,
      showConfirmButton: false
    });
  }

  cerrarSesion(){
    this.auth.cerrarSesion();
  }
}
