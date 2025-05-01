import { inject, Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UtilsService } from '../../services/utils.service';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-login',
  imports: [CommonModule,
    ReactiveFormsModule,
    ToastModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  auth = inject(AuthService);
  utilsSvc = inject(UtilsService);

  form = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required])
  })

  ngOnInit(){
    this.auth.alCerrarSesion.subscribe(() => {
      this.form.reset();
    });
  }

  async login() {
    if (this.form.valid) {
      try {
        await this.auth.iniciarSesion(this.form.value.email ?? '', this.form.value.password ?? '');
        console.log('Inicio de sesión exitoso');
        this.utilsSvc.navegar('/');
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
        this.utilsSvc.mostrarMensaje('error', 'Error', 'Correo o contraseña incorrectos', 3000);
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

  obtenerUsuario(correo:string):string{
    const user = this.usuariosRegistrados.find(u => u.correo === correo);
    return user ? user.correo.split('@')[0] : 'unknown';
  }

  cerrarSesion(){
    this.auth.cerrarSesion();
  }
}
